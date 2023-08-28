import { PrismaService } from "src/prisma/prisma.service";
import faker from '@faker-js/faker';

export class PostFactory{
    private title: string;
    private text: string;
    private image: string;
    private id: number;
    private prisma: PrismaService;
    
    constructor(prisma: PrismaService){
        this.prisma = prisma;
        this.title = "Title"
        this.text = "Text";
        this.image = "image";
        this.id = 1;

    }

    async build(){
        return this.prisma.post.create({
            data:{
                id: this.id,
                title: this.title,
                text: this.text,
                image: this.image
            }
        })
    }
}