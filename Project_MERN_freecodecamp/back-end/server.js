import express from 'express';
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"
import productRoutes from "./routes/product.routes.js"
import { Mongoose } from 'mongoose';
import mongoose from 'mongoose';
import path from "path"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/front-end/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "front-end", "dist", "index.html"));
	});
}

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
})
