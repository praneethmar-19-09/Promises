import type { ErrorRequestHandler } from "express";
import {
    NotFoundError
} from "../services/user.service";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof NotFoundError) {
        res.status(404).json({ message: err.message });
        return;
    }

    console.error("Unhandled application error", err);

    res.status(500).json({ message: "Internal Server Error" });
};