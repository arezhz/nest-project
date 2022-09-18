import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createReportsBodyDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class modifyReportsBodyDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;
}
