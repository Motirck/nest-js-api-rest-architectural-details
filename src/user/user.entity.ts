import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsUniqueUserName } from "./is-unique-username.validator";

export class User {
    id: number;

    @IsUniqueUserName({
        message: 'Username must be unique'
    })
    @IsNotEmpty({
        message: 'Username is required.'
    })
    @IsString({
        message: 'Username must be a string.'
    })
    userName: string;

    @IsEmail({},{
        message: 'Email must be a valid email address.'
    })
    email: string;

    @IsNotEmpty({
        message: 'Password is required.'
    })
    password: string;

    @IsNotEmpty({
        message: 'Full name is required.'
    })
    fullName: string;

    createdAt: Date;
}