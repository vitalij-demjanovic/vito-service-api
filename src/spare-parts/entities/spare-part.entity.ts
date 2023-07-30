import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Expense } from '../../expenses/entities/expense.entity';

@Entity()
export class SparePart {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	count: number;

	@Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
	price: number;

	@Column()
	description: string;

	@Column()
	functionality: string;

	@ManyToOne(() => Category, (category) => category.spareParts)
	category: Category;

	@OneToMany(() => Expense, (expenses) => expenses.part)
	expenses: Expense[];
}
