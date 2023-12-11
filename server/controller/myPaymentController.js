const MyPayment = require('../model/myPaymentModel')

const savePayment=async(req,res)=>{
    try {
        //console.log(req.body);
        const save = await MyPayment.insertMany(req.body)      
        res.status(200).json({message:save, status:"success"})  
    } catch (error) {
        res.status(500).send(error)
    }
}

const showCard=async(req,res)=>{
    //console.log(req.params);
    try {
        const card = await MyPayment.find(req.body)
        res.status(200).json({message:card, status:"success"})  

    } catch (error) {
        res.status(500).send(error)
    }
}

const checkUser=async(req,res)=>{
    //console.log(req.body);
    //console.log(req.params);
   
        try {
            const check = await  MyPayment.findOne({userId : req.body.userId, card:req.body.cardName})
           res.status(200).json({message:check, status:"success"}) 
        } catch (error) {
            res.status(500).send(error)
        }
    
}





module.exports={
    savePayment,
    showCard,
    checkUser,
}