/** @type {import('next').NextConfig} */
const nextConfig = {
	// Your existing Next.js configuration goes here
	reactStrictMode: true, // Example configuration
	// Add any other Next.js configurations you have
};

import withPWA from 'next-pwa';

const pwaConfig = withPWA({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development',
});

export default pwaConfig(nextConfig);
