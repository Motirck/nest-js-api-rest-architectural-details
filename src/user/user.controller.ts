import { Body, Controller, Post } from "@nestjs/common";

@Controller('users')
export class UserController {

    private users = [];

    @Post()
    public create(@Body() user) {
        this.users.push(user);

        return user;
    }
}