const handleError = (res, error) => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "An unexpected error occurred"
  });
};

module.exports = handleError;