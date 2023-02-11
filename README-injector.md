## The way old when we join any class in the module
###### user.controller
```
export class UserController{
    userService : UserService
    constructor(){
        const userRepository = new UserRepository();
        this.userService = new UserService(userRepository);
    }
    @Post()
    createUser(@Body() user: UserDto): UserDto{
        return this.userService.createUser(user)
    }
}
```
###### user.service
```
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
```







## The new way when we join any class in the module
### The deep side
// the Map is a built-in object type in JavaScript, which is used to store key-value pairs.
// this.configuration = new Map<string, string>();
// this.configuration.set('apiKey', 'abc123');
// The class Injector will establish an container, which is used to store all service's imported
// We just have get, not set
```
class Injector{
    private _container = new Map();
    constructor(private _provider: any[] = []){
        this._provider.forEach(service =>{
            this._container.set(service, new service())
        })
    }

    get(serviceKey: any){
        const serviceInstance = this._container.get(serviceKey)
        if(!serviceKey){
            throw Error("Provider not found")
        }
        return serviceInstance;
    }
}

class UserService{
    hello(): void{
        console.log('12')
    }
}
class UserRepository{
    test(): void{
        console.log('test')
    }
}
const injector = new Injector([UserService, UserRepository])
const userService = injector.get(UserService)
userService.hello();

const userRepository = injector.get(UserRepository)
userRepository.test();
```

### The shallow side (The side that we have always use it)
```
@Module({
    controllers: [UserController],
    providers: [UserService]    
})
```
#### We have 2 way to use UserService in UserController

1. moduleRef
###### user.controller
```
export class UserController{
    constructor(private readonly moduleRef: ModuleRef){}

    @Post()
    createUser(@Body() user: UserDto): UserDto{
        const userService = this.moduleRef.get(UserService)
        return userService.createUser(user)
    }
```
2. Readonly Service
###### user.controller
```
export class UserController{
    constructor(private readonly userService: UserService){}
    @Post()
    createUser(@Body() user: UserDto): UserDto{
        return this.userService.createUser(user)
    }
```

3. Config Provider in Module
###### user.module
```
@Module({
    controllers: [UserController],
    providers: [{
        provide: 'UserService_MINH',
        useClass: UserService
    }]    
})
```
* Module Ref
###### user.controller
```
export class UserController{
    constructor(private readonly moduleRef: ModuleRef){}

    @Post()
    createUser(@Body() user: UserDto): UserDto{
        return this.moduleRef.get('UserService_MINH').createUser(user)
    }
```
* @Inject
###### user.controller
```
export class UserController{
    constructor(@Inject('UserService_MINH') private readonly userService: UserService){}

    @Post()
    createUser(@Body() user: UserDto): UserDto{
        return this.userService.createUser(user)
    }
```