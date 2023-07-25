import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('MYSQL_HOST'),
				port: configService.get('MYSQL_PORT'),
				database: configService.get('MYSQL_DATABASE'),
				username: configService.get('MYSQL_USERNAME'),
				password: configService.get('MYSQL_PASSWORD'),
				autoLoadEntities: true,
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
	],
})
export class DatabaseModule {}
