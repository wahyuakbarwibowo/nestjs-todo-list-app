import { IsBoolean, IsDateString, IsEnum, IsOptional } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsBoolean()
  isDone?: boolean;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority?: 'low' | 'medium' | 'high';
}
