import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ type: 'string' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: 'string' })
  @Column({ unique: true, nullable: false })
  email: string;

  @ApiProperty({ type: 'string' })
  @Column({ nullable: false })
  password: string;

  @ApiProperty({ type: 'string' })
  @Column({ unique: true })
  cpf: string;

  @ApiProperty({ type: 'string' })
  @Column()
  name: string;

  @ApiProperty({ type: 'string' })
  @Column()
  phone: string;

  @OneToOne(() => Address, (address) => address.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  address: Address;
}
