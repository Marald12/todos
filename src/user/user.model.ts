import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Todo } from '../todo/todo.model'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
	@Prop({ unique: true })
	email: string

	@Prop({ select: false })
	password: string

	@Prop()
	name: string

	@Prop({ unique: false, default: '/uploads/avatar/default-avatar.png' })
	avatarPath?: string

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }] })
	todos: Todo[]
}

export const UserSchema = SchemaFactory.createForClass(User)
