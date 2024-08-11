module.exports = {
  future: {
    webpack5: true,   
  },

  reactStrictMode: true,
  outputFileTracing: false,

  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,  

      fs: false,
    };
    
    return config;
  },
};