import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Property } from '@/modules/property/entities/property.entity';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  ph_number: string;

  @OneToMany(() => Property, (property) => property.user)
  properties: Property[];

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  reset_token: string;

  @Column({ nullable: true })
  expires_time: Date;

  isResetTokenExpire(): boolean {
    return this.expires_time < new Date();
  }
}
