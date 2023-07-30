import { Body, Controller, Post } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
	constructor(private expanseService: ExpensesService) {}
	@Post('create')
	async createExpense(@Body() dto: CreateExpenseDto) {
		return this.expanseService.createExpense(dto);
	}
}
