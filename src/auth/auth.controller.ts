import { AuthService } from './shared/auth.service';
import { Controller, UseGuards, Post, Request, Query } from '@nestjs/common';
import { LocalAuthGuard } from './shared/local-auth.guard';
import { AllowAny } from '../custom-decorators/allow-any.decorator';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginRequestDto } from './dto/login-request.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @AllowAny()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginRequestDto })
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiResponse({ status: 401, description: 'Not authorized.' })
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  @AllowAny()
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiBadRequestResponse()
  async refreshToken(@Query('token') token: string) {
    const tokenToRefresh = token;
    return this.authService.refresh(tokenToRefresh);
  }
}
