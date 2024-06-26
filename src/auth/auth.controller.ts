import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './entities/login.entity';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.decorator';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<Login> {
    return this.authService.login(req.user);
  }
}
