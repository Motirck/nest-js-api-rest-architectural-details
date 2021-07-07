import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "./user.service";

@Injectable()
@ValidatorConstraint()
export class IsUniqueUserNameConstraint implements ValidatorConstraintInterface {

    constructor(private userService: UserService) { }

    validate(userName: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        return !this.userService.getByUserName(userName);
    }
}

export function IsUniqueUserName(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUniqueUserNameConstraint,
        });
    };
}