import express from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from './routes/UserRoutes.js';
import connectDB from './config/db.js';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, ()=>{ console.log(`Server started on PORT ${PORT}`);})

