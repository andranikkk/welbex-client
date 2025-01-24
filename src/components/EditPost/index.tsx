import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type { Post } from "../../app/types"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react"
import { hasError } from "../../utils/hasError"
import { useEditPostMutation } from "../../app/services/postApi"
import ErrorMessage from "../ErrorMessage"
import CustomInput from "../Input/Input"

type Props = {
  isOpen: boolean
  onClose: () => void
  content: string
  mediaUrl?: string
  postId: string
}

const EditPost: React.FC<Props> = ({
  isOpen,
  onClose,
  content,
  mediaUrl,
  postId,
}) => {
  const [editPost, { isLoading }] = useEditPostMutation()
  const [error, setError] = useState("")

  const { handleSubmit, control } = useForm<Post>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      content,
      mediaUrl,
    },
  })

  const onSubmit = handleSubmit(async data => {
    try {
      if (postId) {
        await editPost({
          id: postId,
          content: data.content,
          mediaUrl: data.mediaUrl,
        }).unwrap()

        onClose()
      }
    } catch (error) {
      if (hasError(error)) {
        setError(error.data.error)
      }
    }
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="text-foreground">
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit post</ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                <CustomInput
                  control={control}
                  name="content"
                  label="Content"
                  type="text"
                />
                <CustomInput
                  control={control}
                  name="mediaUrl"
                  label="Media URL"
                  type="text"
                />
                <ErrorMessage error={error} />
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Save
                  </Button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default EditPost
