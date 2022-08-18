import '../styles/globals.css'
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit";

import {Moralis} from "moralis"


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
