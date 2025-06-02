import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../../auth/entities/user.entity';

export enum ServiceType {
  GENERAL_CLEANING = 'general_cleaning',
  DEEP_CLEANING = 'deep_cleaning',
  POST_CONSTRUCTION = 'post_construction',
  DRY_CLEANING = 'dry_cleaning',
}

export enum PaymentType {
  CASH = 'cash',
  CARD = 'card',
}

@Entity('application')
export class ApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  fullName: string;

  @Column()
  contactPhone: string;

  @Column()
  desiredDate: Date;

  @Column()
  desiredTime: string;

  @Column({
    type: 'enum',
    enum: ServiceType,
    default: ServiceType.GENERAL_CLEANING,
  })
  serviceType: ServiceType;

  @Column({
    type: 'enum',
    enum: PaymentType,
    default: PaymentType.CASH,
  })
  paymentType: PaymentType;

  @Column({ default: 'pending' })
  status: string;

  @Column({ nullable: true })
  cancelReason: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.applications)
  user: UserEntity;
}
