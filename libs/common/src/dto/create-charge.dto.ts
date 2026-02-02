import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CardDto } from './card.dto';

export class CreateChargeDto {
  @IsNumber()
  amount: number;

  @IsString()
  paymentMethodId: string;
}