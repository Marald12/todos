import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
	@Prop({ unique: true })
	email: string

	@Prop({ select: false })
	password: string

	@Prop()
	name: string

	@Prop()
	avatarPath: string
}

export const UserSchema = SchemaFactory.createForClass(User)
