import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { SparePartsService } from '../spare-parts/spare-parts.service';
import { InjectRepository } from '@nestjs/typeorm';
import { LARGE_AMOUNT_ERROR } from './exoenses.constans';

@Injectable()
export class ExpensesService {
	constructor(
		@InjectRepository(Expense)
		private readonly expensesRepository: Repository<Expense>,
		private sparePartService: SparePartsService,
	) {}

	async createExpense(dto: CreateExpenseDto) {
		const { name, price, count } = await this.sparePartService.findById(dto.partId);
		if (count >= dto.quantityTaken) {
			await this.expensesRepository.save({
				partName: name,
				date: new Date(),
				quantityTaken: dto.quantityTaken,
				totalPrice: price * dto.quantityTaken,
			});
			return await this.sparePartService.updateCount(dto.partId, dto.quantityTaken);
		} else {
			throw new BadRequestException(LARGE_AMOUNT_ERROR);
		}
	}
}
