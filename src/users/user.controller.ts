import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserDto } from "src/user.dto";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
@Controller('users')
export class UserController{
    userService : UserService
    constructor(){
        const userRepository = new UserRepository();
        this.userService = new UserService(userRepository);
    }
    @Get()
    getAllUsers(){
        return[
            {
                name: 'minh',
                age: 12 
            },
            {
                name: 'abc',
                age: 18
            }
        ]
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number){   
        console.log(id)
        return 'test'
    }

    // ! add npm i class-transfomer class-validator to validationPipe
    // https://github.com/typestack/class-validator
    // @UsePipes(new ValidationPipe())
    @Post()
    createUser(@Body() user: UserDto): UserDto{
        return this.userService.createUser(user)
    }
}