import { decode, sign, SignOptions, verify } from 'jsonwebtoken';

type SigningType = { id: string };

export class JWT {
  static SECRET_KEY = 'abubakarasifmughal.solutionave.inc';

  static CONFIG: SignOptions = {
    algorithm: 'HS512',
    issuer: 'com.solutionave.aiobisoft',
    expiresIn: '1d',
  };

  static Sign = (payload: SigningType) =>
    sign(payload, JWT.SECRET_KEY, JWT.CONFIG);

  static Verify = (token: string) => verify(token, JWT.SECRET_KEY, JWT.CONFIG);

  static Decode = (token: string) => decode(token) as SigningType;
}
