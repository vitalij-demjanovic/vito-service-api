import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SparePart } from './entities/spare-part.entity';
import { Repository } from 'typeorm';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { CategoriesService } from '../categories/categories.service';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';

@Injectable()
export class SparePartsService {
	constructor(
		@InjectRepository(SparePart)
		private readonly sparePartRepository: Repository<SparePart>,
		private categoriesService: CategoriesService,
	) {}

	async createPart(dto: CreateSparePartDto) {
		const { name, count, price, description, functionality, category } = dto;
		const getCategory = await this.categoriesService.getCategoryByValue(category);
		if (!getCategory) {
			throw Error('Category not found.');
		}

		return await this.sparePartRepository.save({
			name,
			count,
			price,
			description,
			functionality,
			category: getCategory,
		});
	}

	async findById(id: number) {
		return this.sparePartRepository.findOne({
			where: {
				id,
			},
		});
	}

	async decrementCount(id: number, value: number) {
		const part = await this.findById(id);

		return await this.sparePartRepository.save({
			...part,
			count: part.count - value,
		});
	}

	async incrementCount(id: number, value: number) {
		const part = await this.findById(id);

		return await this.sparePartRepository.save({
			...part,
			count: part.count + value,
		});
	}

	async updatePart(id: number, dto: UpdateSparePartDto) {
		return await this.sparePartRepository
			.createQueryBuilder()
			.update(SparePart)
			.set(dto)
			.where('id = :id', { id })
			.execute();
	}

	async findByCategory(categoryId: number): Promise<SparePart[]> {
		return this.sparePartRepository.find({
			where: {
				category: {
					id: categoryId,
				},
			},
		});
	}

	async getExpensesPart(id: number) {
		return this.sparePartRepository.findOne({
			where: {
				id,
			},
			relations: {
				expenses: true,
			},
		});
	}
}
