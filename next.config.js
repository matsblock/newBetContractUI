/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    serverUrl: 'https://xc4523c2n4fg.usemoralis.com:2053/server',
    appId: '7wiEaBIUm1SfiJqBchJntoETEYLOuuqdKNJyk0X2'
    
  },
  images: {
    domains: ['picsum.photos', 'logodownload.org','uxwing.com','cdn-icons-png.flaticon.com'],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.ignoreWarnings = [
      {
        message: /(magic-sdk|@walletconnect\/web3-provider|@web3auth\/web3auth)/,
      }
      
    ]
    return config
  },


}

module.exports = nextConfig