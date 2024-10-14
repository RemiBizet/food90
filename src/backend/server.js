// Backend part handling the database
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

mongoose.connect('mongodb://127.0.0.1:27017/food90', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/api/cart', cartRoutes);
app.use('/api/login', loginRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
