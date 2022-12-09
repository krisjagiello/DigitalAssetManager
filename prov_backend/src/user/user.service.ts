import { UpdateUserDto } from './dto/updateUser.dto';
import { compare } from 'bcrypt';
import { LoginUserDto } from './dto/LoginUser.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserResponseInteface } from './types/userResponse.interface';
import { urlToHttpOptions } from 'url';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    const userByUsername = await this.userRepository.findOne({
      username: createUserDto.username,
    });
    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email and/or username are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new UserEntity();
    console.log('newUserr', newUser);
    Object.assign(newUser, createUserDto);
    console.log('newUser', newUser);
    return await this.userRepository.save(newUser);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const userByUsername = await this.userRepository.findOne(
      { username: loginUserDto.username },
      { select: ['id', 'username', 'email', 'bio', 'image', 'password'] },
    );
    if (!userByUsername) {
      throw new HttpException(
        'user does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const user = new UserEntity();
    Object.assign(user, loginUserDto);
    console.log('user', user);
    console.log('in db', userByUsername);

    const isPwdCorrect = await compare(user.password, userByUsername.password);

    if (!isPwdCorrect) {
      throw new HttpException('bad password', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    delete userByUsername.password; // We don't want to show password in the return data
    return userByUsername;
  }

  async updateUser(updateUserDto: UpdateUserDto, userData: UserEntity) {
    const user = new UserEntity();
    Object.assign(user, userData);
    Object.assign(user, updateUserDto);
    console.log('Update ', user);
    return await this.userRepository.save(user);
  }

  // I was thinking at first we'd avoid calling the findById and reuse data that came from token. But issue with my approach
  // is that not all data is stored in the token.
  async updateUserClass(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findById(userId);
    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  }

  buildeUserResponse(user: UserEntity): UserResponseInteface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
