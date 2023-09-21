import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
	Request,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ALREADY_REGISTERED_ERROR } from './auth.constans';
import { JwtAuthGuard } from './guards/jwr.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async registration(@Body() dto: AuthDto) {
		const oldUser = await this.authService.findUser(dto.login);
		if (oldUser) {
			throw new BadRequestException(ALREADY_REGISTERED_ERROR);
		}
		return this.authService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() { login, password }: AuthDto) {
		const user = await this.authService.validateUser(login, password);
		return this.authService.login(user.login);
	}

	@Get('profile')
	@UseGuards(JwtAuthGuard)
	getProfile(@Request() req) {
		return this.authService.findUser(req.user); // This will contain the user data from the token
	}
}
