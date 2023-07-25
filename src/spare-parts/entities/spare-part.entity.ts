import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class SparePart {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	count: number;

	@Column()
	price: number;

	@Column()
	description: string;

	@Column()
	functionality: string;

	@ManyToOne(() => Category, (category) => category.spareParts)
	category: Category;
}
