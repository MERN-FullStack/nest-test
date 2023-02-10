import { UserDto } from "src/user.dto";
import { UserRepository } from "./user.repository";

export class UserService{
    constructor(userRepository: UserRepository){
        
    }
    createUser(user: any):any{
        user.id = 1
        user.createdAt = new Date()
        user.updatedAt = new Date()
        // const userReal = plainToClass(UserDto, user, {
        //     excludeExtraneousValues: true    
        // })
        // console.log(userReal)
        return UserDto.plainToInstance(user);
    }
}