import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Property } from 'src/modules/property/entities/property.entity';

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
}
