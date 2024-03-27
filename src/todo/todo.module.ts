import { Module } from '@nestjs/common'
import { TodoService } from './todo.service'
import { TodoController } from './todo.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Todo, TodoSchema } from './todo.model'
import { UserService } from '../user/user.service'
import { User, UserSchema } from '../user/user.model'

@Module({
	controllers: [TodoController],
	providers: [TodoService, UserService],
	imports: [
		MongooseModule.forFeature([
			{ name: Todo.name, schema: TodoSchema },
			{ name: User.name, schema: UserSchema }
		])
	]
})
export class TodoModule {}
