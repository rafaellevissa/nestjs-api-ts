import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zip_code: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @JoinColumn({ name: 'user_id' })
  user: User;
}
