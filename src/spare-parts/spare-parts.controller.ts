import { Body, Controller, Post } from '@nestjs/common';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { SparePartsService } from './spare-parts.service';

@Controller('spare-parts')
export class SparePartsController {
	constructor(private sparePartsService: SparePartsService) {}
	@Post('create')
	create(@Body() dto: CreateSparePartDto) {
		return this.sparePartsService.createPart(dto);
	}
}
