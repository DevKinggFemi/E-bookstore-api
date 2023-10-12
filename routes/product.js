const router = require("express").Router();
const Product = require("../models/Product");
const {verification, verifyTokenAndAuthorization, verifyAdmin} = require("./verifyToken");
//Create 
router.put("/create", verifyAdmin, async (req,res) => {
    const newProduct = new Product(req.body)
    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
})
//UPDATE
router.put("/:id", verifyAdmin, async (req,res)=>{
    
    try{
        const updatedProduct = await Product.findByIdAndUpdate((req.params.id), {
            $set: req.body
        }, {new: true});
        res.status(200).json(updatedProduct);
    }catch(err) {res.status(500).json(err)};
})

//Delete
router.delete("/:id", verifyAdmin, async (req,res)=> {
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({success:true});
    }catch(err){
        res.status(500).json(err);
    }
})
//GET  Product
router.get("/:id", async (req,res)=> {
    try{
      const product=  await Product.findById(req.params.id);
 
    res.status(201).json(product);
    }catch(err){
        res.status(500).json(err);
    }
})
//GET ALL USERS
router.get("/", async (req,res)=> {
    const qNew = req.query.new;
    const qCategory = req.query.category;

    try{
let products;
if (qNew){
    products = await Product.findById().sort({creadtedAt: -1}).limit(5)
}
else if (qCategory){
    products = await Product.find({categories:{
        $in: [qCategory],
    }})
}
else {
    products = await Product.find();
}
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
});
   
module.exports = router;