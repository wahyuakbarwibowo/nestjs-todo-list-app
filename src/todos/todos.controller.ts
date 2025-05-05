import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('isDone') isDone?: string,
    @Query('priority') priority?: 'low' | 'medium' | 'high',
    @Query('dueBefore') dueBefore?: string,
  ) {
    return this.todosService.findAll({
      page: Number(page),
      limit: Number(limit),
      isDone: isDone === undefined ? undefined : isDone === 'true',
      priority,
      dueBefore,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const todo = this.todosService.findOne(+id);
    return todo;
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const todo = this.todosService.update(+id, updateTodoDto);
    return todo;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.todosService.delete(+id);
  }
}
