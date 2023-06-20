/**
   * Returns a encrypted password
   * @param {string} pass 
   * @returns 
   */

export const dataEncrypt = (pass:any) => {
    const crypto = require('crypto-js');
    const Securitykey = process.env.REACT_APP_SECURITY_KEY;
    const value = crypto.AES.encrypt(pass, Securitykey).toString()

    return value;

}
