const router = require("express").Router();

const Order = require("../models/Order");
const {verification, verifyTokenAndAuthorization, verifyAdmin} = require("./verifyToken");
//Create 
router.put("/create", verification, async (req,res) => {
    const neOrder = new Order(req.body)
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err);
    }
})
//UPDATE
router.put("/:id", verifyAdmin, async (req,res)=>{
    
    try{
        const updatedOrder = await Cart.findByIdAndUpdate((req.params.id), {
            $set: req.body
        }, {new: true});
        res.status(200).json(updatedOrder);
    }catch(err) {res.status(500).json(err)};
})

//Delete
router.delete("/:id", verifyAdmin, async (req,res)=> {
    try{
        await Order.findByIdAndDelete(req,params.id);
        res.status(200).json({success:true});
    }catch(err){
        res.status(500).json(err);
    }
})
//GET User Order
router.get("/find/:userId", verifyTokenAndAuthorization, async (req,res)=> {
    try{
      const orders=  await Order.find({userId: req.params.userId});
 
    res.status(201).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
})
//GET ALL CARTS
router.get("/", verifyAdmin , async (req,res)=> {
    try{
const orders = Order.find();
res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
});

// Get montly income
router.get("/income", verifyAdmin , async (req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));
try{
    const income = await Order.aggregate([
        {$match: {createdAt :{$gte : prevMonth}}},
        {
            $project : {
                month : { $month : "$createdAt"},
                sales: "$amount"
            }
        },
            {
                $group : {
                    _id : "$month",
                    total: {$sum : "$sales"}
                }
            }

        
    ]);
    res.status(200).json(income);
} catch(err) {
res.status(500).json(err);
}

})  
module.exports = router;