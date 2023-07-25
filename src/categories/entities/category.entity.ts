import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SparePart } from '../../spare-parts/entities/spare-part.entity';

@Entity()
export class Category {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@OneToMany(() => SparePart, (sparePart) => sparePart.category)
	spareParts: SparePart[];
}
