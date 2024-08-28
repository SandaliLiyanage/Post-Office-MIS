// Entry point for the Express server

import express from "express";
import MailRoutes from "./routers/mailroutes";
import EmployeeRoutes from "./routers/employeeroutes";
//import AuthRoutes from "./routers/authroutes";
import cors from "cors";

// Initialize the Express application
const app = express();

// Create an Express router instance for routing
const router = express.Router();

app.use(cors({ origin: "*" })); // Enable CORS for all origins
app.use(express.json()); // Middleware to parse JSON (convert JSON to JavaScript objects)

//app.use(express.static("public")); //serve static files from the "public" directory

app.use("/mail", MailRoutes); // Requests to /mail will be handled by the mailroutes
app.use("/employee", EmployeeRoutes); // Requests to /employee will be handled by the employeeroutes
//app.use("/auth", AuthRoutes); // Requests to /auth will be handled by the authroutes

// Start the Express server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
