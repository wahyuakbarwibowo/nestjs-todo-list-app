import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todosRepository.create({
      ...createTodoDto,
      dueDate: createTodoDto.dueDate
        ? new Date(createTodoDto.dueDate)
        : undefined,
      priority: createTodoDto.priority || 'medium',
    });
    return this.todosRepository.save(todo);
  }

  findAll(options: {
    page: number;
    limit: number;
    isDone?: boolean;
    priority?: 'low' | 'medium' | 'high';
    dueBefore?: string;
  }): Promise<Todo[]> {
    const { page, limit, isDone, priority, dueBefore } = options;

    const where: any = {};
    if (isDone !== undefined) {
      where.isDone = isDone;
    }
    if (priority) {
      where.priority = priority;
    }
    if (dueBefore) {
      where.dueDate = { $lte: new Date(dueBefore) };
    }

    return this.todosRepository.find({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { dueDate: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todosRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOne(id);

    if (updateTodoDto.isDone !== undefined) {
      todo.isDone = updateTodoDto.isDone;
    }

    if (updateTodoDto.dueDate !== undefined) {
      todo.dueDate = new Date(updateTodoDto.dueDate);
    }

    if (updateTodoDto.priority !== undefined) {
      todo.priority = updateTodoDto.priority;
    }

    return this.todosRepository.save(todo);
  }

  async delete(id: number): Promise<void> {
    const result = await this.todosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Todo not found');
    }
  }
}
