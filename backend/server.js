// ENTRY FILE
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./routes.js";
import connectDB from "./database.js";
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cookieParser());
app.use('/storage', express.static('storage'));

const corsOption = {
    credentials: true,
    origin: ['http://localhost:3000'],
}
app.use(cors(corsOption));

connectDB();
app.use(express.json({limit:"8mb"})); // limit is used to set size of comming data we set 8mb (default is 100kb)
app.use(router);

app.get("/", (req, res)=>{
    res.send("Hello from server");
})

app.listen(PORT, ()=>{console.log(`server running on ${PORT}`)})