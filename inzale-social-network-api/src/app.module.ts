import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './application/services/auth.service';
import { AuthController } from './application/controllers/auth.controller';
import { AUTH_SERVICE_TOKEN } from './application/interfaces/services/IAuthService.interface';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './application/services/user.service';
import { USER_SERVICE_TOKEN } from './application/interfaces/services/IUserService.interface';
import { UserController } from './application/controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { User } from './domain/entities/user.entity';
import UserRepository from './infrastructure/database/repositories/user.repository';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { POST_SERVICE_TOKEN } from './application/interfaces/services/IPostService.interface';
import { PostService } from './application/services/post.service';
import PostRepository from './infrastructure/database/repositories/post.repository';
import { PostController } from './application/controllers/post.controller';
import { Post } from './domain/entities/post.entity';
import { JwtStrategy } from './application/utils/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '4h' },
    }),
    TypeOrmModule.forRoot({
      logging: true,
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE, 
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true
    }),
    TypeOrmModule.forFeature([User, Post])
  ],
  controllers: [AppController, AuthController, UserController, PostController],
  providers: [
    AppService,
    JwtStrategy,
    PostRepository,
    UserRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: POST_SERVICE_TOKEN,
      useClass: PostService,
    },
    {
      provide: AUTH_SERVICE_TOKEN, 
      useClass: AuthService,
    },
    {
      provide: USER_SERVICE_TOKEN,
      useClass: UserService,
    },
   
  ]
})
export class AppModule {}
