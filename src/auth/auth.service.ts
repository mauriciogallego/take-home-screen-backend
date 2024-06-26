import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SalesService } from '../sales/sales.service';
import { JwtService } from '@nestjs/jwt';
import { IAccessToken } from '../interfaces/types';
import * as bcrypt from 'bcryptjs';
import { omit } from 'lodash';
import { Sale } from '@prisma/client';
import { PrismaService } from '@src/database/prisma.service';
import { errorCodes } from '@src/constants/errors';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    readonly prisma: PrismaService,
    private usersService: SalesService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      if (await bcrypt.compare(pass, user.password)) {
        const result = omit(user, 'password');
        return result;
      }
    }
    return null;
  }

  validateSecurityPassword(password: string) {
    const regEx =
      /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/;

    if (!regEx.test(password)) {
      throw new UnprocessableEntityException('WEAK_PASSWORD');
    }
  }

  async login(user?: Sale): Promise<IAccessToken> {
    if (!user) {
      throw new UnauthorizedException({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'AUTHORIZATION_REQUIRED',
      });
    }
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
    };
  }

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  throwIfUserIsNotValid(user: Omit<Sale, 'password'>) {
    if (user.active === false) {
      throw new ForbiddenException({
        statusCode: 403,
        message: errorCodes.USER_NOT_ACTIVE,
      });
    }
    return Promise.resolve(user);
  }

  async register(body: RegisterDto) {
    const exist = await this.usersService.findByEmail(body.email);

    if (exist) {
      throw new NotFoundException(errorCodes.EMAIL_ALREADY_TAKEN);
    }

    this.validateSecurityPassword(body.password);
    const password = this.hashPassword(body.password);

    return await this.usersService.create({
      password,
      email: body.email,
      name: body.name,
    });
  }
}
