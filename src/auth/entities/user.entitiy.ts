import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column({ unique: true })
	login: string;

	@Column()
	passwordHash: string;
}
