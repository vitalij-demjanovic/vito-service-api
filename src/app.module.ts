import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CategoriesModule } from './categories/categories.module';
import { SparePartsModule } from './spare-parts/spare-parts.module';
import { AuthModule } from './auth/auth.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, CategoriesModule, SparePartsModule, AuthModule, ExpensesModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
