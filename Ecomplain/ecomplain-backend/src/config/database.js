const mongoose = require('mongoose');

// Cache the connection to reuse in serverless environments (like Vercel)
let cachedConnection = null;

const connectDB = async () => {
  try {
    // If connection already exists and is ready, reuse it (important for serverless)
    if (cachedConnection && mongoose.connection.readyState === 1) {
      console.log('✅ Using existing MongoDB connection');
      return cachedConnection;
    }

    // Check if connection string uses mongodb+srv (Atlas)
    const isAtlas = process.env.MONGODB_URI && process.env.MONGODB_URI.includes('mongodb+srv://');
    
    // Check if we're in a serverless environment (Vercel, AWS Lambda, etc.)
    const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NODE_ENV === 'production';
    
    const options = {
      // Connection pool options - adjusted for serverless environments
      maxPoolSize: isServerless ? 10 : 50, // Smaller pool for serverless
      minPoolSize: isServerless ? 0 : 5, // No minimum for serverless (connections are ephemeral)
      serverSelectionTimeoutMS: isServerless ? 10000 : 5000, // Longer timeout for serverless
      socketTimeoutMS: isServerless ? 60000 : 45000, // Longer socket timeout for serverless
      connectTimeoutMS: isServerless ? 15000 : 10000, // Longer connection timeout for serverless
      family: 4, // Use IPv4, skip trying IPv6
      bufferCommands: false, // Disable mongoose buffering (important for serverless)
      bufferMaxEntries: 0, // Disable mongoose buffering completely
      // Retry options
      retryWrites: true, // Enable retryable writes
      retryReads: true, // Enable retryable reads
      // Serverless-specific options
      maxIdleTimeMS: isServerless ? 30000 : 300000, // Close idle connections faster in serverless
    };

    // Add SSL/TLS options only for Atlas connections
    if (isAtlas) {
      // For MongoDB Atlas (mongodb+srv), TLS is automatically enabled
      // But we can explicitly set it to ensure proper SSL handling
      options.tls = true;
      options.tlsAllowInvalidCertificates = false;
      options.tlsAllowInvalidHostnames = false;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    
    // Cache the connection for reuse
    cachedConnection = conn;

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🌐 Environment: ${isServerless ? 'Serverless (Vercel)' : 'Traditional'}`);
    return conn;
  } catch (error) {
    console.error('\n❌ Database connection error:', error.message);
    console.error('\n📋 Diagnostic Information:');
    console.error('   Connection String:', process.env.MONGODB_URI ? 
      process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@') : 'NOT SET');
    console.error('   Environment:', process.env.VERCEL ? 'Vercel' : process.env.NODE_ENV || 'Unknown');
    
    // Provide helpful error messages for common Atlas issues
    if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
      console.error('\n💡 Authentication Error:');
      console.error('   1. Check your MongoDB Atlas username and password in the connection string');
      console.error('   2. Verify database user exists in Atlas → Database Access');
      console.error('   3. Ensure user has read/write permissions');
      console.error('   4. Check Vercel environment variables: MONGODB_URI is set correctly');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.error('\n💡 DNS/Network Error:');
      console.error('   1. Check your MongoDB Atlas connection string format');
      console.error('   2. Verify cluster is running in Atlas dashboard');
      console.error('   3. Check internet connection');
      console.error('   4. For Vercel: Ensure MONGODB_URI environment variable is set in Vercel dashboard');
    } else if (error.message.includes('timeout') || error.message.includes('whitelist') || error.message.includes('MongoNetworkError')) {
      console.error('\n💡 IP Whitelist/Network Error (CRITICAL FOR VERCEL):');
      console.error('   ⚠️  VERCEL DEPLOYMENT ISSUE: MongoDB Atlas requires IP whitelisting');
      console.error('   1. Go to MongoDB Atlas → Network Access');
      console.error('   2. Click "Add IP Address"');
      console.error('   3. Click "Allow Access from Anywhere" (0.0.0.0/0) for production');
      console.error('      OR add Vercel IP ranges (not recommended, use 0.0.0.0/0)');
      console.error('   4. Wait 1-2 minutes for changes to propagate');
      console.error('   5. Verify MONGODB_URI is set in Vercel → Settings → Environment Variables');
      console.error('   6. Redeploy your backend after adding IP whitelist');
    } else if (error.message.includes('ReplicaSetNoPrimary')) {
      console.error('\n💡 Replica Set Error:');
      console.error('   1. This usually indicates IP whitelist issue');
      console.error('   2. Check Network Access in MongoDB Atlas');
      console.error('   3. For Vercel: Add 0.0.0.0/0 to Network Access (allow from anywhere)');
      console.error('   4. Connection string format should be: mongodb+srv://...');
    } else if (error.message.includes('SSL') || error.message.includes('TLS') || error.message.includes('TLSV1_ALERT')) {
      console.error('\n💡 SSL/TLS Error:');
      console.error('   1. Ensure your connection string uses mongodb+srv:// (not mongodb://)');
      console.error('   2. Check if your connection string includes ?tls=true or &tls=true');
      console.error('   3. Verify Node.js version is 16+ (current:', process.version, ')');
      console.error('   4. Try updating mongoose: npm install mongoose@latest');
      console.error('   5. Check MongoDB Atlas → Network Access → IP Whitelist');
      console.error('   6. Ensure your connection string format: mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority');
    }
    
    console.error('\n🔍 Troubleshooting Steps for Vercel:');
    console.error('   1. Verify MONGODB_URI in Vercel → Settings → Environment Variables');
    console.error('   2. Check MongoDB Atlas → Network Access → Add 0.0.0.0/0 (allow from anywhere)');
    console.error('   3. Check MongoDB Atlas → Database Access for user credentials');
    console.error('   4. Ensure cluster is running (not paused)');
    console.error('   5. Redeploy backend after fixing environment variables');
    console.error('   6. Check Vercel function logs for detailed error messages');
    console.error('');
    
    // Don't exit in serverless - let the error propagate
    if (!process.env.VERCEL) {
      process.exit(1);
    }
    throw error; // Re-throw for serverless error handling
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err.message);
  // Clear cached connection on error
  cachedConnection = null;
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  Mongoose disconnected');
  // Clear cached connection on disconnect
  cachedConnection = null;
});

// Handle reconnection in serverless environments
mongoose.connection.on('reconnected', () => {
  console.log('✅ Mongoose reconnected to MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  // console.log('Mongoose connection closed through app termination');
  process.exit(0);
});

module.exports = connectDB;
