import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  //! Add if we want to allow requests from other devices on the same network.
  //! We need to add the IP address of the device that is running the app, updated the env.local file and the OAuth application settings on GitHub.
  // allowedDevOrigins: ['localhost:3000', '192.168.1.52', '192.168.1.52:3000'],
};

export default nextConfig;
