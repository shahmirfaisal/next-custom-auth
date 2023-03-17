import "../styles/index.css"
import { UserContextProvider } from "../UserContext"

export default function App({ Component, pageProps }) {
  return (
    <UserContextProvider user={pageProps.user}>
      <Component {...pageProps} />
    </UserContextProvider>
  )
}
