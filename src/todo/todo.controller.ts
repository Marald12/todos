import { Body, Controller, Post } from '@nestjs/common'
import { TodoService } from './todo.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { CurrentUser } from '../user/user.decorator'
import { Auth } from '../auth/guards/auth.guard'

@Controller('todo')
export class TodoController {
	constructor(private readonly todoService: TodoService) {}

	@Post()
	@Auth()
	create(@Body() dto: CreateTodoDto, @CurrentUser() user: any) {
		return this.todoService.create(dto, user.id)
	}
}
