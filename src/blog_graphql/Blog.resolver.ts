import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BlogService } from "./Blog.service";
import { BlogDocument, BlogEntity } from "./schemas/Blog.schema";

@Resolver('Blog')
export class BlogResolver{
   constructor( private readonly blogService: BlogService){}
   
   @Query()
   async getBlogs() {
    return await this.blogService.getBlogs()
   }

   @Query()
   async getBlogById(@Args('_id') _id: string){
    return await this.blogService.getBlogById(_id)
   }

   @Query()
   async getBlogBySlug(@Args('slug') slug: string){
    return await this.blogService.getBlogBySlug(slug)
   }

   @Mutation()
   async createBlog(@Args('input') input: Partial<BlogEntity>) : Promise<BlogDocument> {
    return await this.blogService.createBlog(input)
   }

   @Mutation()
   async updateBlog(
    @Args('_id') _id: string,
    @Args('input') input: Partial<BlogEntity>
   ): Promise<BlogDocument>{
    return await this.blogService.updateBlog(_id, input)
   }

   @Mutation()
   async deleteBlog(
    @Args('_id') _id: string
   ): Promise<BlogDocument>{
    return await this.blogService.deleteBlog(_id)
   }


}