import '../styles/globals.css'
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit";

function MyApp({ Component, pageProps }) {
  return (

    <MoralisProvider
      appId={process.env.appId}
      serverUrl={process.env.serverUrl}>
        <NotificationProvider>
      <Component {...pageProps} />
      </NotificationProvider>
    </MoralisProvider>

  )
}
export default MyApp
