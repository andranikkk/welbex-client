import type React from "react"
import { useCreatePostMutation } from "../../app/services/postApi"
import { Controller, useForm } from "react-hook-form"
import { hasError } from "../../utils/hasError"
import { useState } from "react"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react"
import ErrorMessage from "../ErrorMessage"

interface Props {
  isOpen: boolean
  onClose: () => void
}

const AddPost: React.FC<Props> = ({ isOpen, onClose }) => {
  const [error, setError] = useState("")
  const [createPost] = useCreatePostMutation()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const handleCreate = handleSubmit(async data => {
    try {
      await createPost({
        content: data.content,
        mediaUrl: data.mediaUrl,
      }).unwrap()
      setValue("Posts", "")

      onClose()
    } catch (error) {
      if (hasError(error)) {
        setError(error.data.error)
      }
    }
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">New post:</ModalHeader>
            <ModalBody>
              <form
                action=""
                className="flex flex-col gap-4"
                onSubmit={handleCreate}
              >
                <Controller
                  name="content"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Content is required" }}
                  render={({ field }) => (
                    <Input {...field} label="Content" type="text" />
                  )}
                />
                {errors.name && <ErrorMessage error={error} />}

                <Controller
                  name="mediaUrl"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input {...field} label="Media URL" type="text" />
                  )}
                />
                {errors.name && <ErrorMessage error={error} />}

                <Button type="submit" color="primary" fullWidth>
                  Create
                </Button>
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

export default AddPost
