import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
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
import { User } from './entities/user.entity';
import { AllowAny } from 'src/custom-decorators/allow-any.decorator';
import * as bcrypt from 'bcrypt';

@Crud({
  dto: {
    create: CreateUserDto,
    update: UpdateUserDto,
  },
  model: {
    type: User,
  },
})
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  @Override()
  @AllowAny()
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
