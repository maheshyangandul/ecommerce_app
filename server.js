import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoute from './routes/productRoute.js';
import cors from 'cors';


// config env 
dotenv.config();

// database config 
connectDB();

// rest Object 
const app = express();

// middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoute);

// rest api 
app.get('/', (req, res) => {
    res.send("<h1> Welcome to ecommerce app</h1>");
})



// PORT 
const PORT = process.env.PORT || 3000;

// run listen
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})