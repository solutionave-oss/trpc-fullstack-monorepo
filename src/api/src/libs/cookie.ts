import { IncomingMessage, ServerResponse } from 'http';
import { Ctx } from './trpc/context';
import * as cookie from 'cookie';
import { JWT } from './jwt';

export class Cookie {
  static setToken = (ctx: Ctx, id: string) => {
    const token = ctx.JWT.Sign({ id });
    ctx.res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', token, {
        maxAge: 60 * 60 * 24,
        domain: '.localhost',
        path: '/',
        sameSite: 'lax',
        priority: 'high',
        httpOnly: true,
        secure: false,
      })
    );

    return { token };
  };

  static resetCookie = (res: ServerResponse<IncomingMessage>) => {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        maxAge: 60 * 60 * 24,
        domain: '.localhost',
        path: '/',
        sameSite: 'lax',
        priority: 'high',
        httpOnly: true,
        secure: false,
      })
    );
  };

  static getAuthUserId = (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>
  ): ReturnType<typeof JWT.Decode> => {
    if (!req.headers.cookie) {
      return { id: '' };
    }

    const token = cookie.parse(req.headers.cookie)?.['token'];

    if (!token) {
      return { id: '' };
    }

    try {
      JWT.Verify(token);
    } catch {
      Cookie.resetCookie(res);
      return { id: '' };
    }
    return JWT.Decode(token);
  };
}
