import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Address } from './address.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @OneToOne(() => Address, (address) => address.user, {
    cascade: true,
  })
  address: Address;
}
