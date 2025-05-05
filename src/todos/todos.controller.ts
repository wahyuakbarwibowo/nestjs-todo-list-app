import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Post()
  create(@Body() body: { title: string; description?: string }) {
    return this.todosService.create(body.title, body.description);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { isDone: boolean }) {
    return this.todosService.update(+id, body.isDone);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.todosService.delete(+id);
  }
}
