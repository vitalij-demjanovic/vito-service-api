import { Body, Controller, Post } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
	constructor(private expanseService: ExpensesService) {}
	@Post('withdrawal')
	async createWithdrawal(@Body() dto: CreateExpenseDto) {
		return this.expanseService.createExpenseWithdrawal(dto);
	}

	@Post('income')
	async createExpense(@Body() dto: CreateExpenseDto) {
		return this.expanseService.createExpenseIncome(dto);
	}
}
