import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationEntity } from './entities/application.entity';
import { UserEntity } from '../auth/entities/user.entity';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private applicationRepository: Repository<ApplicationEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto,
  ): Promise<ApplicationEntity> {
    const user = await this.userRepository.findOne({
      where: { id: createApplicationDto.userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const application = this.applicationRepository.create({
      ...createApplicationDto,
      user,
    });

    return this.applicationRepository.save(application);
  }

  async findAllByUser(userId: number): Promise<ApplicationEntity[]> {
    return this.applicationRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findAllWithUsers() {
    return this.applicationRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(id: number, updateApplicationDto: UpdateApplicationDto) {
    const application = await this.applicationRepository.findOne({
      where: { id },
    });

    if (!application) {
      throw new NotFoundException('Заявка не найдена');
    }

    application.status = updateApplicationDto.status;

    if (updateApplicationDto.cancelReason) {
      application.cancelReason = updateApplicationDto.cancelReason;
    }

    return this.applicationRepository.save(application);
  }
}
