import { IncomingMessage } from 'http';

const OPEN_ROUTES = ['.signIn'];

export const isOpenRoute = (req: IncomingMessage) =>
  OPEN_ROUTES.map((route) => req.url.includes(route)).reduce((a, b) => a && b);
