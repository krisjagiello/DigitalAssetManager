import { IsNotEmpty } from 'class-validator';

export class RegisterAssetParams {

  @IsNotEmpty()
  readonly name: string;

  readonly description: string;

  readonly url: string; // Location of the resource

}