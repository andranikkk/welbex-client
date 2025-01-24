import type React from "react"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
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
  const { handleSubmit, control, setValue } = useForm<Post>({
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
        const formData = new FormData()
        formData.append("id", postId)
        formData.append("content", data.content || "")
        if (data.mediaUrl) {
          const fileInput = (
            document.getElementById("mediaUrl") as HTMLInputElement
          )?.files?.[0]
          if (fileInput) {
            formData.append("mediaUrl", fileInput)
          }
        }

        await editPost(formData).unwrap()
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
                <Controller
                  name="mediaUrl"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label htmlFor="mediaUrl">Media:</label>
                      <input
                        type="file"
                        id="mediaUrl"
                        onChange={e => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setValue("mediaUrl", file.name)
                          }
                        }}
                      />
                      {field.value && (
                        <div className="mt-2">
                          <p>Current file: {field.value}</p>
                        </div>
                      )}
                    </div>
                  )}
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
