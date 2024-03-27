import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from '../../user/user.model'
import mongoose, { Model } from 'mongoose'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
		private readonly configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET')
		})
	}

	async validate({ _id }: { _id: mongoose.Types.ObjectId }) {
		return await this.userModel.findById(_id).exec()
	}
}
