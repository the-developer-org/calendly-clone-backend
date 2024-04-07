const { logger } = require('../config/logger');
class Util {
  constructor() {
    this.message = null;
    this.statusCode = null;
    this.type = null;
    this.data = null;
  }
  /**
   * Log error using the Logger
   */
  logError() {
    logger.error({
      message: this.message,
      statusCode: this.statusCode,
      type: this.type,
    });
  }

  /**
   * Setting success
   * @param {*} data - Data
   * @param {String} message - Message
   * @param {number} statusCode - Status code
   */
  setSuccess(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = 'success';
  }

  /**
   * Setting error
   * @param {number} statusCode - Status code
   * @param {String} message - Message
   */
  setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'error';
  }

  /**
   * Send data to client
   * @param {{
   * status:Function,
   * req:{user:{dataValues:{id:Number}}, originalUrl:String, _parsedUrl:{query:String}, body:Object}
   * }} res - Response
   * @returns {Object}
   */
  send(res) {
    const result = {
      message: this.message,
      status: this.type,
      data: this.data,
    };

    if (this.type === 'success') {
      return res.status(this.statusCode).json(result);
    }

    return res.status(this.statusCode).json({
      status: this.type,
      message: this.message,
    });
  }
}

module.exports = Util;
