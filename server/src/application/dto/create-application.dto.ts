import { PaymentType, ServiceType } from '../entities/application.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  contactPhone: string;

  @ApiProperty()
  desiredDate: Date;

  @ApiProperty()
  desiredTime: string;

  @ApiProperty({ default: 'general_cleaning' })
  serviceType: ServiceType;

  @ApiProperty({ default: 'cash' })
  paymentType: PaymentType;

  @ApiProperty({ required: false })
  status?: string;

  @ApiProperty({ required: false })
  cancelReason?: string;
}
