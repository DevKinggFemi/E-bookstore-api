const mongoose = require ("mongoose");

const ProductSchema = new mongoose.Schema ({
    Title : {type: String, required:true },
    Author : {type:String , required:true},
    Img : {type:String , required:true},
    Categories : {type:Array },
    Des: {type:String, required:true },
    Price: {type:Number, required:true},
    BookshopCategories :{ type: Array },
    isAdmin : {type: Boolean,default: false}
}, {timestamps:true});
module.exports = mongoose.model("Product", ProductSchema);
