/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useState } from "react"
import { useSelector } from "react-redux"

import { selectCurrent } from "../../features/user/userSlice"
import { useGetAllPostsQuery } from "../../app/services/postApi"
import { Button } from "@nextui-org/react"
import AddPost from "../../components/AddPost"
import PostCard from "../../components/CardPost"
import CardProfile from "../../components/CardProfile"

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const current = useSelector(selectCurrent)
  const { data } = useGetAllPostsQuery()

  const onClose = () => setIsOpen(false)

  return (
    <div className="flex gap-2 relative justify-between">
      <div className="border-1 w-full rounded-2xl p-2">
        <b>Newest posts: </b>
        <div className="flex flex-wrap justify-center gap-5 pt-4">
          {data?.map(post => {
            return (
              <div key={post.id}>
                <PostCard
                  id={post.id}
                  content={post.content}
                  mediaUrl={post.mediaUrl}
                  userId={post.authorId}
                  authorImg={post.author.imageUrl}
                  authorName={post.author.name}
                  createdAt={post.createdAt}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {current && (
          <>
            <CardProfile />

            <Button color="primary" onPress={() => setIsOpen(true)}>
              Add post
            </Button>
          </>
        )}
        <AddPost isOpen={isOpen} onClose={onClose} />
      </div>
    </div>
  )
}

export default HomePage
