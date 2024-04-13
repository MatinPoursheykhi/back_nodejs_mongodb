import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../jwt';
import { Request } from 'express';
import { Payload } from '../types';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        // extract the request object
        const request = context.switchToHttp().getRequest();
        const token: string = this.extractTokenFromHeader(request);
        if (!token)
            throw new UnauthorizedException();

        try {
            const payload: Payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret });
            request['user'] = payload;

            return true;
        } catch {
            throw new UnauthorizedException();
        }
    }

    //spread the token and its type, return the actual token
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}