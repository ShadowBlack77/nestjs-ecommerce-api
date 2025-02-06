import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginationDto {

  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly skip: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly limit: number;
}