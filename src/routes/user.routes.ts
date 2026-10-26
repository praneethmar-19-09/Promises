import { Router } from "express";
import { z } from "zod";

import {
    listUsers,
    getUser,
    getUserOrders
} from "../controllers/user.controller";

const router = Router();

const idSchema = z.coerce.number().int().positive();

router.get("/users", listUsers);
router.get("/users/:id", (req, res, next) => {

    const parsed = idSchema.safeParse(req.params.id);

    if (!parsed.success) {
        res.status(400).json({ message: "Invalid ID. User ID must be a positive integer" });
        return;
    }
    next();
}, getUser);


router.get("/users/:id/orders", (req, res, next) => {

    const parsed = idSchema.safeParse(req.params.id);

    if (!parsed.success) {
        res.status(400).json({ message: "Invalid ID. User ID must be a positive integer" });
        return;
    }
    next();
}, getUserOrders);



export default router;