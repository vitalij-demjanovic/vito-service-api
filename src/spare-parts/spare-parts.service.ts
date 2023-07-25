import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SparePart } from './entities/spare-part.entity';
import { Repository } from 'typeorm';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class SparePartsService {
	constructor(
		@InjectRepository(SparePart)
		private readonly sparePartRepository: Repository<SparePart>,
		private categoriesService: CategoriesService,
	) {}

	async createPart(dto: CreateSparePartDto) {
		const { name, count, price, description, functionality } = dto;
		const getCategory = await this.categoriesService.getCategoryByValue('Pistols');
		if (!getCategory) {
			throw Error('Category not found.');
		}
		const sparePart = await this.sparePartRepository.save({
			name,
			count,
			price,
			description,
			functionality,
			category: getCategory,
		});

		return sparePart;
	}
}
