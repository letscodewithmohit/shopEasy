import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from "./routes/order.routes.js";
dotenv.config();
const app = express(); 

// middlewares

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));
 
// app.use(cors({
//   origin: [
//     "http://localhost:5173", // local dev
//     "https://shop-easy-ochre.vercel.app" // production
//   ],
//   credentials: true
// }));

// app.use(cors({
//   origin: [
//     "http://localhost:5173", // local dev
//     "https://shop-easy-ochre.vercel.app" // production
//   ],
//   credentials: true
// }));

app.use(cors({
  origin: true, // allow all origins
  credentials: true
}));


app.use(express.json());

app.get("/", (req, res) => {
  res.send("ShopEasy Backend is running 🚀");
});

app.use("/api/user", userRoutes); 
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart",cartRoutes );
app.use("/api/orders", orderRoutes);



app.set("trust proxy", 1);


export default app;
