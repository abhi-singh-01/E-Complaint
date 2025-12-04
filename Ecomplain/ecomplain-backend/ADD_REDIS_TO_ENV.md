# Add Redis Configuration to .env File

## Quick Setup

Add the following Redis configuration to your `.env` file in the `ecomplain-backend` directory:

```env
# Redis Configuration
# For local Redis
REDIS_ENABLED=true
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# OR for cloud Redis (Redis Cloud, AWS ElastiCache, etc.)
# REDIS_URL=redis://username:password@host:port
```

## Steps

1. **Open your `.env` file** in the `ecomplain-backend` directory
   - If it doesn't exist, create it by copying `env.example` to `.env`

2. **Add the Redis configuration** at the end of your `.env` file:
   ```env
   # Redis Configuration
   # For local Redis
   REDIS_ENABLED=true
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=
   REDIS_DB=0
   ```

3. **Save the file**

4. **Start Redis** (if not already running):
   - **Windows (Docker)**: `docker run -d -p 6379:6379 redis:latest`
   - **macOS**: `brew services start redis`
   - **Linux**: `sudo systemctl start redis-server`

5. **Restart your Node.js server**:
   ```bash
   npm start
   ```

## Verification

After starting your server, you should see:
```
✅ Redis Connected
✅ Redis Ready
✅ Redis connection test successful
```

If Redis is not running, you'll see:
```
⚠️ Continuing without Redis cache (using in-memory fallback)
```

The application will work fine without Redis, but Redis provides better performance!

## Complete .env Template

If you need a complete `.env` file template, see `env.example` in the `ecomplain-backend` directory.

