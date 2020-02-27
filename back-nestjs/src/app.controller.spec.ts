import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';

describe('AppController', () => {
  let appController: AppController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AuthService, useValue: { login: jest.fn() } }],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    authService = moduleRef.get<AuthService>(AuthService);
  });
  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('login', () => {
    it('should return token and refresh-token', async () => {
      const expectedResult = {
        token: 'mockedToken',
        refreshToken: 'mockedRefreshToken',
      };
      jest.spyOn(authService, 'login').mockResolvedValue(expectedResult);

      const receivedResult = await appController.login({
        user: { email: 'testEmail', password: 'testPassword' },
      });
      expect(receivedResult).toBe(expectedResult);
    });
  });
  describe('refreshToken', () => {
    it('should return token and refresh-token', async () => {
      const expectedResult = {
        token: 'mockedToken',
        refreshToken: 'mockedRefreshToken',
      };
      jest.spyOn(authService, 'login').mockResolvedValue(expectedResult);

      const receivedResult = await appController.refreshToken({
        user: { email: 'testEmail', password: 'testPassword' },
      });
      expect(receivedResult).toBe(expectedResult);
    });
  });
});
