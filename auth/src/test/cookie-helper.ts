import request from 'supertest';
import { app } from '../app';

export const cookieHelper = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201);
  const cookie = response.get('Set-Cookie');
  return cookie;
};

/** Work around 1 to declare global type def */
// declare global {
//   var cookieHelper: () => Promise<string[]>;
// }
// global.cookieHelper = async () => {
//   const email = 'test@test.com';
//   const password = 'password';

//   const response = await request(app)
//     .post('/api/users/signup')
//     .send({ email, password })
//     .expect(201);
//   const cookie = response.get('Set-Cookie');
//   return cookie;
// };

/** Work around 2 */
// (global as any).cookieHelper = async () => {
//   const email = 'test@test.com';
//   const password = 'password';

//   const response = await request(app)
//     .post('/api/users/signup')
//     .send({ email, password })
//     .expect(201);
//   const cookie = response.get('Set-Cookie');
//   return cookie;
// };
