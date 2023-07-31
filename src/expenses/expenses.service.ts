import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { SparePartsService } from '../spare-parts/spare-parts.service';
import { InjectRepository } from '@nestjs/typeorm';
import { INCOME, LARGE_AMOUNT_ERROR, WITHDRAWAL } from './exoenses.constans';

@Injectable()
export class ExpensesService {
	constructor(
		@InjectRepository(Expense)
		private readonly expensesRepository: Repository<Expense>,
		private sparePartService: SparePartsService,
	) {}

	async createExpenseWithdrawal(dto: CreateExpenseDto) {
		const part = await this.sparePartService.findById(dto.partId);
		if (part.count >= dto.quantityTaken) {
			await this.expensesRepository.save({
				partName: part.name,
				date: new Date(),
				quantityTaken: dto.quantityTaken,
				totalPrice: part.price * dto.quantityTaken,
				part,
				action: WITHDRAWAL,
			});
			return await this.sparePartService.decrementCount(dto.partId, dto.quantityTaken);
		} else {
			throw new BadRequestException(LARGE_AMOUNT_ERROR);
		}
	}

	async createExpenseIncome(dto: CreateExpenseDto) {
		const part = await this.sparePartService.findById(dto.partId);

		await this.expensesRepository.save({
			partName: part.name,
			date: new Date(),
			quantityTaken: dto.quantityTaken,
			totalPrice: part.price * dto.quantityTaken,
			part,
			action: INCOME,
		});

		return await this.sparePartService.incrementCount(dto.partId, dto.quantityTaken);
	}
}
