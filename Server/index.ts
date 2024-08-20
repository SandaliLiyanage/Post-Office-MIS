import express from 'express';
import MailRoutes from './routers/mailroutes'
import EmployeeRoutes from "./routers/employeeroutes";
import AuthRoutes from './routers/authroutes'
import cors from 'cors';

const app = express();
const router = express.Router();

app.use(cors({ origin: "*" })); // Enable CORS for all origins
app.use(express.json()); // Middleware to parse JSON


app.use('/mail', MailRoutes);
app.use("/employee", EmployeeRoutes);
app.use('/auth', AuthRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
