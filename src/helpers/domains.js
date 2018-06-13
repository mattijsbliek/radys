const dev = process.env.NODE_ENV === 'development';

export const IMAGE_PROXY_URL = dev
  ? 'http://images.radys.localhost:8090'
  : 'https://images.radys.co';
