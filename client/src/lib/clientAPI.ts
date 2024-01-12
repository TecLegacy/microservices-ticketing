import axios from 'axios';
import { headers } from 'next/headers';
import { CurrentUser } from './types';

// Get Active session
const isActiveSession = () => {
  const headersList = headers();
  const host = headersList.get('host');

  const cookies = headersList.get('cookie')?.split('; ');
  const sessionCookie = cookies?.find((cookie) =>
    cookie.startsWith('session='),
  );

  return { sessionCookie, headersList, host };
};
interface DataUser {
  currentUser: CurrentUser;
}
export const getUser = async (): Promise<DataUser | null> => {
  try {
    // K8s ingress clusterIp - cross namespace communication with Pods
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: {
          host: isActiveSession().host,
          cookie: isActiveSession().sessionCookie,
        },
      },
    );
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
