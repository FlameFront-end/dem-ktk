import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'ФИО обязательно' })
  fullName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Телефон обязателен' })
  phone: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Email некорректный' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Логин обязателен' })
  username: string;

  @ApiProperty()
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  password: string;
}
