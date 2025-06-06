import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { ApplicationEntity } from './entities/application.entity';
import { UserEntity } from '../auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationEntity, UserEntity])],
  providers: [ApplicationService],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
