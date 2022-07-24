import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    // constructor (private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        return true;
    }
}