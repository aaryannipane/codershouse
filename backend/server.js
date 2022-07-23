// ENTRY FILE
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./routes.js";
import connectDB from "./database.js";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5500;

const corsOption = {
    origin: ['http://localhost:3000'],
}
app.use(cors(corsOption));

connectDB();
app.use(express.json());
app.use(router);

app.get("/", (req, res)=>{
    res.send("Hello from server");
})

app.listen(PORT, ()=>{console.log(`server running on ${PORT}`)})