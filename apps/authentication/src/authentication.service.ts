import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthenticationService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    @Inject('RIDER_SERVICE') private riderService: ClientProxy,
  ) {}
  async register(userDTO: Prisma.UserCreateInput) {
    try {
      console.log('called authenticaton service register', userDTO);
      const hashedPassword = await bcrypt.hash(userDTO.password, 10);
      const user = await this.prisma.user.create({
        data: { email: userDTO.email, password: hashedPassword },
      });

      const rider = await firstValueFrom(
        this.riderService.send(
          { cmd: 'create-rider' },
          { userId: user.id, ...userDTO },
        ),
      );
      console.log('rider', rider);
      return { email: user.email };
    } catch (error) {
      console.error('Error while registering user', error);
      throw new RpcException(error);
    }
  }
  async login(userDTO: Prisma.UserCreateInput) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: userDTO.email },
      });

      console.log(user, 'user');
      if (!user || !(await bcrypt.compare(userDTO.password, user.password))) {
        throw new RpcException('Invalid credentials');
      }

      const token = this.jwtService.sign({
        userId: user.id,
        email: user.email,
      });
      return { access_token: token };
    } catch (error) {
      console.log(error, 'error');
      throw new RpcException({
        message: 'Invalid credentials',
        statusCode: 403,
      });
    }
  }
  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      console.log(err, 'err');
      if (err instanceof RpcException) {
        throw err;
      }

      throw new RpcException({
        message: 'Invalid token',
        statusCode: 401,
      });
    }
  }
}
