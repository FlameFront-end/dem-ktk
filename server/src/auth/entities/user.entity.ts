import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { ApplicationEntity } from '../../application/entities/application.entity';

@Entity('users')
@Unique(['email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => ApplicationEntity, (application) => application.user)
  applications: ApplicationEntity[];
}
