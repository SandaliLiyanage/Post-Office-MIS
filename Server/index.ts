import express from "express";
import MailRoutes from "./routers/mailroutes";
import EmployeeRoutes from "./routers/employeeroutes";
import AuthRoutes from "./routers/authroutes";
import DeliveryRoutes from "./routers/deliveryroutes"
import cors from "cors";
import BundleRoutes from "./routers/bundleroutes"
const app = express();
const router = express.Router();

app.use(cors({ origin: "*" })); // Enable CORS for all origins
app.use(express.json()); // Middleware to parse JSON

//app.use(express.static("public"));

app.use("/mail", MailRoutes);
app.use("/employee", EmployeeRoutes);
app.use("/auth", AuthRoutes);
app.use("/delivery", DeliveryRoutes)
app.use("/bundles", BundleRoutes)

const port = 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});
