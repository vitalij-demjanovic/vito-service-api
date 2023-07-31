import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { SparePartsModule } from '../spare-parts/spare-parts.module';

@Module({
	imports: [TypeOrmModule.forFeature([Expense]), SparePartsModule],
	providers: [ExpensesService],
	controllers: [ExpensesController],
	exports: [ExpensesService],
})
export class ExpensesModule {}
