'use strict';

import express from 'express';
import { productController } from '../controllers/product.controller.js';

export const productRouter = express.Router();

productRouter.get('/discount', productController.getProductsByDiscount);
productRouter.get('/new', productController.getProductsByNew);
productRouter.get('/count', productController.getCountOfProducts);
productRouter.get('/recommended', productController.getRecommendedProducts);
productRouter.get('/search', productController.getProductsBySearch);
productRouter.get('/', productController.getProductsByCategory);
productRouter.get('/:deviceId', productController.getProductByDeviceId);
