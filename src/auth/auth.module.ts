import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { jwtConfig } from '../config/jwt.config'
import { JwtStrategy } from './strategies/jwt.strategy'
import { UserService } from '../user/user.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '../user/user.model'

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, UserService],
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: jwtConfig
		}),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		ConfigModule
	]
})
export class AuthModule {}
