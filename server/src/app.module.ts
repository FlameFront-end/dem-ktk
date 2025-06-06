import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './auth/entities/user.entity';
import { ApplicationModule } from './application/application.module';
import { ApplicationEntity } from './application/entities/application.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    AuthModule,
    ApplicationModule,
  ],
})
export class AppModule {}
