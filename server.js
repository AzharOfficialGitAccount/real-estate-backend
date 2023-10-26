const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');

dotenv.config();

const User = require('./app/routes/user');
const Auth = require('./app/routes/auth');
const List = require('./app/routes/listing');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(express.json());
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api/v1/user', User);
app.use('/api/v1/auth', Auth);
app.use('/api/v1/listing', List);

app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
