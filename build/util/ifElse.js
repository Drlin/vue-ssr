const execIfFunc = x => (typeof x === 'function' ? x() : x);

module.exports = (condition) => {
  return (then, or) => (execIfFunc(condition) ? execIfFunc(then) : execIfFunc(or));
}
