import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import records from "./routes/record.js";
// Reads from the .env file to set process.env
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/records", records);

// Start Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
