import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(dto: RegisterDto) {
    return this.userRepository.save({ ...dto });
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new HttpException(
        'Пользователь с таким email не найден',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordIsMatch = user.password === dto.password;

    if (!passwordIsMatch) {
      throw new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
