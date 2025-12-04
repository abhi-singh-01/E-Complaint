# Redis Setup Guide

This guide will help you set up Redis for caching to improve your application's performance.

## Why Redis?

Redis provides:
- **Faster caching** than in-memory cache
- **Persistence** across server restarts
- **Distributed caching** for multiple server instances
- **Better memory management**
- **Advanced caching features** (TTL, pattern matching, etc.)

## Installation

### Option 1: Local Redis (Development)

#### Windows:
1. Download Redis from: https://github.com/microsoftarchive/redis/releases
2. Or use WSL (Windows Subsystem for Linux) and install Redis there
3. Or use Docker: `docker run -d -p 6379:6379 redis:latest`

#### macOS:
```bash
brew install redis
brew services start redis
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt-get update
sudo apt-get install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

### Option 2: Cloud Redis (Production)

Popular options:
- **Redis Cloud**: https://redis.com/cloud/
- **AWS ElastiCache**: https://aws.amazon.com/elasticache/
- **Azure Cache for Redis**: https://azure.microsoft.com/en-us/services/cache/
- **DigitalOcean Managed Redis**: https://www.digitalocean.com/products/managed-databases

## Configuration

Add these environment variables to your `.env` file:

### For Local Redis:
```env
REDIS_ENABLED=true
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
```

### For Cloud Redis (using connection URL):
```env
REDIS_ENABLED=true
REDIS_URL=redis://username:password@host:port
# Example: REDIS_URL=redis://default:password123@redis-12345.c1.us-east-1-1.ec2.cloud.redislabs.com:12345
```

### For Redis with Password:
```env
REDIS_ENABLED=true
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
REDIS_DB=0
```

## Testing Redis Connection

After starting your server, you should see one of these messages:

✅ **Success:**
```
✅ Redis Connected
✅ Redis Ready
✅ Redis connection test successful
```

⚠️ **Fallback (Redis not available):**
```
⚠️ Continuing without Redis cache (using in-memory fallback)
```

The application will automatically fall back to in-memory caching if Redis is not available, so your app will continue to work.

## Cache Endpoints

The following endpoints are cached with Redis:

- `/api/dashboard` - Cached for 2 minutes
- `/api/admin/additional-hods` - Cached for 5 minutes
- `/api/admin/deans` - Cached for 5 minutes

## Cache Headers

Check the `X-Cache` header in responses:
- `HIT-REDIS` - Response served from Redis cache
- `HIT-MEMORY` - Response served from memory cache (Redis unavailable)
- `MISS-REDIS` - Cache miss, stored in Redis
- `MISS-MEMORY` - Cache miss, stored in memory (Redis unavailable)

## Manual Cache Management

You can manually clear cache using the cache utility:

```javascript
const { clearCacheByPattern, clearAllCache } = require('./src/middleware/cache');

// Clear specific pattern
await clearCacheByPattern('cache:/api/dashboard*');

// Clear all cache
await clearAllCache();
```

## Performance Benefits

With Redis enabled, you can expect:
- **40-60% faster** response times for cached endpoints
- **Reduced database load** by 50-70%
- **Better scalability** for multiple server instances
- **Persistent cache** across server restarts

## Troubleshooting

### Redis connection fails:
1. Check if Redis is running: `redis-cli ping` (should return `PONG`)
2. Verify Redis host and port in `.env`
3. Check firewall settings
4. Verify Redis password if set

### Redis memory issues:
1. Set max memory in Redis config: `maxmemory 256mb`
2. Set eviction policy: `maxmemory-policy allkeys-lru`
3. Monitor Redis memory: `redis-cli info memory`

### Development without Redis:
The app works fine without Redis - it automatically uses in-memory caching as fallback. You can disable Redis by:
- Not setting `REDIS_ENABLED=true`
- Or not providing `REDIS_URL`

## Production Recommendations

1. **Use managed Redis** (Redis Cloud, AWS ElastiCache, etc.)
2. **Enable Redis persistence** (RDB or AOF)
3. **Set appropriate memory limits**
4. **Monitor Redis performance**
5. **Use Redis clustering** for high availability
6. **Set up Redis replication** for backup

## Additional Resources

- Redis Documentation: https://redis.io/documentation
- ioredis (Node.js client): https://github.com/luin/ioredis
- Redis Commands: https://redis.io/commands

