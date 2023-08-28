import { PostModule } from "src/post/post.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { INestApplication } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { TestingModule, Test } from "@nestjs/testing";
import { PublicationRepository } from "src/publication/publication.repository";
import * as request from 'supertest';
import { PublicationService } from "src/publication/publication.service";
import { PostFactory } from "src/post/post.factory";
import { MediaFactory } from "src/media/media.factory";
import { PublicationFactory } from "src/publication/publication.factory";

describe('PublicationController', () => {
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



  it('GET /publications', async () => {
    //setup
    new PostFactory(prisma).build()

    new MediaFactory(prisma).build()

    new PublicationFactory(prisma).build()

    let response = await request(app.getHttpServer()).get('/publications');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it("POST /publications", async () => {

    //setup
    new PostFactory(prisma).build()

    new MediaFactory(prisma).build()


    await request(app.getHttpServer())
      .post("/publications")
      .send({
        mediaId: 1,
        postId: 1
      })
      .expect(201)

  });

  it("POST /publications with no associated media", async () => {

    //setup
    new PostFactory(prisma).build()

    await request(app.getHttpServer())
      .post("/publications")
      .send({
        mediaId: 1,
        postId: 1
      })
      .expect(404)

  });


  it("POST /publications with no associated post", async () => {

    //setup
    new MediaFactory(prisma).build()

    await request(app.getHttpServer())
      .post("/publications")
      .send({
        mediaId: 1,
        postId: 1
      })
      .expect(404)

  });
  

  it('GET /publications/:id with correct id ', async () => {
    //setup
    new PostFactory(prisma).build()

    new MediaFactory(prisma).build()

    new PublicationFactory(prisma).build()

    let response = await request(app.getHttpServer()).get('/publications/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('GET /publications/:id with incorrect id ', async () => {
    //setup
    new PostFactory(prisma).build()

    new MediaFactory(prisma).build()

    new PublicationFactory(prisma).build()

    let response = await request(app.getHttpServer()).get('/publications/0');
    expect(response.statusCode).toBe(404);
  });

  it('PUT /medias/:id with incorrect id ', async () => {
    //setup

    await prisma.media.create({
      data:{
        id: 2,
        title: "Title",
        username: "Username"
      }
    })

    new PostFactory(prisma).build()

    new MediaFactory(prisma).build()

    new PublicationFactory(prisma).build()

    await request(app.getHttpServer())
    .put("/publications/0")
    .send({
      mediaId: 2,
      postId: 1
    })
    .expect(404)

    
  });

  it('PUT /publications/:id with correct id ', async () => {
    //setup

    new PostFactory(prisma).build()

    new MediaFactory(prisma).build()

    new PublicationFactory(prisma).build()

    await prisma.media.create({
      data:{
        id: 2,
        title: "Title",
        username: "Username"
      }
    })

    await request(app.getHttpServer())
    .put("/publications/1")
    .send({
      mediaId: 2,
      postId: 1
    })
    .expect(200)
  });

  it('DELETE /posts/:id with incorrect id ', async () => {
    //setup
    new PostFactory(prisma).build()

    new MediaFactory(prisma).build()

    new PublicationFactory(prisma).build()


    await request(app.getHttpServer())
    .delete("/publications/0")
    .expect(404)
  });

  it('DELETE /posts/:id with correct id and no publication ', async () => {
    //setup
    new PostFactory(prisma).build()

    new MediaFactory(prisma).build()

    new PublicationFactory(prisma).build()

    await prisma.publication.create({
      data:{
        mediaId: 1,
        postId: 1
      }
    })


    await request(app.getHttpServer())
    .delete("/publications/1")
    .expect(200)
  });





});