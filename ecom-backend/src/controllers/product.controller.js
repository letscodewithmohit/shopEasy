import Product from '../models/Product.model.js';
import cloudinary from '../config/cloudinary.js';
// Create new product (Admin only)
export const createProduct = async (req, res) => {
    try{
        const {name, description, price, category, stock,isFeatured} = req.body;
    
        if(!req.file) {
            return res.status(400).json({
                success : false,
                message : "Product image is required",
            });
        }

        // we are taking the image url from cloudary and storing the url in db;
        const imageUrl = req.file?.path;

        const newProduct = await Product.create({
            name, description, price, category, stock, 
             isFeatured: isFeatured || false,
            image : {
            url : imageUrl,
            public_id : req.file.filename
            },
            
            createdBy: req.user.id
        });

        res.status(201).json({
            success : true,
            message : "Product created successfully",
            product : newProduct,
        });


    }catch(error){
        res.status(500).json({
            success : false,
            message : "Server Error",
            error,
        });
    }
};

// UPDATE PRODUCT (ADMIN ONLY)

export const updateProduct = async (req,res) => {
    try{
        const productId = req.params.id;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId, req.body, {new:true, runValidators:true}
        );

        if(!updatedProduct){
            return res.status(404).json({
                message : "Product not found"
            })
        }

        res.status(200).json({
            message : "Product updated sucessfully",
            updatedProduct
        })
    }catch(error){
        res.status(500).json({
            message : "Server Error",
            error,
        })
    }
};

// delete product (admin only) 

export const deleteProduct = async (req,res) => {

    try{
        const product = await Product.findById(req.params.id);
        
        if(!product){
            return res.status(404).json({
                success : false,
                message : "Product not found"
            })
        }
      
        // delete image from cloudinary
        if(product.image?.public_id) {
            await cloudinary.uploader.destroy(product.image.public_id);
        }
        
        // delete product from database
        await product.deleteOne();
        
    
        res.status(200).json({
            success : true, 
            message : "Product deleted successfully",
            
        })


    }catch(error){
        res.status(500).json({
            message : "Server Error", error
        });
    }
}

// Get all products

export const getAllProducts = async (req,res) =>{
    try{

        const { search,category,minPrice, maxPrice,sort, page = 1, limit = 6, featured} = req.query; // reading ?search=xxxx from URL

        
        let query = {};

        // for search functionality
        if (search) {
            query.name = { 
                $regex: search,  // to perform partial match
                $options: 'i' // case-insensitive search
            }; 
        }

        // for category filter functionality

        if(category){
            query.category = category;
        }
       
if (featured === "true") {
  query.isFeatured = true;
}


        // price range filter can be added similarly

        if(minPrice || maxPrice){
            query.price = {};

            if(minPrice){
                query.price.$gte = Number(minPrice);
            }
            if(maxPrice){
                query.price.$lte = Number(maxPrice);
            }
        }

        // sort functionality can be added similarly

        let sorted = {};

        if(sort === 'priceAsc'){
            sorted.price = 1;  //ascending order
        }
        else if(sort === 'priceDesc'){
            sorted.price = -1; //descending order
        }
        

        // pageination can be added similarly

        const pageNumber =  Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        
        // total count for pagination
        const paginatedProducts = await Product.countDocuments(query);// this is a This is the TOTAL COUNT of products after applying all filters.

         // main query to database
        const allProducts = await Product.find(query).sort(sorted).skip(skip).limit(limitNumber);

        res.status(200).json({
            message : "Products fetched successfully",
            paginatedProducts,// total products
            CursorPage : pageNumber, // current page
            totalPages : Math.ceil(paginatedProducts / limitNumber), 
            limit : limitNumber,// per page limit
            results : allProducts.length,// count of current page
            products : allProducts// actual data

        });
    }catch(error){
        res.status(500).json({
            message : "Server Error",
            error,
        });
    }
};

// Get single product by ID 

export const getProductById = async (req,res)=>{
    try{
        const singleproduct = await Product.findById(req.params.id);
        if(!singleproduct){
            return res.status(404).json({
                message : "Product not found"
            });
        }

        res.status(200).json({
            message : "Single Product fetched successfully",
            singleproduct       
        });
    }catch (error){
        res.status(500).json({
            message : "Server Error",
            error,
        });
    }
}