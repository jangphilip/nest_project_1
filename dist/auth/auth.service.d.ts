import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
export declare class AuthService {
    private readonly catsRepository;
    constructor(catsRepository: CatsRepository);
    jwtLogIn(data: LoginRequestDto): Promise<void>;
}
