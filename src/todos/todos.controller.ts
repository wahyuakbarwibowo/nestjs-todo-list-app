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
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'isDone', required: false, type: Boolean })
  @ApiQuery({
    name: 'priority',
    required: false,
    enum: ['low', 'medium', 'high'],
  })
  @ApiQuery({ name: 'dueBefore', required: false, type: String })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('isDone') isDone?: string,
    @Query('priority') priority?: 'low' | 'medium' | 'high',
    @Query('dueBefore') dueBefore?: string,
  ) {
    const result = await this.todosService.findAll({
      page: Number(page),
      limit: Number(limit),
      isDone: isDone === undefined ? undefined : isDone === 'true',
      priority,
      dueBefore,
    });

    return {
      data: result.data,
      totalItems: result.total,
      currentPage: Number(page),
      totalPages: Math.ceil(result.total / Number(limit)),
    };
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
