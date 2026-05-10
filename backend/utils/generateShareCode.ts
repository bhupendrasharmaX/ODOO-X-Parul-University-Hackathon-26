import crypto from 'crypto';

const generateShareCode = (): string => {
  return crypto.randomBytes(4).toString('hex').toUpperCase();
};

export default generateShareCode;
