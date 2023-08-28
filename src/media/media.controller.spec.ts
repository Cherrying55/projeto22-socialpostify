import { PostModule } from "src/post/post.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { INestApplication } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { TestingModule, Test } from "@nestjs/testing";
import { PublicationRepository } from "src/publication/publication.repository";
import * as request from 'supertest';
import { PublicationService } from "src/publication/publication.service";
import { PostFactory } from "src/post/post.factory";
import { MediaFactory } from "./media.factory";
import { PublicationFactory } from "src/publication/publication.factory";


describe('MediaController', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PostModule, PrismaModule, PublicationRepository, PublicationService, PostModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = await moduleFixture.resolve(PrismaService); //ou o get
    await prisma.post.deleteMany();
    await prisma.media.deleteMany();
    await prisma.publication.deleteMany();
    jest.clearAllMocks();
    await app.init();
  });



  it('GET /medias', async () => {
    //setup
    new MediaFactory(prisma).build()

    let response = await request(app.getHttpServer()).get('/medias');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it("POST /medias", async () => {
    await request(app.getHttpServer())
      .post("/medias")
      .send({
        title: "Title",
        username: "User"
      })
      .expect(201)


    //setup
    const tickets = await prisma.media.findMany();
    expect(tickets).toHaveLength(1);
    const ticket = tickets[0];
    expect(ticket).toEqual({
      id: expect.any(Number),
      title: "Title",
      username: "User"
    });

  });

  

  it('GET /medias/:id with correct id ', async () => {
    //setup
    new MediaFactory(prisma).build()

    let response = await request(app.getHttpServer()).get('/medias/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('GET /posts/:id with incorrect id ', async () => {
    //setup
    new MediaFactory(prisma).build()

    let response = await request(app.getHttpServer()).get('/medias/0');
    expect(response.statusCode).toBe(404);
  });

  it('PUT /medias/:id with incorrect id ', async () => {
    //setup
    new MediaFactory(prisma).build()

    await request(app.getHttpServer())
    .put("/medias/0")
    .send({
      title: "Title2",
        username: "User"
    })
    .expect(404)

    
  });

  it('PUT /posts/:id with correct id ', async () => {
    //setup
    new MediaFactory(prisma).build()

    await request(app.getHttpServer())
    .put("/medias/1")
    .send({
      title: "Title2",
        username: "User"
    })
    .expect(200)
  });

  it('DELETE /posts/:id with incorrect id ', async () => {
    //setup
    new MediaFactory(prisma).build()

    await request(app.getHttpServer())
    .delete("/medias/0")
    .expect(404)
  });

  it('DELETE /posts/:id with correct id and no publication ', async () => {
    //setup
    new MediaFactory(prisma).build()

    await request(app.getHttpServer())
    .delete("/medias/1")
    .expect(200)
  });

  it('DELETE /posts/:id with correct id and a publication ', async () => {
    //setup

    new PostFactory(prisma).build()

    new MediaFactory(prisma).build()

    new PublicationFactory(prisma).build()

    await request(app.getHttpServer())
    .delete("/medias/1")
    .expect(403)
  });






});