module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500

  res.status(statusCode).json({
    name: err.name,
    message: err.message,
    stack: err.stack
  })
}
