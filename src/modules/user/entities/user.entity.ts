import { Property } from 'src/modules/property/entities/property.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  ph_number: string;

  @OneToMany(() => Property, (property) => property.user)
  properties: Property[];
}
