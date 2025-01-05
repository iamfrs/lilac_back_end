import * as bcrypt from "bcrypt";
const tokenKey = "EmSpNpS1D#LEe4x7*L0MBU4nkQFS@9MwGlwAZa6zQ*eujxbBMFpfiY";
import * as jwt from "jsonwebtoken";
// import { Socket } from "socket.io";
interface tokenResponse {
  error: boolean;
  value: any;
}
// export const extractDataFromSocketHeader = (
//   socket: Socket,
//   key: string,
// ): string => {
//   return (
//     socket.handshake.headers[key]?.toString() ||
//     socket.handshake.auth[key]?.toString() ||
//     ""
//   );
// };

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

export const tokenDecode = (token: string): tokenResponse => {
  try {
    let decoded = jwt.verify(token, tokenKey);
    return { error: false, value: decoded };
  } catch (err) {
    return { error: true, value: err };
  }
};

export const tokenEncode = (params: any): string => {
  let key = jwt.sign(
    {
      data: params,
    },
    tokenKey,
  );
  return key;
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
