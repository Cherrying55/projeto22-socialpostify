import { Injectable } from "@nestjs/common";
import { PostMediaDTO } from "./PostMediaDTO";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class MediaRepository{
    constructor(private readonly prisma: PrismaService) {}

    async postMedia(data: PostMediaDTO){
        await this.prisma.media.create({
            data
        })
    }

    async getAllMedias(){
        return await this.prisma.media.findMany()
    }

    async getMediaById(id: number){
        return await this.prisma.media.findUnique({
            where: {
                id
            }
        })
    }

    async updateMedia(id: number, title: string, username: string){
        return await this.prisma.media.update({
            where:{
                id
            },
            data: {
                title,
                username
            }
        })
    }

    async deleteMedia(id: number){
        return await this.prisma.media.delete({
            where:{
                id
            }
        })
    }
}

/*
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../../dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from '../user.repository';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async addUser(data: CreateUserDTO) {
    await this.prisma.user.create({ data: data });
  }

  async findAllUsers() {
    return await this.prisma.user.findMany({});
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id: number) {
    return await this.prisma.user.findFirst({ where: { id } });
  }
}
*/