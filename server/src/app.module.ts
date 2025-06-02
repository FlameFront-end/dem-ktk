import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './auth/entities/user.entity';
import { ApplicationModule } from './application/application.module';
import { ApplicationEntity } from './application/entities/application.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import * as argon2 from 'argon2';

const ENTITIES = [UserEntity, ApplicationEntity];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: ENTITIES,
        synchronize: true,
        ssl: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(ENTITIES),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ApplicationModule,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private dataSource: DataSource) {}

  async onApplicationBootstrap() {
    await this.seedAdmin();
  }

  private async seedAdmin() {
    const userRepository = this.dataSource.getRepository(UserEntity);

    const adminExists = await userRepository.findOne({
      where: { email: 'adminka' },
    });

    if (!adminExists) {
      const admin = userRepository.create({
        email: 'adminka',
        username: 'adminka',
        password: await argon2.hash('password'),
        fullName: 'Администратор',
        phone: '+70000000000',
        isAdmin: true,
      });

      await userRepository.save(admin);
      console.log('Администратор создан');
    } else {
      console.log('Администратор уже существует');
    }
  }
}
