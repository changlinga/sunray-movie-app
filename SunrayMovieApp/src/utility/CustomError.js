function CustomError(code = 0, message = null, title = null) {
  this.code = code;
  this.message = message;
  this.title = title;
}

export default CustomError;
