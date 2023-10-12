const Cart = require("../models/Cart");
const router = require("express").Router();

const {verification, verifyTokenAndAuthorization, verifyAdmin} = require("./verifyToken");
// Update or Add to Cart
router.put("/create/:userId", verifyTokenAndAuthorization, async (req, res) => {
  const { userId,products: [{Title, Img, Des, Price, ProductId, quantity }]} = req.body;
  try {
    // Find the user's cart based on userId
    console.log(userId)
    console.log("quantity",quantity)
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // If the user's cart doesn't exist, create a new cart
      cart = new Cart({ userId,  products: [] });
      console.log(cart)
    }
    const existingProduct = cart.products.find(
      (product) => product.ProductId.toString() === ProductId.toString())
    // Check if the product with productId already exists in the cart
    console.log(existingProduct)
    if (existingProduct) {
      // If the product exists, update its quantity and Price
      existingProduct.quantity +=quantity;
      existingProduct.Price = existingProduct.quantity * existingProduct.Price;
    } 
      // If the product does not exist, add it to the cart
      
    else if (!existingProduct)  {
      // If the product does not exist, add it to the cart
      const productToAdd = {
        Title,
        Img,
        Des,
        Price,
        ProductId,
        quantity,
      };
      cart.products.push(productToAdd);
      console.log("2",cart)
    }

    // Save the updated cart
    const savedCart = await cart.save();

    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Define the delete route
router.delete('/:userId/:ProductId',verification, async (req, res) => {
  const { ProductId, userId } = req.params;
  console.log('ProductId' ,ProductId);
  console.log('userId' ,userId);

  try {
    let cart = await Cart.findOne({ userId });
console.log(cart);
   
      
    const existingProduct = cart.products.find(
      (product) => product.ProductId.toString() === ProductId.toString())

console.log(existingProduct);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Remove the product from the products array
    cart.products = cart.products.filter(
      (product) => product.ProductId.toString() !== ProductId
    );

    // Save the updated cart
    const updatedCart = await cart.save();

    return res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET UserCart
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });   
    if (!cart) {
      return res.status(404).json({ message: "User cart does not exist" });
    }
    
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL CARTS
router.get("/", verifyAdmin , async (req,res)=> {
    try{
const carts = Cart.find();
res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err);
    }
});
   
module.exports = router;
