const mongoose = require ("mongoose");

const CartSchema = new mongoose.Schema ({
    userId : {type: String },
    products: [{
    Title : {type: String },
    Img : {type:String },
    Des: {type:String },
    Price: {type:Number, required:true},
ProductId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
 quantity: {type: Number, default: 1},
}
] 
    }, {timestamps:true});
module.exports = mongoose.model("Cart", CartSchema);

