import { useState } from 'react';
import axios from 'axios';
import { FromValue } from '@/lib/validation/formValidation';
import { Method, ErrorType } from '@/lib/types';

interface Prop {
  url: string;
  method: Method;
  onSuccess: (reqData: FromValue | {}) => void;
}

export const useRequest = ({ url, method, onSuccess }: Prop) => {
  const [error, setError] = useState<ErrorType | null>(null);

  async function doRequest(body: FromValue | {}) {
    try {
      setError(null);
      const response = await axios({
        url,
        method,
        data: body,
      });
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err: any) {
      setError(err.response.data.error);
    }
  }
  return { doRequest, error };
};
