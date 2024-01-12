import { getUser } from '@/lib/clientAPI';

export default async function Home() {
  const status = await getUser();
  console.log(status);

  if (!status || !status.currentUser) {
    return <p className=" text-3xl">You are not Signed In</p>;
  }
  return (
    <>
      <p className=" text-3xl"> Hey! Welcome </p>
    </>
  );
}
