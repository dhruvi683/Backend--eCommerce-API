const express = require('express');
const upload = require('../services/upload');
const {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
    getPopularProducts,       
    getBestsellerProducts,    
    getNewArrivalProducts     
} = require('../controllers/productController');

const productRouter = express.Router();

productRouter.route('/')
    .get(getAllProducts)
    .post(createProduct);

productRouter.route('/:id')
    .get(getOneProduct)
    .put(updateProduct)
    .delete(deleteProduct);

productRouter.route('/:id/uploadImage')
    .post(upload.single('picture'), uploadProductImage);

productRouter.route('/popular')
    .get(getPopularProducts);

productRouter.route('/bestseller')
    .get(getBestsellerProducts);

productRouter.route('/newarrival')
    .get(getNewArrivalProducts);

module.exports = productRouter;
