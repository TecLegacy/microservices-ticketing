import jwt from 'jsonwebtoken';
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

export async function createJwtSession() {
  const payload = {
    title: 'test',
    price: 10,
  };
  //Create a Jwt token
  const jwtPayload = jwt.sign(payload, 'tickets');
  const jwtSession = {
    jwt: jwtPayload,
  };

  //Cookie-session
  const sessionJSON = JSON.stringify(jwtSession);
  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${base64}`];
}
