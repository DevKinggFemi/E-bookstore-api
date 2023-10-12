const router = require("express").Router();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51N2QtTBPyWgjcfZrn0PGhThQcY33iuSP0IxnQMCCcMfoZwNQW25dsQwxu3hQagpTGv8xFIKc3oCsZMF3cd73gDPf002RwSmXlB');

router.post("/payment", async (req,res)=> {
  const charge = stripe.charges.create({
   
    source: req.body.tokenId,
    amount: req.body.amount,
    currency: "usd"
   }, ({ apiKey: 'sk_test_51N2QtTBPyWgjcfZrn0PGhThQcY33iuSP0IxnQMCCcMfoZwNQW25dsQwxu3hQagpTGv8xFIKc3oCsZMF3cd73gDPf002RwSmXlB'}),(stripeErr, stripeRes)=>{
    if (stripeErr) {
      res.status(500).json(stripeErr);
    } else {
      res.status(200).json(stripeRes);
    }
  })
})
module.exports = router; 