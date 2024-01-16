import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
// declare global {
//   var signin: () => string[];
// }

// global.signin = () => {
//   const payload = {
//     title: 'test',
//     price: 10,
//   };
//   const jwtPayload = jwt.sign(payload, 'tickets');
//   const jwtSession = {
//     jwt: jwtPayload,
//   };
//   const sessionJSON = JSON.stringify(jwtSession);
//   const base64 = Buffer.from(sessionJSON).toString('base64');
//   return [`session=${base64}`];
// };

export function createJwtSession() {
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };
  //Create a Jwt token
  const jwtPayload = jwt.sign(payload, process.env.JWT_KEY!);
  const jwtSession = {
    jwt: jwtPayload,
  };

  //Cookie-session
  const sessionJSON = JSON.stringify(jwtSession);
  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${base64}`];
}
