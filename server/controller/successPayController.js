const SuccessPayModel = require('../model/successPayModel');

const successPay = async (req, res) => {
    const { date, userName, items, totalQuantity, totalPrice } = req.body;

    try {
        const success = await SuccessPayModel.insertMany({
            date,
            userName,
            items,  // Assuming items is an array of objects
            totalQuantity,
            totalPrice
        });

        res.status(200).json({ message: success, status: 'success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    successPay
};
