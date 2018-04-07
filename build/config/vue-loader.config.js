module.exports = () => {
  return {
    preserveWhitespace: false,
    cssModules: {
      localIdentName: '[path][name]---[local]---[hash:8]',
      camelCase: true
    }
  }
}
