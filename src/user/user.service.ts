import { Injectable } from "@nestjs/common";
import User from "./user.type";

@Injectable()
export class UserService {
    private readonly users: User[] = [
        {
            createdAt: new Date(),
            name: "Yaroslav Zotov",
            id: 1,
        }
    ];

    findAll(): User[] {
        return this.users;
    }
}
