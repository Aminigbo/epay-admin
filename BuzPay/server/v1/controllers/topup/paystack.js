'use strict'

const https = require('https')


const Paystack = (API_KEY) =>{


  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/charge',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    }
  }

  const chargeCard = (card = {}) =>{
    options.path = '/charge'
    const params = JSON.stringify(card)
    return new Promise((resolve, reject) => {

      const request = https.request(options, incomingMessage => {

          // Response object.
          let response = ''

          // Collect response body data.
          incomingMessage.on('data', chunk => {
              response += chunk;
          });

          // Resolve on end.
          incomingMessage.on('end', () => {
              if (response) {
                  try {
                      response = JSON.parse(response);
                  } catch (error) {
                      // Silently fail if response is not JSON.
                  }
              }

              resolve(response);
          });
      });

      // Reject on request error.
      request.on('error', error => {
          reject(error);
      });

      // Write request body if present.
      if (params) {
          request.write(params);
      }

      // Close HTTP connection.
      request.end();
  })
   }
   
  const submitOTP = (transactionOtp = {}) =>{
    options.path = '/charge/submit_otp'
    const params = JSON.stringify(transactionOtp)
    return new Promise((resolve, reject) => {

      const request = https.request(options, incomingMessage => {

          // Response object.
          let response = ''

          // Collect response body data.
          incomingMessage.on('data', chunk => {
              response += chunk;
          });

          // Resolve on end.
          incomingMessage.on('end', () => {
              if (response) {
                  try {
                      response = JSON.parse(response);
                  } catch (error) {
                      // Silently fail if response is not JSON.
                  }
              }

              resolve(response);
          });
      });

      // Reject on request error.
      request.on('error', error => {
          reject(error);
      });

      // Write request body if present.
      if (params) {
          request.write(params);
      }

      // Close HTTP connection.
      request.end();
  })
  }

  const submitPIN = (transactionPin = {}) =>{
    options.path = '/charge/submit_pin'
    const params = JSON.stringify(transactionPin)
    return new Promise((resolve, reject) => {

      const request = https.request(options, incomingMessage => {

          // Response object.
          let response = ''

          // Collect response body data.
          incomingMessage.on('data', chunk => {
              response += chunk;
          });

          // Resolve on end.
          incomingMessage.on('end', () => {
              if (response) {
                  try {
                      response = JSON.parse(response);
                  } catch (error) {
                      // Silently fail if response is not JSON.
                  }
              }

              resolve(response);
          });
      });

      // Reject on request error.
      request.on('error', error => {
          reject(error);
      });

      // Write request body if present.
      if (params) {
          request.write(params);
      }

      // Close HTTP connection.
      request.end();
  })
  }

  return { chargeCard: chargeCard, submitOTP: submitOTP, submitPIN: submitPIN}

}

module.exports = Paystack