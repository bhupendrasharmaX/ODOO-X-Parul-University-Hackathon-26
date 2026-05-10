import User from '../models/User.ts';
import generateToken from '../utils/generateToken.ts';

export const registerUser = async (userData: any) => {
  const { name, email, password } = userData;
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password });
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(String(user._id)),
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(String(user._id)),
    };
  } else {
    throw new Error('Invalid email or password');
  }
};
