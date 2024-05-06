import { CatsService } from './cats.service';
import { CatRequestDto } from 'src/cats/dto/cats.request.dto';
export declare class CatsController {
    private readonly catsService;
    constructor(catsService: CatsService);
    getCurrentCat(): string;
    signUp(body: CatRequestDto): Promise<{
        id: string;
        email: string;
        name: string;
    }>;
    logIn(): string;
    logOut(): string;
    uploadCatImg(): string;
}
