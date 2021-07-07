import { Get, Param } from "@nestjs/common";
import { Body, Controller, Post } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Get(':userName')
    public getByUserName(@Param('userName') userName: string) {
        const foundUser = this.userService.getByUserName(userName);
        return foundUser;
    }

    @Post()
    public create(@Body() user: User): User {
        const createdUser = this.userService.create(user);
        return createdUser;
    }
}