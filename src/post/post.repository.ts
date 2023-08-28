import { Injectable } from "@nestjs/common";
import { PostDTO } from "./PostDTO";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class PostRepository{
    constructor(private readonly prisma: PrismaService) {}

    async postPost(data: PostDTO){
        await this.prisma.post.create({
            data
        })
    }

    async getAllPosts(){
        return await this.prisma.post.findMany()
    }

    async getPostById(id: number){
        return await this.prisma.post.findUnique({
            where: {
                id
            }
        })
    }

    async updatePost(id: number, title: string, text: string, image :string){

        if(image.length){
            return await this.prisma.post.update({
                where:{
                    id
                },
                data: {
                    title,
                    text,
                    image
                }
            })
        }
        else{
            return await this.prisma.post.update({
                where:{
                    id
                },
                data: {
                    title,
                    text
                }
            })
        }
    }

    async deletePost(id: number){
        return await this.prisma.post.delete({
            where:{
                id
            }
        })
    }
}
