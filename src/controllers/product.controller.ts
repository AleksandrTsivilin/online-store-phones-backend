'use strict';

import { Product } from '../models/Product.model.js';
import { productService } from '../services/product.service.js';
import { Controller } from '../types.js';
import {
  checkValidCategory,
  formatMultipleProducts,
  formatSingleProduct,
  getPaginationInfo,
  getUniqueItems,
} from '../utils/helpers.js';

class ProductController {
  private static instance: ProductController | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance() {
    if (!ProductController.instance) {
      ProductController.instance = new ProductController();
    }

    return ProductController.instance;
  }

  getProductsByDiscount: Controller = async (req, res) => {
    const countProductsPerCategory = 4;

    const discountProducts = await productService.getDiscountProductsPerCategory(
      countProductsPerCategory
    );

    if (!discountProducts) {
      res.status(404).json({ message: 'No discounted products found' });

      return;
    }

    const formattedProducts = formatMultipleProducts(discountProducts);

    res.status(200).json(formattedProducts);
  };

  getProductsByNew: Controller = async (req, res) => {
    const countProductsPerCategory = 12;

    const newProducts = await productService.getNewProducts(countProductsPerCategory);

    if (!newProducts) {
      res.status(404).json({ message: 'No new products found' });

      return;
    }

    const formattedProducts = formatMultipleProducts(newProducts);

    res.status(200).json(formattedProducts);
  };

  getCountOfProducts: Controller = async (req, res) => {
    const { category } = req.query;

    if (!category) {
      res.status(404).json(
        { message: 'Missing required category parameter' }
      );

      return;
    }

    const normalizeCategory = String(category).toLowerCase();

    const isValidCategory = await checkValidCategory(normalizeCategory);

    if (!isValidCategory) {
      res.status(404).json(
        { message: `Invalid category parameter '${category}'` }
      );

      return;
    }

    const count = await productService.getCountProducts(normalizeCategory);

    if (!count) {
      res.status(404).json({ message: 'Count not found' });

      return;
    }

    res.status(200).json(count);
  };

  getRecommendedProducts: Controller = async (req, res) => {
    const { price, fullPrice, category } = req.query;

    if (!price) {
      res.status(404).json(
        { message: 'Missing required price parameter' }
      );

      return;
    }

    if (!fullPrice) {
      res.status(404).json(
        { message: 'Missing required fullPrice parameter' }
      );

      return;
    }

    if (!category) {
      res.status(404).json(
        { message: 'Missing required category parameter' }
      );

      return;
    }

    const normalizePrice = Number(price);
    const normalizeFullPrice = Number(fullPrice);
    const normalizeCategory = String(category).toLowerCase();
    const priceLimit = 200;
    const limit = 4;

    const isValidCategory = await checkValidCategory(normalizeCategory);

    if (!isValidCategory) {
      res.status(404).json(
        { message: `Invalid category parameter '${category}'` }
      );

      return;
    }

    const recomendedProducts = await productService.getRecommended(
      normalizePrice,
      normalizeFullPrice,
      normalizeCategory,
      priceLimit,
      limit,
    );

    if (!recomendedProducts) {
      res.status(404).json({ message: 'Recommended products not found' });

      return;
    }

    const allRecommendedProducts = [
      ...recomendedProducts.recommendedByPrice,
      ...recomendedProducts.recommendedByFullPrice,
      ...recomendedProducts.recommendedByCategory,
    ];

    const formattedProducts = formatMultipleProducts(allRecommendedProducts);
    const uniquesProducts = getUniqueItems<Product>(formattedProducts, 'id');

    res.status(200).json(uniquesProducts);
  };

  getProductsBySearch: Controller = async (req, res) => {
    const { query } = req.query;

    if (!query) {
      res.status(404).json(
        { message: 'Missing required query parameter' }
      );

      return;
    }

    const normalizeQuery = String(query).trim();
    const count = 4;

    const products = await productService.getBySearch(normalizeQuery, count);

    const formattedProducts = formatMultipleProducts(products);

    res.status(200).json(formattedProducts);
  };

  getProductsByCategory:Controller = async (req, res) => {
    const { initialLimit, offset } = getPaginationInfo(req);

    const { sortBy, category } = req.query;

    if (!category) {
      res.status(404).json(
        { message: 'Missing required category parameter' }
      );

      return;
    }

    const normalizeSortBy = String(sortBy);
    const normalizeCategory = String(category).toLowerCase();

    const isValidCategory = await checkValidCategory(normalizeCategory);

    if (!isValidCategory) {
      res.status(404).json(
        { message: `Invalid category parameter '${category}'` }
      );

      return;
    }

    const products = await productService.getProductsByCategory(
      offset,
      initialLimit,
      normalizeSortBy,
      normalizeCategory,
    );

    if (!products) {
      res.status(404).json({ message: 'Products not found' });
    }

    const formattedProducts = formatMultipleProducts(products.rows);

    res.status(200).json({ count: products.count, data: formattedProducts });
  };

  getProductByDeviceId: Controller = async (req, res) => {
    const { deviceId } = req.params;

    const normalizeDeviceId = String(deviceId).toLowerCase();

    const productData = await productService.getByDeviceId(normalizeDeviceId);

    if (!productData) {
      res.status(404).json({ message: `Device with id ${deviceId} not found` });

      return;
    }

    const formattedPhone = formatSingleProduct(productData);

    res.status(200).json(formattedPhone);
  };
}

export const productController = ProductController.getInstance();
