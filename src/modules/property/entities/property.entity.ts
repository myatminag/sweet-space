import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PropertType, NoiseLevel } from 'src/utils/enum';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('property')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  property_name: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  renting_price: string;

  @Column()
  selling_price: string;

  @Column({
    type: 'enum',
    enum: PropertType,
  })
  type: PropertType;

  @Column()
  area: string;

  @Column()
  bedroom: number;

  @Column()
  bathroom: number;

  @Column()
  access_pool: boolean;

  @Column()
  allow_pet: boolean;

  @Column()
  allow_parking: boolean;

  @Column()
  place_name: string;

  @Column()
  distance: string;

  @Column({
    type: 'enum',
    enum: NoiseLevel,
  })
  noise_level: NoiseLevel;

  @Column('uuid', { array: true })
  images: string[];

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.properties)
  user: User;
}
