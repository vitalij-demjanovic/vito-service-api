import { Module } from '@nestjs/common';
import { SparePartsService } from './spare-parts.service';
import { SparePartsController } from './spare-parts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparePart } from './entities/spare-part.entity';
import { CategoriesModule } from '../categories/categories.module';

@Module({
	imports: [TypeOrmModule.forFeature([SparePart]), CategoriesModule],
	providers: [SparePartsService],
	controllers: [SparePartsController],
})
export class SparePartsModule {}
