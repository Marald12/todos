import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { mongoConfig } from './config/mongo.config'
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env'
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: mongoConfig
		}),
		UserModule,
		TodoModule,
		AuthModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
