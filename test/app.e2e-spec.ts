// tests do not use absolute path it uses realtive path, to solve this issue chnages were made in jest-e2e.json
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('App e2e', () => {
  let app: INestApplication;
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
  });

  afterAll(() => {
    app.close();
  });
  it.todo('should pass');
});
