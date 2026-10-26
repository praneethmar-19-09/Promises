export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Order {
    id: number;
    userId: number;
    item: string;
    price: number;
}

export interface ApiError {
    message: string;
}