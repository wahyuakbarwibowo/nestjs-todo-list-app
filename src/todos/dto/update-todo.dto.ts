import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEnum, IsOptional } from 'class-validator';

export class UpdateTodoDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isDone?: boolean;

  @ApiProperty({ required: false, type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiProperty({ required: false, enum: ['low', 'medium', 'high'] })
  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority?: 'low' | 'medium' | 'high';
}
