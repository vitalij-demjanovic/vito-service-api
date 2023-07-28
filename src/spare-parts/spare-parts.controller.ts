import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { SparePartsService } from './spare-parts.service';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';

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
}
