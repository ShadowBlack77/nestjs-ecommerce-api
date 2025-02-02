import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_SKIP_API_KEY } from '../../decorators';

@Injectable()
export class ApiKeyGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}

  private readonly API_KEY = process.env.SECRET_API_KEY;

  canActivate(context: ExecutionContext): boolean {

    const isSkipKey = this.reflector.getAllAndOverride<boolean>(IS_SKIP_API_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isSkipKey) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['api-key'];

    if (!apiKey || apiKey !== this.API_KEY) {
      throw new UnauthorizedException('Invalid API Key');
    }

    return true;
  }
}
