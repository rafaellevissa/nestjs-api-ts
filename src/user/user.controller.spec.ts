import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { CrudRequest } from '@nestjsx/crud';
import { AddressService } from '../services/address.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CrudRequestMock } from '../utils/mock/CrudRequest';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [UserController],
      providers: [
        AddressService,
        {
          provide: UserService,
          useValue: {
            createOne: jest
              .fn()
              .mockImplementation((req: CrudRequest, user: CreateUserDto) =>
                Promise.resolve({ id: 1, ...user }),
              ),
            updateOne: jest
              .fn()
              .mockImplementation((req: CrudRequest, user: UpdateUserDto) =>
                Promise.resolve(user),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const user: CreateUserDto = {
      cpf: '70647118009',
      email: 'user@email.com',
      name: 'user',
      password: '12345',
      phone: '719999999',
      zip_code: '01001000',
    };

    await expect(
      controller.createOne(CrudRequestMock, user),
    ).resolves.toMatchObject({
      id: 1,
      email: 'user@email.com',
      zip_code: '01001000',
    });
  });
});
