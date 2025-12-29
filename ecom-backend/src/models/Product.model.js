import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : [true , "Product name is required"],
            trim : true
        },
        description : {
            type : String,
            required : [true , "Product description is required"],
            trim : true
        },
        price : {
            type : Number,
            required : [true , "Product price is required"],
            min : [0 , "Price cannot be negative"]
        },
        category : {
            type : String,
            required : [true , "Product category is required"],
            trim : true
        },
        stock : {
            type : Number,
            required : [true , "Product stock is required"],
            min : [0 , "Stock cannot be negative"],
            default : 0
        },
        image :{
            url : {
                type : String, 
                required : true
            },
            public_id : {
                type : String, 
                required : true
            }

        },

    isFeatured: {
  type: Boolean,
  default: false,
},

     createdBy : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // link product to admin user
      required: true
    }
},
    { timestamps: true}
);


const Product = mongoose.model("Product", productSchema);
export default Product;