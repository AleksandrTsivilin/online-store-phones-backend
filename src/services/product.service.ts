'use strict';

import { Category } from '../models/Category.model.js';
import { Product } from '../models/Product.model.js';
import { Op, Sequelize } from 'sequelize';
import { generateSortingOrder } from '../utils/helpers.js';
import { Detail } from '../models/Detail.model.js';
import { ImagesColor } from '../models/ImagesColor.model.js';
import { Capacity } from '../models/Capacity.model.js';
import { Description } from '../models/Description.model.js';
import { NamespaceCapacity } from '../models/NamespaceCapacity.model.js';
import { Color } from '../models/Color.model.js';
import { Namespace } from '../models/Namespace.model.js';

class ProductService {
  private static instance: ProductService | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }

    return ProductService.instance;
  }

  async getDiscountProductsPerCategory(countPerCategory: number) {
    const categories = await Category.findAll({
      attributes: ['id'],
    });

    const productsPerCategoryPromises = categories.map(async (category) => {
      const products = await Product.findAll({
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['title']
          }
        ],
        attributes: { exclude: ['createdAt', 'year', 'categoryId', 'colorId'] },
        where: { categoryId: category.id },
        limit: countPerCategory,
        order: [
          [
            Sequelize.literal('100 * ("fullPrice" - "price") / "fullPrice"'),
            'DESC'
          ],
        ],
      });

      return products;
    });

    const productsPerCategory = await Promise.all(productsPerCategoryPromises);

    const products = productsPerCategory.flat();

    return products;
  }

  async getNewProducts(count: number) {
    const newProducts = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['title']
        }
      ],
      attributes: { exclude: ['createdAt', 'year', 'categoryId', 'colorId'] },
      order: [['year', 'DESC']],
      limit: count,
    });

    return newProducts;
  }

  async getCountProducts(category: string) {
    const currentCategory = await Category.findOne({
      where: { title: category },
    });

    return Product.count({
      where: { categoryId: currentCategory?.id },
    });
  }

  async getRecommended(
    price: number,
    fullPrice: number,
    category: string,
    priceLimit: number,
    limit: number,
  ) {
    const currentCategory = await Category.findOne({
      where: { title: category }
    });

    const categoryId = currentCategory?.dataValues.id;

    const byPricePromise = Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['title']
        }
      ],
      attributes: { exclude: ['createdAt', 'year', 'categoryId', 'colorId'] },
      where: {
        price: {
          [Op.between]: [price - priceLimit, price + priceLimit]
        }
      },
      order: Sequelize.literal('RANDOM()'),
      limit,
    });

    const byFullPricePromise = Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['title']
        }
      ],
      attributes: { exclude: ['createdAt', 'year', 'categoryId', 'colorId'] },
      where: {
        price: {
          [Op.between]: [fullPrice - priceLimit, fullPrice + priceLimit]
        }
      },
      order: Sequelize.literal('RANDOM()'),
      limit,
    });

    const byCategoryPromise = Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['title']
        }
      ],
      attributes: { exclude: ['createdAt', 'year', 'categoryId', 'colorId'] },
      where: {
        categoryId
      },
      order: Sequelize.literal('RANDOM()'),
      limit,
    });

    const [
      recommendedByPrice,
      recommendedByFullPrice,
      recommendedByCategory
    ] = await Promise.all([
      byPricePromise,
      byFullPricePromise,
      byCategoryPromise
    ]);

    return { recommendedByPrice, recommendedByFullPrice, recommendedByCategory };
  }

  async getBySearch(query: string, count: number) {
    const keywords = query.split(' ').map(keyword => keyword.toLowerCase());

    const nameConditions = keywords.map(keyword => ({
      name: {
        [Op.iLike]: `%${keyword}%`
      }
    }));

    return Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['title']
        },
      ],
      attributes: { exclude: ['createdAt', 'year', 'categoryId', 'colorId'] },
      where: {
        [Op.or]: [
          {
            [Op.and]: nameConditions
          },
          Sequelize.json({ name: { [Op.iLike]: `%${query}%` } })
        ]
      },
      order: [['name', 'ASC']],
      limit: count,
    });
  }

  async getProductsByCategory(
    offset: number,
    limit: number,
    sortBy: string | undefined,
    category: string,
  ) {
    const currentCategory = await Category.findOne({
      where: { title: category },
    });

    const sortingOrder = generateSortingOrder(sortBy);

    const products = await Product.findAndCountAll({
      offset,
      limit,
      where: { categoryId: currentCategory?.id },
      order: sortingOrder,
      attributes: {
        exclude: ['createdAt', 'year', 'categoryId', 'colorId',]
      },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['title']
        }
      ],
    });

    return products;
  }

  async getByDeviceId(deviceId: string) {
    const product = await Product.findOne({
      where: { detailId: deviceId },
      include: [
        {
          model: Detail,
          as: 'detail',
          attributes: { exclude: ['createdAt', 'id'] },
          include: [
            {
              model: Namespace,
              as: 'namespace',
              attributes: ['title']
            }
          ]
        },
        {
          model: Color,
          as: 'color',
          attributes: ['title']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['title']
        }
      ],
      attributes: { exclude: ['createdAt', 'year', 'categoryId'] },
    });

    if (!product) {
      return;
    }

    const { colorId, detail } = product?.dataValues || {};
    const { namespaceId } = detail.dataValues;

    const imagesColorPromise = ImagesColor.findAll({
      where: { namespaceId, colorId },
      attributes: ['imagePath']
    });

    const colorsPromise = ImagesColor.findAll({
      attributes: ['colorId'],
      include: [
        {
          model: Color,
          as: 'color',
          attributes: ['title']
        }
      ],
      where: { namespaceId },
      group: ['colorId', 'color.id']
    });

    const capacitiesPromise = Capacity.findAll({
      include: [
        {
          model: NamespaceCapacity,
          as: 'namespaceCapacities',
          where: { namespaceId },
          attributes: []
        },
      ],
      attributes: ['capacity'],
    });

    const descriptionsPromise = Description.findAll({
      where: { namespaceId },
      attributes: ['title', 'text']
    });

    const [
      imagesColor,
      colors,
      capacities,
      descriptions
    ] = await Promise.all([
      imagesColorPromise,
      colorsPromise,
      capacitiesPromise,
      descriptionsPromise
    ]);

    return { product, imagesColor, capacities, descriptions, colors };
  }
}

export const productService = ProductService.getInstance();
