// 'use strict';

// import { Order } from '../models/Order.model';
// import { OrderProducts } from '../models/OrderProducts.model';
// import { Product } from '../models/Product.model';

// interface ProductWithInfo {
//   product: Product;
//   quantity: number;
// }

// class OrderService {
//   private static instance: OrderService | null = null;

//   // eslint-disable-next-line no-empty-function
//   private constructor() {}

//   static getInstance() {
//     if (!OrderService.instance) {
//       OrderService.instance = new OrderService();
//     }

//     return OrderService.instance;
//   }

//   async createOrder(userId: number, products: ProductWithInfo) {
//     const transaction = await Order.sequelize?.transaction();

//     try {
//       const order = await Order.create(
//         { userId },
//         { transaction }
//       );

//       for (const product of products) {
//         await OrderProducts.create(
//           {
//             orderId: order.id,
//             productId: product.id,
//             quantity: quantity,
//           },
//           { transaction }
//         );
//       }

//       await transaction?.commit();
//     } catch (error) {
//       await transaction?.rollback();
//       throw error;
//     }
//   }
// }

// export const orderService = OrderService.getInstance();
