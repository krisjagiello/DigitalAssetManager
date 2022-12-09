import { AuthGuard } from './guards/auth.guard';
import { LoginUserDto } from './dto/LoginUser.dto';
import { UserResponseInteface } from './types/userResponse.interface';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from '@app/user/user.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { ExpressRequest } from '@app/types/expressRequest.interface';
import { User } from './decorators/user.decorator';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInteface> {
    console.log(createUserDto);
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildeUserResponse(user);
  }

  @Post('/users/login')
  @UsePipes(new ValidationPipe())
  async loginUser(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInteface> {
    console.log(loginUserDto);
    const user = await this.userService.loginUser(loginUserDto);
    return this.userService.buildeUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserEntity): Promise<UserResponseInteface> {
    //console.log('Request.user: ', request.user);
    //console.log('@User: ', user);
    // throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
    return this.userService.buildeUserResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  async updateUser(
    @Body('user') updateUserDto: UpdateUserDto,
    @User() user: UserEntity,
  ): Promise<UserResponseInteface> {
    console.log(updateUserDto);
    const userUpdated = await this.userService.updateUser(updateUserDto, user);
    return this.userService.buildeUserResponse(user);
  }
}
