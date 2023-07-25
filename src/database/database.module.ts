import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('DATABASE_HOST'),
				port: configService.get('DATABASE_PORT'),
				database: configService.get('DATABASE_NAME'),
				username: configService.get('DATABASE_USERNAME'),
				password: configService.get('DATABASE_PASSWORD'),
				autoLoadEntities: true,
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
	],
})
export class DatabaseModule {}
