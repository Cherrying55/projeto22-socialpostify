import { PostModule } from "./post.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { INestApplication } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { TestingModule, Test } from "@nestjs/testing";
import { PublicationRepository } from "src/publication/publication.repository";
import * as request from 'supertest';
import { PublicationService } from "src/publication/publication.service";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { PostFactory } from "./post.factory";
import { MediaFactory } from "src/media/media.factory";
import { PublicationFactory } from "src/publication/publication.factory";


describe('PostController', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PostModule, PrismaModule, PublicationRepository, PublicationService, PostService, PostController, PostModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = await moduleFixture.resolve(PrismaService); //ou o get
		await prisma.post.deleteMany();
    await prisma.media.deleteMany();
    await prisma.publication.deleteMany();
    jest.clearAllMocks();
    await app.init();
  });

  it('GET /posts', async () => {
    //setup
    new PostFactory(prisma).build()

    let response = await request(app.getHttpServer()).get('/posts');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });



  it("POST /posts with image", async () => {
    await request(app.getHttpServer())
      .post("/posts")
      .send({
        title: "Title",
        text: "Text",
        image: "Image"
      })
      .expect(201)


    //setup
    const tickets = await prisma.post.findMany();
    expect(tickets).toHaveLength(1);
    const ticket = tickets[0];
    expect(ticket).toEqual({
      id: expect.any(Number),
      title: "Title",
      text: "Text",
      image: "Image"
    });

  });

  it("POST /posts without image", async () => {
    await request(app.getHttpServer())
      .post("/posts")
      .send({
        title: "Title",
        text: "Text"
      })
      .expect(201)


    //setup
    const tickets = await prisma.post.findMany();
    expect(tickets).toHaveLength(1);
    const ticket = tickets[0];
    expect(ticket).toEqual({
      id: expect.any(Number),
      title: "Title",
      text: "Text"
    });

  });

  it('GET /posts/:id with correct id ', async () => {
    //setup
    new PostFactory(prisma).build()

    let response = await request(app.getHttpServer()).get('/posts/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('GET /posts/:id with incorrect id ', async () => {
    //setup
    new PostFactory(prisma).build()

    let response = await request(app.getHttpServer()).get('/posts/0');
    expect(response.statusCode).toBe(404);
  });

  it('PUT /posts/:id with incorrect id ', async () => {
    //setup
    new PostFactory(prisma).build()

    await request(app.getHttpServer())
    .put("/posts/0")
    .send({
      title: "Title2",
      text: "Text",
      image: "Image"
    })
    .expect(404)
  });

  it('PUT /posts/:id with correct id ', async () => {
    //setup
    new PostFactory(prisma).build()

    await request(app.getHttpServer())
    .put("/posts/1")
    .send({
      title: "Title2",
      text: "Text",
      image: "Image"
    })
    .expect(200)
  });

  it('DELETE /posts/:id with incorrect id ', async () => {
    //setup
    new PostFactory(prisma).build()

    await request(app.getHttpServer())
    .delete("/posts/1")
    .expect(404)
  });

  it('DELETE /posts/:id with correct id and no publication ', async () => {
    //setup
    new PostFactory(prisma).build()

    await request(app.getHttpServer())
    .delete("/posts/1")
    .expect(200)
  });

  it('DELETE /posts/:id with correct id and a publication ', async () => {
    //setup
    new PostFactory(prisma).build()

    new MediaFactory(prisma).build()

    new PublicationFactory(prisma).build()

    await request(app.getHttpServer())
    .delete("/posts/1")
    .expect(403)
  });






});