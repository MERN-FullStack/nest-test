import { Injectable } from "@nestjs/common";
import { StoreService } from "src/store/store.service";
import { PostDto } from "./post.dto";

@Injectable()
export class PostService{
    constructor(private storeService: StoreService){}
    createPost(post: PostDto): PostDto{
        post.id = 1
        post.createdAt = new Date()
        post.updatedAt = new Date()
        this.storeService.save(post)
        return PostDto.plainToInstance(post);
    }
}