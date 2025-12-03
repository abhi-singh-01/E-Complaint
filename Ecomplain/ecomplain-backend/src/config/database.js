const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const options = {
      // Connection pool options for MongoDB Atlas
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('\n❌ Database connection error:', error.message);
    console.error('\n📋 Diagnostic Information:');
    console.error('   Connection String:', process.env.MONGODB_URI ? 
      process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@') : 'NOT SET');
    
    // Provide helpful error messages for common Atlas issues
    if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
      console.error('\n💡 Authentication Error:');
      console.error('   1. Check your MongoDB Atlas username and password in the connection string');
      console.error('   2. Verify database user exists in Atlas → Database Access');
      console.error('   3. Ensure user has read/write permissions');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.error('\n💡 DNS/Network Error:');
      console.error('   1. Check your MongoDB Atlas connection string format');
      console.error('   2. Verify cluster is running in Atlas dashboard');
      console.error('   3. Check internet connection');
    } else if (error.message.includes('timeout') || error.message.includes('whitelist')) {
      console.error('\n💡 IP Whitelist Error:');
      console.error('   1. Your current IP might have changed (dynamic IP)');
      console.error('   2. Check your current IP: https://whatismyipaddress.com/');
      console.error('   3. Compare with whitelisted IPs in Atlas → Network Access');
      console.error('   4. If different, add current IP or use 0.0.0.0/0 (development only)');
      console.error('   5. Wait 1-2 minutes after adding IP for changes to propagate');
    } else if (error.message.includes('ReplicaSetNoPrimary')) {
      console.error('\n💡 Replica Set Error:');
      console.error('   1. This usually indicates IP whitelist issue');
      console.error('   2. Check Network Access in MongoDB Atlas');
      console.error('   3. Verify your current IP is whitelisted');
      console.error('   4. Connection string format should be: mongodb+srv://...');
    }
    
    console.error('\n🔍 Troubleshooting Steps:');
    console.error('   1. Verify MONGODB_URI in .env file is correct');
    console.error('   2. Check MongoDB Atlas → Network Access for your IP');
    console.error('   3. Check MongoDB Atlas → Database Access for user credentials');
    console.error('   4. Ensure cluster is running (not paused)');
    console.error('   5. Try connecting from Atlas dashboard → Connect → Connect your application');
    console.error('');
    
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  // console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  // console.log('Mongoose disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  // console.log('Mongoose connection closed through app termination');
  process.exit(0);
});

module.exports = connectDB;
