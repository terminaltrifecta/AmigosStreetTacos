import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

export interface PostData {
    "customer_first_name": string,
    "customer_last_name": string,
    "email": string,
    "phone_number": string,
    "location_id": number,
    "time_placed": string,
    "time_requested": string,
    "location": string,
    "is_pickup": true,
    "status_id": number,
    "cart": [
        {
            "item_name": "Carne Asada Taco",
            "quantity": 3,
            "comments": "Garlic on da side!"
        },
        {
            "item_name": "Chorizo Taco",
            "quantity": 2,
            "comments": "errrxtra garlic chile!"
        }
    ]

}

async function postData(data: PostData) {
  const response = await fetch('http://127.0.0.1:5000/api', {
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