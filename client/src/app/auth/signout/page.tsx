'use client';
import { showToast } from '@/components/ui/sonner';
import { useRequest } from '@/hooks/useRequest';
// import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  // const router = useRouter();
  const { doRequest, error } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    onSuccess: (req) => {
      if (req) {
        window.location.href = '/';
      }
    },
  });

  useEffect(() => {
    doRequest({});
  }, [doRequest]);

  if (error && error.length > 0) {
    error.forEach((e) => showToast(e.message));
  }

  return <div>Signing you out...</div>;
};

export default Page;
