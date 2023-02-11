import { Injectable } from "@nestjs/common";
import { StoreService } from "src/store/store.service";
import { UserDto } from "src/users/user.dto";

@Injectable()
export class UserService{

    constructor(private storeService: StoreService){}

    createUser(user: UserDto):UserDto{
       
        user.id = 1
        user.createdAt = new Date()
        user.updatedAt = new Date()
        // const userReal = plainToClass(UserDto, user, {
        //     excludeExtraneousValues: true    
        // })
        // console.log(userReal)
        this.storeService.save(user)
        return UserDto.plainToInstance(user);
    }
}