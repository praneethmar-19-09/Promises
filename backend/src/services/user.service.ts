import { User } from "../types/user";

const users: User[] = [
  { id: 1, name: "Rahul", email: "rahul@example.com" },
  { id: 2, name: "Priya", email: "priya@example.com" },
];


export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export async function getUserById(id: number): Promise<User> {
    const user = users.find(u => u.id === id);
    if (!user) {
        throw new NotFoundError(`User with id ${id} not found`);
    }
    return user;
}

export async function getAllUsers(): Promise<User[]> {
    return users;
}