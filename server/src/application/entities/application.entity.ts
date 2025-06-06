import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../auth/entities/user.entity';

export type ServiceType =
  | 'general_cleaning'
  | 'deep_cleaning'
  | 'post_construction'
  | 'dry_cleaning';

export type PaymentType = 'cash' | 'card';

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

  @Column({ default: 'general_cleaning' })
  serviceType: ServiceType;

  @Column({ default: 'card' })
  paymentType: PaymentType;

  @Column({ default: 'pending' })
  status: string;

  @Column({ nullable: true })
  cancelReason: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.applications)
  user: UserEntity;
}
