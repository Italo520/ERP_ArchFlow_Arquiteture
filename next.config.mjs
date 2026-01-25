/** @type {import('next').NextConfig} */
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  allowedDevOrigins: ['http://localhost:3000', 'http://192.168.0.37:3000'],
};



export default withPWA(nextConfig);
