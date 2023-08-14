// 'use strict';

// import { orderService } from '../services/order.service';
// import { Controller } from '../types';

// class OrderController {
//   private static instance: OrderController | null = null;

//   // eslint-disable-next-line no-empty-function
//   private constructor() {}

//   static getInstance() {
//     if (!OrderController.instance) {
//       OrderController.instance = new OrderController();
//     }

//     return OrderController.instance;
//   }

//   checkout: Controller = async (req, res) => {
//     try {
//       const { userId, products } = req.body;

//       const order = await orderService.createOrder(userId, products);

//       return res.status(201).json({ message: 'Order created successfully', order });
//     } catch (error) {
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   };
// }

// export const orderController = OrderController.getInstance();
