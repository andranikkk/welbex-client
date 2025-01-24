/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { CiLogin, CiLogout } from "react-icons/ci"
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"

import { logout, selectIsAuthenticated } from "../../features/user/userSlice"

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="text-inherit font-semibold text-xl">WelbeX</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        {isAuthenticated ? (
          <NavbarItem className="cursor-pointer ml-5">
            <Button
              color="default"
              variant="flat"
              className="gap-2"
              onClick={handleLogout}
            >
              <span>Log out</span> <CiLogout />
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem className="cursor-pointer ml-5">
            <Button
              color="default"
              variant="flat"
              className="gap-2"
              onClick={() => navigate("/auth")}
            >
              <span>Login / Register</span> <CiLogin />
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  )
}

export default Header
