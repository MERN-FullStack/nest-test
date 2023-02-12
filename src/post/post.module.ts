import { Module } from "@nestjs/common";
import { Dynamic_Module } from "src/dynamic_module/dynamic.module";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";

@Module({
    imports: [Dynamic_Module.forFeature({
        filename: 'post.json'
    })],
    controllers: [PostController],
    providers:[PostService]
})
export class PostModule{}