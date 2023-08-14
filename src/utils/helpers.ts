'use strict';

import { Request } from 'express';
import { Product } from '../models/Product.model.js';
import { OrderItem } from 'sequelize';
import { FullProduct } from '../types.js';
import { Category } from '../models/Category.model.js';

export const getUniqueItems = <T>(array: T[], key: keyof T) => {
  const uniques = new Set();

  return array.filter(item => {
    if (!uniques.has(item[key])) {
      uniques.add(item[key]);

      return true;
    }

    return false;
  });
};

export const getPaginationInfo = (req: Request) => {
  const { page, limit } = req.query;

  const initialPage = Number(page || 1);
  const initialLimit = Number(limit || 16);

  const offset = (initialLimit * initialPage) - initialLimit;

  return { initialLimit, offset };
};

export const generateSortingOrder = (sortBy: string | string[] | undefined) => {
  if (sortBy === 'highestPrice') {
    return [['fullPrice', 'DESC'], ['id', 'ASC']] as OrderItem[];
  }

  if (sortBy === 'lowestPrice') {
    return [['fullPrice', 'ASC'], ['id', 'ASC']] as OrderItem[];
  }

  return [['year', 'DESC'], ['id', 'ASC']] as OrderItem[];
};

export const formatSingleProduct = (
  fullProduct: FullProduct,
) => {
  const {
    product,
    imagesColor,
    capacities,
    descriptions,
    colors
  } = fullProduct;

  const productJSON = product?.toJSON();

  const images = imagesColor.map(imageColor => (
    imageColor.toJSON().imagePath
  ));

  const capacityAvailable = capacities.map(capacitySize => (
    capacitySize.toJSON().capacity
  ));

  const colorsAvailable = colors.map(colorData => (
    colorData.toJSON().color.title
  ));

  return {
    id: productJSON.detailId,
    resolution: productJSON.detail.resolution,
    processor: productJSON.detail.processor,
    camera: productJSON.detail.camera,
    zoom: productJSON.detail.zoom,
    cell: productJSON.detail.cell,
    namespace: productJSON.detail.namespace.title,
    name: productJSON.name,
    itemId: productJSON.id,
    fullPrice: productJSON.fullPrice,
    price: productJSON.price,
    ram: productJSON.ram,
    screen: productJSON.screen,
    capacity: productJSON.capacity,
    color: productJSON.color.title,
    category: productJSON.category.title,
    images,
    capacityAvailable,
    descriptions,
    colorsAvailable
  };
};

export const formatMultipleProducts = (products: Product[]) => {
  return products.map(product => {
    const {
      category,
      detailId,
      ...rest
    } = product.toJSON();

    return {
      ...rest,
      itemId: detailId,
      category: category.title,
    };
  });
};

export const checkValidCategory = async (category: string) => {
  const allCategories = await Category.findAll();

  const cateogories = allCategories.map(category => category.toJSON().title);

  return cateogories.includes(category);
};
