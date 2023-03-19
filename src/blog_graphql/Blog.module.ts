import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BlogResolver } from "./Blog.resolver";
import { BlogService } from "./Blog.service";
import { BlogEntity, BlogSchema } from "./schemas/Blog.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: BlogEntity.name, schema: BlogSchema}])],
    providers: [BlogService, BlogResolver],
    exports: [BlogService],
})
export class BlogModule{}