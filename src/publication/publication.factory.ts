import { PrismaService } from "src/prisma/prisma.service";

export class PublicationFactory{
    private mediaId: number;
    private postId: number;
    private prisma: PrismaService;
    
    constructor(prisma: PrismaService){
        this.prisma = prisma;
        this.mediaId = 1;
        this.postId = 1;
    }

    async build(){
        return this.prisma.publication.create({
            data:{
                mediaId: this.mediaId,
                postId: this.postId
            }
        })
    }
}