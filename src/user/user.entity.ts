import { Exclude, Expose } from "class-transformer";
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

    @Expose({ // This will return the name emailAddress instead of email
        name: 'emailAddress'
    })
    @IsEmail({}, {
        message: 'Email must be a valid email address.'
    })
    email: string;

    @Exclude({
        toPlainOnly: true // It will delete the password attribute at serialization time
    })
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