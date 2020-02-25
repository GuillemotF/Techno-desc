import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const mockRepository = {
      findById() {
        return {
          username: 'mockedUsername',
          password: 'mockedPassword',

          // exec: () => {
          //   return {
          //     username: 'mockedUsername',
          //     password: 'mockedPassword',
          //   };
          // },
        };
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken('User'), useValue: mockRepository },
      ],
    }).compile();
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });
  describe('findOne', () => {
    it('should return user object', async () => {
      const expectedResult = {
        username: 'mockedUsername',
        password: 'mockedPassword',
      };

      const receivedResult = await usersService.findOne('testUsername');
      expect(receivedResult).toStrictEqual(expectedResult);
    });
  });
});
