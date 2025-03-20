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
        maxAge: 0,
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

  static setCookieValue = (key: string, value: string) => {
    return cookie.serialize(key, value, {
      maxAge: 60 * 60 * 24,
      domain: '.localhost',
      path: '/',
      sameSite: 'lax',
      priority: 'high',
      httpOnly: true,
      secure: false,
    });
  };

  static getCookieValue = (headers: string) => {
    return cookie.parse(headers ?? '');
  };

  static clearAllCookies = (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>
  ) => {
    const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};

    const expiredCookies = Object.keys(cookies).map((key) =>
      cookie.serialize(key, '', {
        maxAge: 0,
        domain: '.localhost',
        path: '/',
        sameSite: 'lax',
        priority: 'high',
        httpOnly: true,
        secure: false,
      })
    );

    res.setHeader('Set-Cookie', expiredCookies);
  };
}
