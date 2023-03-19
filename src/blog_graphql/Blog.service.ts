import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BlogDocument, BlogEntity } from "./schemas/Blog.schema";

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogEntity.name)
    public blogModel: Model<BlogDocument>,
  ){}

  async getBlogs(): Promise<BlogDocument[]>{
    return this.blogModel.find({})
  }

  async getBlogById(_id: string): Promise<BlogDocument>{
    return this.blogModel.findById({_id})
  }

  async getBlogBySlug(slug: string): Promise<BlogDocument>{
    return this.blogModel.findOne({slug})
  }

  async createBlog(blogInput: Partial<BlogEntity>): Promise<BlogDocument>{
    const newBlog = new BlogEntity(blogInput)
    const result = await this.blogModel.create({
        createdAt: Date.now(),
        ...newBlog
    })
    return result 
  }
  
  async updateBlog(_id: string, updateInput:  Partial<BlogEntity>): Promise<BlogDocument>{
    const updatedBlog =  await this.blogModel.findByIdAndUpdate(
        { _id },
        {
          $set: {
            ...updateInput,
            updatedAt: Date.now()
          }
        },
        { new: true}
    )
    return updatedBlog
  }

  async deleteBlog(_id: string) : Promise<BlogDocument>{
    const deleteBlog = this.blogModel.findByIdAndDelete(_id)
    return deleteBlog
  }
}