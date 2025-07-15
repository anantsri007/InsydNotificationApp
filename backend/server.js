const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/insyd', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/notifications', notificationRoutes);

app.listen(4000, () => console.log('Backend running on http://localhost:4000'));
