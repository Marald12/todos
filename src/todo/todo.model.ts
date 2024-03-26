import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { User } from '../user/user.model'

export type TodoDocument = HydratedDocument<Todo>

@Schema()
export class Todo {
	@Prop()
	title: string

	@Prop()
	todo: string

	@Prop()
	isDone: boolean

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	user: User
}

export const TodoSchema = SchemaFactory.createForClass(Todo)
