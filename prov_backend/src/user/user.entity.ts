import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {
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
  username: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string; // This will be an url

  @Column({ select: false }) // Don't show in findOne(), etc.
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10); // 10 is the salt
  }
}
