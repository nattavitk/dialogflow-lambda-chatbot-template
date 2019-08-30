const cors = require("cors");
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const awsServerlessExpress = require("aws-serverless-express");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

const { mainChat } = require("./dialogflow/mainChat");

// CORS
const allowedOrigins = ["*"];
// const corsOptions = {
//     origin: (origin, callback) => {
//         if (allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     }
// };

// Express
const app = express();
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

// Add headers
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigins);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    // res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

// Router
const router = express.Router();
router.post("/", mainChat);

// Export to lambda
app.use("/fulfillment", router);
const server = awsServerlessExpress.createServer(app);
exports.handler = async (event, context) => {
    return awsServerlessExpress.proxy(server, event, context, "PROMISE")
        .promise;
};
