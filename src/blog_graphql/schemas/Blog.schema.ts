import { DATABASE_COLLECTION_NAME } from "src/constant";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
export type  BlogDocument =  BlogEntity & Document

@Schema({
    collection: DATABASE_COLLECTION_NAME.BLOG,
    toJSON: { virtuals: true, getters: true},
    toObject: { virtuals: true, getters: true}
})

export class BlogEntity {
    constructor(props: Partial<BlogEntity>){
        Object.assign(this, props)
    }

    @Prop()
    title: string
  
    @Prop()
    slug: string
}

export const BlogSchema = SchemaFactory.createForClass(BlogEntity)

// toObject được sử dụng để chuyển đổi Mongoose Document thành đối tượng JavaScript bình thường
// với các giá trị được tính toán từ các getters của schema và các ảnh hưởng của các middleware (pre and post) được thực thi.

// toJSON được sử dụng để chuyển đổi Mongoose Document thành đối tượng JSON
// với các giá trị được tính toán từ các getters của schema và các ảnh hưởng của các middleware (pre and post) được thực thi.

// Trong đoạn mã trên, toJson và toObject là các tùy chọn cho phương thức Schema của thư viện Mongoose trong Node.js để định nghĩa một kiểu dữ liệu cho MongoDB.
// Cả toJson và toObject được sử dụng để xác định cách các đối tượng được trả về từ cơ sở dữ liệu MongoDB được biểu diễn và chuyển đổi thành các đối tượng JSON hoặc JavaScript.
// => toJson được sử dụng để thiết lập tùy chọn cho phương thức toJSON của đối tượng mongoose. Khi được thiết lập thành {virtuals: true, getters: true}, nó cho phép đối tượng JSON được tạo ra từ đối tượng mongoose chứa các giá trị của các trường ảo và các trường lấy giá trị từ getter được định nghĩa trong schema.
// => toObject được sử dụng để thiết lập tùy chọn cho phương thức toObject của đối tượng mongoose. Khi được thiết lập thành {virtuals: true, getters: true}, nó cho phép đối tượng JavaScript được tạo ra từ đối tượng mongoose chứa các giá trị của các trường ảo và các trường lấy giá trị từ getter được định nghĩa trong schema.
// Việc thiết lập tùy chọn này cho phép các đối tượng trả về được chứa các giá trị đầy đủ từ schema, bao gồm cả các giá trị được tính toán hoặc thu thập từ các mối quan hệ trong cơ sở dữ liệu MongoDB.