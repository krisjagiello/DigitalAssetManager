import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'asset_registrations'})
export class RegisterAssetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  middle_name: string;

  @Column()
  last_name: string;
  
  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  fileMultihash: string;

  @Column()
  recordMultihash: string;

  @Column()
  prov58Url: string;

}