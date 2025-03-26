import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true; // If no roles are required, allow access

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}
