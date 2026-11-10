const product = require('../models/productModel')
//Add products
exports.addProduct = async(req,res)=>{
    const {name,price,category,stock}=req.body
    const photo = req.file.filename
    const existingProduct = await product.findOne({name})

    if(existingProduct){
        res.status(406).json("Already Added!!")
    }
    else{
        const newProduct = await product.create({
            name,price,category,stock,photo
        })
        res.status(200).json(newProduct)
    }
}
//list products
exports.listProduct = async (req,res)=>{
    const productList = await product.find()
    res.status(200).json(productList)
}
//get product
exports.getProduct=async(req,res)=>{
    const {pid}=req.params
    const productobj = await product.findOne({_id:pid})
    res.status(200).json(productobj)
}
//delete product
exports.deleteProduct =async(req,res)=>{
    const{pid}=req.params
    const productobj = await product.findByIdAndDelete(pid)
    res.status(200).json("Deleted")
}
//updateProduct 
exports.updateProduct=async(req,res)=>{
    const {pid}=req.params
    const {name,price,category,stock}=req.body
    
    const photo = req.file? req.file.filename: req.body.photo
    const updateProduct = await product.findByIdAndUpdate(
        pid,
        {name,price,category,stock,photo},
        {new:true}
    )
    res.status(200).json(updateProduct)

}