console.log(process.env.API_PORT);

module.exports = {
  reactStrictMode: true,
  env: {
    API_PORT: process.env.NODE_ENV === 'production' ? '8042' : '8042',
  },
};
