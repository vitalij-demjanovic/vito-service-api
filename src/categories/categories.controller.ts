import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
	constructor(private categoriesService: CategoriesService) {}

	@Post('create')
	create(@Body() dto: CreateCategoryDto) {
		return this.categoriesService.createCategory(dto);
	}

	@Get()
	allParts() {
		return this.categoriesService.getAllCategories();
	}

	@Get('/:value')
	getByValue(@Param('value') value: string) {
		return this.categoriesService.getCategoryByValue(value);
	}
}
