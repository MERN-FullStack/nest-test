import { Expose, Transform } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { BaseDto } from "src/common/base.dto";

export class PostDto extends BaseDto{
    @IsNotEmpty()
    @Length(10,500)
    @Expose()
    title: string;

    description: string;

    content: string;
}