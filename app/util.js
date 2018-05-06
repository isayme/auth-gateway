module.exports.asyncWrap = asyncFunc => {
  const md = function (req, res, next) {
    asyncFunc(req, res)
      .then(next)
      .catch(next)
  }

  Object.defineProperty(md, 'name', { value: asyncFunc.name, writable: false })

  return md
}
