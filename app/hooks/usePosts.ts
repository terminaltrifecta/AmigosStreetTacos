import { useQuery } from '@tanstack/react-query'

type Post = {
  id: number
  title: string
  body: string
}

const fetchPosts = async (limit = 10): Promise<Array<Post>> => {
  const response = await fetch('http://127.0.0.1:5000')
  const data = await response.json()
  return data.filter((x: Post) => x.id <= limit)
}

const usePosts = (limit: number) => {
  return useQuery({
    queryKey: ['posts', limit],
    queryFn: () => fetchPosts(limit),
  })
}

export { usePosts, fetchPosts }
