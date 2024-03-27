import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
	@IsEmail({}, { message: 'Поле E-mail не валидно' })
	email: string

	@IsString({ message: 'Поле пароль не являеться строеой' })
	@MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
	@MaxLength(32, { message: 'Пароль должен быть не более 32 символов' })
	password: string

	@IsString({ message: 'Поле имени не являеться строеой' })
	name: string
}
