import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import todoRoutes from "./routes/todos";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);

mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`listening on port ${process.env.PORT}`);
    app.listen(process.env.PORT);
});
