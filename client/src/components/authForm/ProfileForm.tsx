import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Control, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRequest } from '@/hooks/useRequest';
import { showToast } from '@/components/ui/sonner';
import { formSchema, FromValue } from '@/lib/validation/formValidation';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { Method } from '@/lib/types';

interface RequestPayload {
  url: string;
  method: Method;
}
interface ProfileFormProps {
  payload: RequestPayload;
}

export const ProfileForm: FC<ProfileFormProps> = ({ payload }) => {
  const router = useRouter();

  const form = useForm<FromValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { doRequest, error } = useRequest({
    url: payload.url,
    method: payload.method,
    onSuccess: (reqData) => router.push('/'),
  });

  async function onSubmit(values: FromValue) {
    const response = await doRequest(values);
    if (response) {
      window.location.href = '/';
    }
  }

  if (error && error.length > 0) {
    error.forEach((e) => showToast(e.message));
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <EmailField control={form.control} />
          <PasswordField control={form.control} />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div>
        <ul>
          {error && error?.map((e) => <li key={e.message}>{e.message}</li>)}
        </ul>
      </div>
    </>
  );
};

function EmailField({ control }: { control: Control<FromValue> }) {
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="Email@test.com" {...field} />
          </FormControl>
          <FormDescription>This is your public display email.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function PasswordField({ control }: { control: Control<FromValue> }) {
  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input placeholder="password" {...field} type="password" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
