const express = require('express');
const app = express();
const db = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const { checkForAuthentication } = require('./middlewares/authMiddleware');

const userRoutes = require('./routes/userRoute')
const formRoutes = require('./routes/formRoute');
const { paymentSession } = require('./controllers/stripePaymentController');

require('dotenv').config();
const PORT = process.env.PORT || 8000;

const prodOrigins = [process.env.ORIGIN_PROD_1]
const devOrigins = [process.env.ORIGIN_LOCAL]
const allowedOrigins = process.env.NODE_ENV === 'prod' ? prodOrigins : devOrigins;

const corsOptions = {
    origin: (origin, callback) => {
        console.log('allowedOrigins:', allowedOrigins);
        console.log('Origin:', origin);
        if(!origin || allowedOrigins.includes(origin)){
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}

// const corsOptions = {
//     origin: 'https://flexform.vercel.app',
//     credentials: true
// }

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthentication);

// Middleware function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next();
}
app.use(logRequest);

app.get("/health", (req, res) => {
    console.log("Welcome to Flex Form");
    res.send("Welcome to Flex Form");
})

app.use('/', userRoutes);
app.use('/form', formRoutes);

app.post('/api/stripe-checkout-session', paymentSession);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})