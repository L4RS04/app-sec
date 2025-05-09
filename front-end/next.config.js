const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false
      };
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all routes
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self';
              style-src 'self';
              img-src 'self' data:;
              connect-src 'self' http://localhost:3000/;
            `.replace(/\s{2,}/g, ' ').trim(), // Minify the CSP
          },
        ],
      },
    ];
  },
};