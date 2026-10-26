import { Order } from "../types/user";
import { getUserById, NotFoundError } from "./user.service";

const orders: Order[] = [
  { id: 101, userId: 1, item: "Laptop", price: 50000 },
  { id: 102, userId: 1, item: "Mouse", price: 1000 },
  { id: 103, userId: 2, item: "Keyboard", price: 2000 },
];



export async function getOrdersByUserId(userId: number): Promise<Order[]> {
    await getUserById(userId); // Ensure the user exists
    const userOrders = orders.filter(o => o.userId === userId);
    if (userOrders.length === 0) {
        throw new NotFoundError(`Orders for user with id ${userId} not found`);
    }
    return userOrders;
}


export async function getAllOrders(): Promise<Order[]> {
    return orders;
}