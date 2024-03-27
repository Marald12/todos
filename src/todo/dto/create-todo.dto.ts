import { IsBoolean, IsString } from 'class-validator'

export class CreateTodoDto {
	@IsString({ message: 'Поле заголовок не явлеяться строкой' })
	title: string

	@IsString({ message: 'Поле todo не явлеяться строкой' })
	todo: string

	@IsBoolean({ message: 'Поле выоленно ли не явлеяться boolean' })
	isDone: boolean
}
