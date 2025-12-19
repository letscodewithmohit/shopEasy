import express from "express";
import Cart from "../models/Cart.model.js";
import Product from "../models/Product.model.js"

export const getCart = async (req,res) => {

  try{
    const userId = req.user.id;
      // Find user's cart and populate product details

     const cart = await Cart.findOne({user : userId})
     .populate("items.product");//fetch full product details
    
     if(!cart){
        return res.status(200).json({
            message : "Cart is empty",
            cart : {
                items : [],
                totalItems : 0,
                totalPrice : 0
            }
        });
     }


      cart.items = cart.items.filter(item => item.product !== null);
      await cart.save();


    //  Calculate total price 

    let totalItems = 0;
    let totalPrice = 0;
    cart.items.forEach(item => {
        totalItems +=  item.quantity;
        totalPrice += item.price * item.quantity;
    })

    res.status(200).json({
        message : "Cart fetched successfully",
        totalItems, 
        totalPrice,
        cart
    });
  }catch (error) {
     res.status(500).json({
        message : "Server Error",
        error
     })
  }
};
// create cart
export const addToCart = async (req, res)=>{
    try{
        const userId = req.user.id; // from auth middleware
        const {productId,quantity} = req.body;

        if(!productId){
            return res.status(400).json({message : "Product ID is required"});
        }


        //validations 
         
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock <= 0) {
      return res.status(400).json({ message: "Product is out of stock" });
    }


        let cart = await Cart.findOne({user : userId});
        
        let qtyToAdd = quantity || 1;




        if(!cart){
           if(qtyToAdd > product.stock){
            return res.status(400).json({
                message : `Only ${product.stock} items left in stock`
            })
           }
            // create new cart
            cart = new Cart({
                user : userId,
                items : [{product : productId, quantity : qtyToAdd, price : product.price}]
            });
        }else{
            // update existing cart
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

            if(itemIndex > -1){
                // product exists in cart, update quantity
               const newQuantity =  cart.items[itemIndex].quantity + qtyToAdd;

               if(newQuantity > product.stock){
                            return res.status(400).json({
                message : `Only ${product.stock} items left in stock`
            })
            }
            cart.items[itemIndex].quantity = newQuantity;
            }else{  
            
            if(qtyToAdd > product.stock){
             return res.status(400).json({
             message : `Only ${product.stock} items left in stock`
            })
            }

                // product not in cart, add new item
                cart.items.push({product : productId, quantity : qtyToAdd,price : product.price});

            }
        }
        await cart.save();
        res.status(200).json({
            message : "Product added to cart successfully",
            cart
        });
    }catch(error){
        res.status(500).json({
            message : "Server Error",
            error,
        }); 
    }
}

// update api

export const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, action, quantity } = req.body;

    if (!productId || !action) {
      return res.status(400).json({
        message: "productId and action are required"
      });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

   cart.items = cart.items.filter(item => item.product);
   await cart.save();

    const itemIndex = cart.items.findIndex(
      (item) => item.product.equals(productId)
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product does not exist anymore"
      });
    }

    // 👉 Handle all cart actions

    if (action === "increase") {
       if (cart.items[itemIndex].quantity + 1 > product.stock) {
        return res.status(400).json({
          message: `Only ${product.stock} items available`
        });
      }


      cart.items[itemIndex].quantity += 1;
    }

    else if (action === "decrease") {
      cart.items[itemIndex].quantity -= 1;

      // If quantity reaches 0 → remove
      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1);

        await cart.save();

        return res.json({
          message : "Product removed from cart",
          cart
        });
      }
    }

    else if (action === "set") {

       if (quantity == undefined|| quantity < 0) {
    return res.status(400).json({
      message: "Valid quantity is required"
    });
  }

      if (quantity > product.stock) {
        return res.status(400).json({
          message: `Only ${product.stock} items available`
        });
      }

      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
    }
  
    // remove
    else if (action === "remove") {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error
    });
  }
};


//clear cart

// Clear entire cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart is already empty",
      });
    }

    // ❗Clear all items
    cart.items = [];
    await cart.save();

    res.status(200).json({
      message: "Cart cleared successfully",
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error
    });
  }
};
