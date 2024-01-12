'use client';
import { FC } from 'react';
import { ProfileForm } from '@/components/authForm/ProfileForm';
import { Method } from '@/lib/types';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const requestPayload = {
    url: '/api/users/signin',
    method: 'post' as Method,
  };
  return (
    <>
      <div className=" mx-auto mt-32 flex  flex-col place-items-center gap-8">
        <h1 className=" text-3xl">SignIn</h1>
        <ProfileForm payload={requestPayload} />
      </div>
    </>
  );
};

export default Page;
