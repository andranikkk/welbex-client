/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/user/userSlice"
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react"
import { BASE_URL } from "../../constants"

const CardProfile = () => {
  const current = useSelector(selectCurrent)

  if (!current) {
    return null
  }

  const { name, email, imageUrl } = current

  return (
    <Card className="py-4 w-[250px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Image
          alt="Card Profile"
          className="object-cover rounded-xl"
          src={`${BASE_URL}${imageUrl}`}
          width={370}
        />
      </CardHeader>
      <CardBody className="flex flex-row justify-between items-center">
        <div className="max-w-5/12 overflow-x-hidden">
          <h4 className="font-bold text-large mb-2">{name}</h4>
          <p className="text-default-500 flex items-center gap-2">{email}</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardProfile
