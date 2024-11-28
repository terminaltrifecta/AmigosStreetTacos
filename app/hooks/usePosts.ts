import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

interface PostData {
  test: string
}

async function postData(data: PostData) {
  const response = await fetch('https://eo4i52he7vf9wt6.m.pipedream.net', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${await response.text()}`); // Include more info
  }

  return response.json();
}

export default function usePostMutation(): UseMutationResult<any, unknown, PostData> {
  const mutationOptions: UseMutationOptions<any, unknown, PostData> = {
    mutationFn: postData,
    onSuccess: (data) => {
      console.log('Data posted successfully:', data);
    },
    onError: (error: unknown, variables: PostData, context: unknown) => {
      if (error instanceof Error) {
        console.error('Error posting data:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    },
  };

  return useMutation(mutationOptions);
}