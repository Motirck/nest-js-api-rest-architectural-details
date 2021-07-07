import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    private users: Array<User>  = [
        {
            id: 1,
            userName: "gabriel",
            email: 'gab@gab.com',
            password: "123456",
            fullName: 'Gabriel Rocha',
            createdAt: new Date()
        }
    ];

    public create(user: User): User {
        this.users.push(user);
        return user;
    }

    public getByUserName(userName: string): User {
        const foundUser = this.users.find(user => user.userName == userName);
        return foundUser;
    }
}