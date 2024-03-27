import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Todo } from './todo.model'
import { Model } from 'mongoose'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UserService } from '../user/user.service'
import { UpdateTodoDto } from './dto/update-todo.dto'

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

		await user.updateOne({
			$push: {
				todos: todo._id
			}
		})

		return todo
	}

	async findAll() {
		return await this.todoModel.find().exec()
	}

	async findOne(id: string) {
		const todo = await this.todoModel.findById(id).populate('user')
		if (!todo) throw new NotFoundException('Todo не найдено')

		return todo
	}

	async update(id: string, dto: UpdateTodoDto) {
		const todo = await this.todoModel.findByIdAndUpdate(
			id,
			{
				...dto
			},
			{ new: true }
		)
		if (!todo) throw new NotFoundException('Todo не найдено')

		return todo
	}

	async remove(todoId: string, userId: string) {
		const todo = await this.findOne(todoId)
		const user = await this.userService.findOneById(userId)

		await user.updateOne({
			$pull: {
				todos: todo._id
			}
		})

		await this.todoModel.findByIdAndDelete(todo._id).exec()

		return 'Todo успешно удалено'
	}
}
