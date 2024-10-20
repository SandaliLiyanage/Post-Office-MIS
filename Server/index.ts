import express from "express";
import MailRoutes from "./routers/mailroutes";
import EmployeeRoutes from "./routers/employeeroutes";
import AuthRoutes from "./routers/authroutes";
import DeliveryRoutes from "./routers/deliveryroutes";
import cors from "cors";
import BundleRoutes from "./routers/bundleroutes";
import AddressRoutes from "./routers/addressroutes";
import MoneyOrderRoutes from 	"./routers/moneyorderroutes";
import bodyParser from 'body-parser';
import MoneyOrderController from './controllers/moneyordercontroller';

const app = express();
const moneyOrderController = new MoneyOrderController();
app.use(bodyParser.json());
const router = express.Router();

app.use(cors({ origin: "*" })); // Enable CORS for all origins
app.use(express.json()); // Middleware to parse JSON

//app.use(express.static("public"));
// Add a route for the webhook with the raw body parser
app.post('/money-order/stripe-webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  moneyOrderController.handleStripeWebhook(req, res);
});

app.use("/mail", MailRoutes);
app.use("/employee", EmployeeRoutes);
app.use("/auth", AuthRoutes);
app.use("/delivery", DeliveryRoutes);
app.use("/bundles", BundleRoutes);
app.use("/address", AddressRoutes);
app.use("/money-order",  MoneyOrderRoutes);


const port = 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});
