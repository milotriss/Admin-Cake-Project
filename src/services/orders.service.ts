import OrderRepository from "../repositories/order.repositories";
import { IOrder } from "../types/interface";

class OrderService {
  private orderRepository: OrderRepository;
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  public async getAllOrders(): Promise<IOrder[]> {
    const result = await this.orderRepository.getAllOrder();
    
    return result.data
  }
  public async revenue():Promise<number> {
    const orders:IOrder[] = await this.getAllOrders();
    const result = orders.reduce((init:number, order:IOrder) => init + order.totalPrice,0)
    return result
  }
}

export default OrderService;
