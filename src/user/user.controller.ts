import {
  Controller,
  HttpException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { AllowAny } from '../custom-decorators/allow-any.decorator';
import { ZipCodeInterceptor } from '../interceptors/zipCode.interceptor';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListUserDto } from './dto/list-user.dto';

@Crud({
  dto: {
    create: CreateUserDto,
    update: UpdateUserDto,
  },
  model: {
    type: User,
  },
  query: {
    join: {
      address: {
        eager: true,
      },
    },
  },
})
// @UseInterceptors(CacheInterceptor)
@ApiTags('user')
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  @Override()
  @AllowAny()
  @UseInterceptors(ZipCodeInterceptor)
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: ListUserDto })
  @ApiResponse({ status: 401, description: 'Not authorized.' })
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() user: CreateUserDto,
  ): Promise<User | any> {
    if (user.password) {
      let hashed = await bcrypt.hash(user.password, 10);
      user.password = hashed;
      return this.service.createOne(req, user);
    } else {
      throw new HttpException(
        'Senha e corfimação de senha não combinam!',
        HttpStatus.CONFLICT,
      );
    }
  }
}
