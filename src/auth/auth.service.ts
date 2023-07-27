import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entitiy';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcryptjs';
import { AuthDto } from './dto/auth.dto';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constans';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private readonly authorizationRepository: Repository<User>,
		private readonly jwtService: JwtService,
	) {}

	async createUser(dto: AuthDto) {
		const salt = await genSalt(10);
		const newUser = {
			login: dto.login,
			passwordHash: await hash(dto.password, salt),
		};

		return this.authorizationRepository.save(newUser);
	}
	async findUser(login: string) {
		return this.authorizationRepository.findOne({ where: { login } });
	}

	async validateUser(login: string, password: string) {
		const user = await this.findUser(login);
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}

		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}

		return { login: user.login };
	}

	async login(login: string) {
		const payload = { login };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
