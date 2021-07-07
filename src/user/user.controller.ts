import { Body, Controller, Post, Get, Param, HttpStatus, NotFoundException } from "@nestjs/common";
import { throws } from "assert";
import { NestResponse } from "../core/http/nest-response";
import { NestResponseBuilder } from "../core/http/nest-response-builder";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Get(':userName')
    public getByUserName(@Param('userName') userName: string) {
        const foundUser = this.userService.getByUserName(userName);

        if (!foundUser) {
            throw new NotFoundException({
                status: 404,
                message: 'User not found'
            })
        }
        return foundUser;
    }

    @Post()
    public create(@Body() user: User): NestResponse {
        const createdUser = this.userService.create(user);

        return new NestResponseBuilder()
            .withStatus(HttpStatus.CREATED)
            .withHeaders({
                'Location': `/users/${createdUser.userName}`
            })
            .withBody(createdUser)
            .build();
    }
}