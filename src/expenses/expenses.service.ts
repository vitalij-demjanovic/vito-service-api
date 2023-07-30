import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { SparePartsService } from '../spare-parts/spare-parts.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExpensesService {
	constructor(
		@InjectRepository(Expense)
		private readonly expensesRepository: Repository<Expense>,
		private sparePartService: SparePartsService,
	) {}

	async createExpense(dto: CreateExpenseDto) {
		const { name, price } = await this.sparePartService.findById(dto.partId);

		return await this.expensesRepository.save({
			partName: name,
			date: new Date(),
			quantityTaken: dto.quantityTaken,
			totalPrice: price * dto.quantityTaken,
		});
	}
}
