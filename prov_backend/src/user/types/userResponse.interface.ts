import { UserType } from './user.types';

export interface UserResponseInteface {
  user: UserType & { token: string };
}
