import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../admin/types';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    return user.id;
  },
);
