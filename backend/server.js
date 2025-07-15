const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection string (directly included)
const mongoURI = 'mongodb+srv://AnantSri28:NREcNM-E95VrGVe@cluster0.wfcuydd.mongodb.net/insyd?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));


app.get('/', (req, res) => {
  res.send('Backend is live!');
});




// Routes
app.use('/api/notifications', notificationRoutes);

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});





// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const notificationRoutes = require('./routes/notificationRoutes');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost:27017/insyd', { useNewUrlParser: true, useUnifiedTopology: true });

// app.use('/api/notifications', notificationRoutes);

// app.listen(4000, () => console.log('Backend running on http://localhost:4000'));
