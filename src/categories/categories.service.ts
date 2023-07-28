import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(Category)
		private readonly categoriesRepository: Repository<Category>,
	) {}

	async getAllCategories() {
		return this.categoriesRepository.find();
	}

	async createCategory(dto: CreateCategoryDto) {
		return this.categoriesRepository.save(dto);
	}

	async getCategoryByValue(value: string) {
		return this.categoriesRepository.findOne({ where: { name: value } });
	}
}
