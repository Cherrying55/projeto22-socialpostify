import { PrismaService } from "src/prisma/prisma.service";
import faker from '@faker-js/faker';

export class MediaFactory{
    private title: string;
    private username: string;
    private id: number;
    private prisma: PrismaService;
    
    constructor(prisma: PrismaService){
        this.prisma = prisma;
        this.title = "Title"
        this.username = "User"
        this.id = 1;

    }

    async build(){
        return this.prisma.media.create({
            data:{
                id: this.id,
                title: this.title,
                username: this.username
            }
        })
    }
}