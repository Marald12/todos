import {
	Body,
	Controller,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { AuthDto } from './auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	@UsePipes(new ValidationPipe())
	register(@Body() dto: CreateUserDto) {
		return this.authService.register(dto)
	}

	@Post('login')
	@UsePipes(new ValidationPipe())
	login(@Body() dto: AuthDto) {
		return this.authService.login(dto)
	}
}
