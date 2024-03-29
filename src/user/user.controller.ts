import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from '../auth/guards/auth.guard'
import { CurrentUser } from './user.decorator'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	getProfile(@CurrentUser() user: any) {
		return this.userService.findOneById(user.id)
	}

	@Get()
	findAll() {
		return this.userService.findAll()
	}

	@Get(':id')
	findOneById(@Param('id') id: string) {
		return this.userService.findOneById(id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
		return this.userService.updateUser(id, dto)
	}
}
