import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SparePart } from '../../spare-parts/entities/spare-part.entity';

@Entity()
export class Expense {
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column()
	partName: string;

	@Column()
	date: Date;

	@Column()
	quantityTaken: number;

	@Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
	totalPrice: number;

	@OneToMany(() => SparePart, (sparePart) => sparePart)
	expense: SparePart;
}
