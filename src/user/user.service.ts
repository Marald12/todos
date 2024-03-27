import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './user.model'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { genSalt, hash } from 'bcryptjs'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>
	) {}

	async create(dto: CreateUserDto) {
		const oldUser = await this.userModel.findOne({ email: dto.email })
		if (oldUser)
			throw new BadRequestException('Пользователь с таким E-mail уже сущетвует')

		const salt = await genSalt(10)
		const hashPassword = await hash(dto.password, salt)

		return await this.userModel.create({
			...dto,
			password: hashPassword
		})
	}

	async findAll() {
		return await this.userModel.find().exec()
	}

	async findOneById(id: string) {
		const user = await this.userModel.findById(id).populate('todos')

		if (!user) throw new NotFoundException('Пользователь не найден')

		return user
	}

	async findOneByEmail(email: string) {
		const user = await this.userModel.findOne({ email }).select('password')

		if (!user) throw new NotFoundException('Пользователь не найден')

		return user
	}
}
