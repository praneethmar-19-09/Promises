import { Request, Response, NextFunction } from "express";
import { getUserById, getAllUsers, NotFoundError } from "../services/user.service";
import { getOrdersByUserId } from "../services/order.service";

export async function listUsers(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

export async function getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userId = Number(req.params.id);
        const user = await getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
        } else {
            next(error);
        }
    }
}

export async function getUserOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userId = Number(req.params.id);
        const orders = await getOrdersByUserId(userId);
        console.log(`Fetched orders for user ${userId}`);
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
}