const config = {
  client: {
    entry: '../src/index.js',
    output: '../dist',
    port: 8831
  },
  server: {
    entry: '../src/server-entry.js',
    output: '../dist'
  },
}

module.exports = config
