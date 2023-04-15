// tests do not use absolute path it uses realtive path, to solve this issue chnages were made in jest-e2e.json
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDTO } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import { CreateBookmarkDto } from 'src/bookmark/dto';
import { EditBookmarkDto } from 'src/bookmark/dto/editBookmark.dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const modelRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = modelRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);

    await prisma.cleanDB();
    pactum.request.setBaseUrl(`http://localhost:3333/`);
  });

  afterAll(() => {
    app.close();
  });

  describe(`Auth`, () => {
    const dto: AuthDTO = {
      email: 'email@gmail.com',
      password: 'qwbuqnjns',
    };
    describe(`SignUp`, () => {
      it('Should Signup', () => {
        return pactum
          .spec()
          .post('auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });

      it(`Should throw if body is empty`, () => {
        return pactum.spec().post(`auth/signup`).expectStatus(400);
      });

      it(`Should throw if email is empty`, () => {
        return pactum
          .spec()
          .post(`auth/signup`)
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it(`Should throw if password is empty`, () => {
        return pactum
          .spec()
          .post(`auth/signup`)
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it(`Should throw if email is badly format (wrong fromat)`, () => {
        return pactum
          .spec()
          .post(`auth/signup`)
          .withBody({
            email: 'hejbj@',
            password: dto.password,
          })
          .expectStatus(400);
      });
    });
    describe(`SignIn`, () => {
      it('Should Signin', () => {
        return pactum
          .spec()
          .post('auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .inspect()
          .stores('userToken', 'access_token');
      });

      it(`Should throw if body is empty`, () => {
        return pactum.spec().post(`auth/signin`).expectStatus(400);
      });

      it(`Should throw if email is empty`, () => {
        return pactum
          .spec()
          .post(`auth/signin`)
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it(`Should throw if password is empty`, () => {
        return pactum
          .spec()
          .post(`auth/signin`)
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it(`Should throw if email is badly format (wrong fromat)`, () => {
        return pactum
          .spec()
          .post(`auth/signin`)
          .withBody({
            email: 'hejbj@',
            password: dto.password,
          })
          .expectStatus(400);
      });
    });
  });

  describe(`User`, () => {
    describe(`Get me`, () => {
      it(`Should return current user details`, () => {
        return pactum
          .spec()
          .get(`users/me`)
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .expectStatus(200);
      });
    });
    describe(`Edit User`, () => {
      const dto: EditUserDto = {
        firstName: 'Garima',
        email: 'garima@gamil.com',
      };
      it(`Should Edit the user details`, () => {
        return pactum
          .spec()
          .patch(`users`)
          .withHeaders({
            Authorization: `Bearer $S{userToken}`,
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });

  describe(`Bookmarks`, () => {
    describe(`Get Empty Bookmarks`, () => {
      it('Get empty bookmark', () => {
        return pactum
          .spec()
          .get('bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe(`Create Bookmark`, () => {
      const dto: CreateBookmarkDto = {
        title: 'First Book mark',
        link: 'wkjnqknwjknqwjk',
      };

      it('Should Create Bookmark', () => {
        return pactum
          .spec()
          .post('bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('bookmarkId', 'id');
      });
    });

    describe(`Get Bookmarks`, () => {
      it('Get empty bookmark', () => {
        return pactum
          .spec()
          .get('bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe(`Get Bookmark by Id`, () => {
      it('Get a bookmark', () => {
        return pactum
          .spec()
          .get('bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{bookmarkId}');
      });
    });

    describe(`Edit Bookmark by Id`, () => {
      const dto: EditBookmarkDto = {
        title: 'Changed Title',
        description: 'qnwkn',
      };

      it('Should edit bookmark', () => {
        return pactum
          .spec()
          .patch('bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .expectStatus(200)
          .expectBodyContains(dto.title)
          .expectBodyContains(dto.description);
      });
    });

    describe(`Delete Bookmarks`, () => {
      it('Should delete bookmark', () => {
        return pactum
          .spec()
          .delete('bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .expectStatus(204);
      });

      it('Should get empty bookmark', () => {
        return pactum
          .spec()
          .get('bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userToken}',
          })
          .expectStatus(200)
          .expectJsonLength(0);
      });
    });
  });
});
