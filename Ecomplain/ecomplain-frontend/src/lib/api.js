import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for caching and optimization
const requestCache = new Map();
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes

// Clean up expired cache entries
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of requestCache.entries()) {
    if (value.expiresAt < now) {
      requestCache.delete(key);
    }
  }
}, 5 * 60 * 1000); // Clean every 5 minutes

api.interceptors.request.use(
  (config) => {
    // Only cache GET requests
    if (config.method === 'get' && !config.params?.noCache) {
      const cacheKey = `${config.url}?${JSON.stringify(config.params || {})}`;
      const cached = requestCache.get(cacheKey);
      
      if (cached && cached.expiresAt > Date.now()) {
        // Return cached response
        return Promise.reject({
          __cached: true,
          data: cached.data,
          config
        });
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for caching and error handling
api.interceptors.response.use(
  (response) => {
    // Cache successful GET responses
    const config = response.config;
    if (config.method === 'get' && !config.params?.noCache) {
      const cacheKey = `${config.url}?${JSON.stringify(config.params || {})}`;
      requestCache.set(cacheKey, {
        data: response.data,
        expiresAt: Date.now() + CACHE_TTL
      });
    }
    
    return response;
  },
  (error) => {
    // Handle cached responses
    if (error.__cached) {
      return Promise.resolve({
        data: error.data,
        status: 200,
        statusText: 'OK',
        headers: { 'X-Cache': 'HIT' },
        config: error.config
      });
    }
    
    // Retry logic for network errors
    if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
      const config = error.config;
      if (!config.__retryCount) {
        config.__retryCount = 0;
      }
      
      if (config.__retryCount < 2) {
        config.__retryCount++;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(api(config));
          }, 1000 * config.__retryCount); // Exponential backoff
        });
      }
    }
    
    return Promise.reject(error);
  }
);

// Helper function to clear cache
export const clearApiCache = (pattern) => {
  if (pattern) {
    for (const key of requestCache.keys()) {
      if (key.includes(pattern)) {
        requestCache.delete(key);
      }
    }
  } else {
    requestCache.clear();
  }
};

export default api


