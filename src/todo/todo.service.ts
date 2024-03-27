import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Todo } from './todo.model'
import { Model } from 'mongoose'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UserService } from '../user/user.service'

@Injectable()
export class TodoService {
	constructor(
		@InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
		private readonly userService: UserService
	) {}

	async create(dto: CreateTodoDto, id: string) {
		const user = await this.userService.findOneById(id)

		const todo = await this.todoModel.create({
			...dto,
			user
		})

		user.todos.push(todo)

		await user.save()

		return todo
	}

	async findAll() {
		return await this.todoModel.find().exec()
	}

	async findOne(id: string) {
		const todo = await this.todoModel.findById(id)
		if (!todo) throw new NotFoundException('Тодо не найдено')

		return todo
	}
}
