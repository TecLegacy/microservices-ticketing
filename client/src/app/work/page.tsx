import axios from 'axios';
import { FC } from 'react';
import { headers } from 'next/headers';
import NavBar from '@/components/navBar';
interface PageProps {}

const Page: FC<PageProps> = async ({}) => {
  const headersList = headers();
  console.log(headersList);
  // const d = await Work();
  // console.log('its working', d?.data.currentUser);
  return (
    <>
      <NavBar />
      <h1>PAGE</h1>
    </>
  );
};

async function Work() {
  const res = await axios
    .get('http://auth-srv:3000/api/users/currentuser')
    .catch((err) => console.log(err)); //Posts Service
  const resT = await axios
    .get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: {
          host: 'ticketing.dev',
        },
      },
    )
    .catch((err) => console.log(err)); //Posts Service
  return resT;
}

export default Page;
