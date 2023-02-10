import { Expose, plainToClass } from "class-transformer";

export abstract class BaseDto{
    @Expose()
    id: Number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt:Date;

    static plainToInstance<T>(this: new (...args: any[])=> T, obj: T):T{
        return plainToClass(this, obj, {excludeExtraneousValues: true})
    }

    // const userReal = plainToClass(UserDto, user, {excludeExtraneousValues: true})
    //excludeExtraneousValues loại bỏ những field ko expose bên Dto
}