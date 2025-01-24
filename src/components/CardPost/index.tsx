/* eslint-disable @typescript-eslint/no-restricted-imports */
import { CiEdit } from "react-icons/ci"
import { RiDeleteBinLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react"

import { selectCurrent } from "../../features/user/userSlice"
import { useDeletePostMutation } from "../../app/services/postApi"
import { hasError } from "../../utils/hasError"
import { useState } from "react"
import dayjs from "dayjs"
import EditPost from "../EditPost"
import { BASE_URL } from "../../constants"

type Props = {
  id: string
  content: string
  mediaUrl?: string
  userId?: string
  authorImg?: string | undefined
  authorName?: string | undefined
  createdAt: Date
}

const PostCard: React.FC<Props> = ({
  id,
  content,
  mediaUrl,
  userId,
  authorImg,
  authorName,
  createdAt,
}) => {
  dayjs.locale("en")
  const [error, setError] = useState("")
  const currentUser = useSelector(selectCurrent)
  const [deletePost] = useDeletePostMutation()

  const [isOpen, setIsOpen] = useState(false)

  const handleOpenModal = () => setIsOpen(true)
  const handleCloseModal = () => setIsOpen(false)

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id).unwrap()
    } catch (error) {
      if (hasError(error)) {
        setError(error.data.error)
      } else {
        setError(error as string)
      }
    }
  }

  return (
    <>
      <Card className="py-4 w-[295px]">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
          <p className="text-sm text-default-400">
            {dayjs(createdAt).format("D MMMM YYYY, HH:mm")}
          </p>
        </CardHeader>
        <CardBody className="flex items-center">
          {mediaUrl && (
            <img
              src={`${BASE_URL}${mediaUrl}`}
              alt={`${content}`}
              width={50}
              className="w-full"
            />
          )}
          <p>{content}</p>
        </CardBody>
        <CardHeader className="justify-between items-center bg-transparent">
          <div className="flex items-center gap-3 cursor-pointer w-full">
            <Image
              src={`${BASE_URL}${authorImg}`}
              alt={`${content}`}
              width={50}
              className="rounded-full mr-3"
            />
            <p>{authorName}</p>
          </div>
          {userId === currentUser?.id && (
            <div className="flex gap-2">
              <button onClick={handleOpenModal}>
                <CiEdit size={25} color="blue" />
              </button>
              <button onClick={() => handleDelete(id)}>
                <RiDeleteBinLine color="red" size={25} />
              </button>
            </div>
          )}
        </CardHeader>
      </Card>
      <EditPost
        isOpen={isOpen}
        onClose={handleCloseModal}
        content={content}
        mediaUrl={mediaUrl}
        postId={id}
      />
    </>
  )
}

export default PostCard
