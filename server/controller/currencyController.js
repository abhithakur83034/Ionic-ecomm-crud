const currencyConfig = require('../config/currency.json')

const currency = async(req,res)=>{
    try {
        res.status(200).json({currencyConfig , status:"success"})
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports={
    currency
}