import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { IUser } from '../types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hash = await argon2.hash(dto.password);

    return this.userRepository.save({ ...dto, password: hash });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findOneByEmail(email);

    if (user) {
      const passwordIsMatch = await argon2.verify(user.password, password);

      if (user && passwordIsMatch) {
        return user;
      }
    }

    throw new UnauthorizedException('Неверная почта или пароль!');
  }

  async login(user: IUser) {
    const { id, email, phone, fullName, username } = user;

    return {
      id,
      fullName,
      phone,
      username,
      email,
      token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
