import { Inject, Injectable } from "@nestjs/common";
import { Dynamic_Service } from "src/dynamic_module/dynamic.service";
import { PostDto } from "./post.dto";

@Injectable()
export class PostService{
    constructor(@Inject('STORE_SERVICEpost.json') private dynamicService: Dynamic_Service){}
    createPost(post: PostDto): PostDto{
        post.id = 1
        post.createdAt = new Date()
        post.updatedAt = new Date()
        this.dynamicService.save(post)
        return PostDto.plainToInstance(post);
    }
}