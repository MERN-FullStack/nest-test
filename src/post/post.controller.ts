import { Body, Controller, Get, Post } from "@nestjs/common";
import { get } from "http";
import { PostDto } from "./post.dto";
import { PostService } from "./post.service";

@Controller('posts')
export class PostController{
    constructor(private readonly postService: PostService){}
    @Get()
    getAllPosts(){
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

    @Post()
    createPost(@Body() post: PostDto): PostDto{
        return this.postService.createPost(post)
    }
    
}