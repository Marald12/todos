import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { TodoService } from './todo.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { CurrentUser } from '../user/user.decorator'
import { Auth } from '../auth/guards/auth.guard'
import { UpdateTodoDto } from './dto/update-todo.dto'

@Controller('todo')
export class TodoController {
	constructor(private readonly todoService: TodoService) {}

	@Post()
	@Auth()
	@UsePipes(new ValidationPipe())
	create(@Body() dto: CreateTodoDto, @CurrentUser() user: any) {
		return this.todoService.create(dto, user.id)
	}

	@Get()
	findAll() {
		return this.todoService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.todoService.findOne(id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
		return this.todoService.update(id, dto)
	}

	@Delete(':id')
	@Auth()
	remove(@Param('id') id: string, @CurrentUser() user: any) {
		return this.todoService.remove(id, user.id)
	}
}
