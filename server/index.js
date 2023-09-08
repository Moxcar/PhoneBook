import express from "express";
import cors from "cors";
import { PORT } from "./config.js";

import indexRoutes from "./routes/index.routes.js";
import contactRoutes from "./routes/contacts.routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(contactRoutes);
app.use(indexRoutes);
app.listen(PORT);
console.log("Server running on port " + PORT);
