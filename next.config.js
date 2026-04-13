/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/service-1", destination: "/car-finance", permanent: true },
      {
        source: "/service-2",
        destination: "/boat-motorbike-caravan-loans",
        permanent: true,
      },
      {
        source: "/service-3",
        destination: "/commercial-vehicle-loan",
        permanent: true,
      },
      { source: "/service-4", destination: "/personal-loan", permanent: true },
      {
        source: "/service-5",
        destination: "/debt-consolidation-loans",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
