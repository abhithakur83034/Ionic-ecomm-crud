const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

app.use('/img', express.static("./uploads"));

const userRoute = require('./route/userRoute');
const productRoute = require('./route/productRoute');
const addToCartRoute = require('./route/addToCartRooute');
const reviewRouter = require('./route/reviewRoute');
const productReviewRoute = require('./route/productReviewRoute');
const myPayment = require('./route/myPaymentRoute');
const successPay = require('./route/successPayRoute')


app.use('/api',userRoute);
app.use('/api',productRoute);
app.use('/api',addToCartRoute);
app.use('/api',reviewRouter);
app.use('/api',productReviewRoute);
app.use('/api',myPayment);
app.use('/api',successPay);


module.exports=app