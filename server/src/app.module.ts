import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './auth/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Fhntv2004',
      database: 'dem-ktk',
      entities: [UserEntity],
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
