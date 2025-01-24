export type User = {
  id: string
  email: string
  password: string
  name: string
  imageUrl?: string
  createdAt: Date
  updatedAt: Date
  posts: Post[]
}

export type Post = {
  id: string
  content: string
  mediaUrl?: string
  author: User
  authorId: string
  createdAt: Date
  updatedAt: Date
}
