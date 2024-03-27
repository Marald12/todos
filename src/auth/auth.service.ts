import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { CreateUserDto } from '../user/dto/create-user.dto'
import mongoose from 'mongoose'
import { AuthDto } from './auth.dto'
import { compare } from 'bcryptjs'

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UserService
	) {}

	async register(dto: CreateUserDto) {
		const user = await this.userService.create(dto)

		return {
			user,
			token: await this.generateJwtToken(user._id)
		}
	}

	async login(dto: AuthDto) {
		const user = await this.userService.findOneByEmail(dto.email)

		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword)
			throw new BadRequestException('Пароль или E-mail не верный')

		return {
			user,
			token: await this.generateJwtToken(user._id)
		}
	}

	private async generateJwtToken(_id: mongoose.Types.ObjectId) {
		return await this.jwtService.signAsync({ _id })
	}
}
