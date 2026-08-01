const handleError = (res, error) => {
  console.error(new Date().toISOString(), error);

  //validation rules that failed
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: messages
    });
  }

  //adding a trip name that already exists
  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'A trip with that name already exists'
    });
  }

  res.status(500).json({
    success: false,
    message: "An unexpected error occurred"
  });
};

module.exports = handleError;