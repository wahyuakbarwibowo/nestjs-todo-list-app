import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const todo = this.todosService.findOne(+id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  @Post()
  create(@Body() body: CreateTodoDto) {
    return this.todosService.create(body.title, body.description);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const todo = this.todosService.update(+id, updateTodoDto.isDone);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.todosService.delete(+id);
  }
}
