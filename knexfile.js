module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'blog-test',
      user:     process.env.USER,
      password: '',
    },
  },
};
