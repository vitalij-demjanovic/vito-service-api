import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { SparePartsService } from './spare-parts.service';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';
import { SparePart } from './entities/spare-part.entity';

@Controller('spare-parts')
export class SparePartsController {
	constructor(private sparePartsService: SparePartsService) {}
	@Post('create')
	create(@Body() dto: CreateSparePartDto) {
		return this.sparePartsService.createPart(dto);
	}

	@Patch(':id')
	async update(@Param('id') id: number, @Body() dto: UpdateSparePartDto) {
		return this.sparePartsService.updatePart(id, dto);
	}

	@Get(':categoryId')
	async findByCategory(@Param('categoryId') categoryId: number): Promise<SparePart[]> {
		return this.sparePartsService.findByCategory(categoryId);
	}
}
