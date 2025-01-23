const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const cartRoutes = require('./routes/cartRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Use environment variable for MongoDB connection
const mongoUri = process.env.MONGO_URI || 'mongodb://root:example@localhost:27017/food90';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/api/cart', cartRoutes);
app.use('/api/login', loginRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});