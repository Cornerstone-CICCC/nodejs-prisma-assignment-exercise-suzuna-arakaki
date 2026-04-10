// Set up your server
import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import productRouter from "./routes/product.routes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/products", productRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send("Invalid route");
});

const PORT = process.env.BACKEND_PORT;
if (!PORT) {
  throw new Error("Missing backend port!");
}
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
