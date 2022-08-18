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
}

module.exports = nextConfig