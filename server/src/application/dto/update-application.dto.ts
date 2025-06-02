import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateApplicationDto {
  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  cancelReason?: string;
}
