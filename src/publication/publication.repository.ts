import { Injectable } from "@nestjs/common";
import { PublicationDTO } from "./PublicationDTO";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class PublicationRepository{
    constructor(private readonly prisma: PrismaService) {}

    async postPublication(data: PublicationDTO){
        await this.prisma.publication.create({
            data
        })
    }

    async getAllPublications(){
        return await this.prisma.publication.findMany()
    }

    async getPublicationById(id: number){
        return await this.prisma.publication.findUnique({
            where: {
                id
            }
        })
    }

    async updatePublication(id: number, postId: number, mediaId: number, date: Date){
        return await this.prisma.publication.update({
            where:{
                id
            },
            data: {
                postId,
                mediaId,
                date
            }
        })
    }

    async deletePublication(id: number){
        return await this.prisma.publication.delete({
            where:{
                id
            }
        })
    }

    async getByMediaId(mediaId: number){
        return await this.prisma.publication.findFirst({
            where:{
                mediaId
            }
        })
    }

    async getByPostId(postId: number){
        return await this.prisma.publication.findFirst({
            where:{
                postId
            }
        })
    }
}
