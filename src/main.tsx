import { NextUIProvider } from "@nextui-org/react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Auth from "./pages/auth"
import { AuthGuard } from "./features/user/authGuard"
import HomePage from "./pages/homepage"
import Layout from "./components/Layout"

const container = document.getElementById("root")

const router = createBrowserRouter([
  { path: "/auth", element: <Auth /> },
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "", element: <HomePage /> }],
  },
])

if (container) {
  const root = createRoot(container)

  root.render(
    <Provider store={store}>
      <NextUIProvider>
        <AuthGuard>
          <RouterProvider router={router} />
        </AuthGuard>
      </NextUIProvider>
    </Provider>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
