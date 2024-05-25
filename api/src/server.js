const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index.js');
const { BASE_URL } = process.env;
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    console.log('New user connected');
    
    socket.on('sendMessage', (message) => {
        io.emit('message', message);
    });
  
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.name = 'API';

// Ensure CORS middleware is applied first
app.use(cors({
    origin: BASE_URL || '*', // Use BASE_URL if defined, otherwise allow all origins
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
}));

// Handle preflight requests globally
app.options('*', cors({
    origin: BASE_URL || '*', // Use BASE_URL if defined, otherwise allow all origins
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
}));

// Add logging to verify headers
app.use((req, res, next) => {
    console.log('CORS Middleware:', BASE_URL);
    res.header('Access-Control-Allow-Origin', BASE_URL || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

// Define routes
app.use('/', routes);

app.get('/', (req, res) => {
    res.send('Energialy API');
});

// Error catching middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = { app, server, io };
