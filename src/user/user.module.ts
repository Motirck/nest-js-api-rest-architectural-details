import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { IsUniqueUserNameConstraint } from "./is-unique-username.validator";

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        IsUniqueUserNameConstraint
    ],
})
export class UserModule { }