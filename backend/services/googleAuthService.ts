import User from '../models/User.ts';
import generateToken from '../utils/generateToken.ts';
import axios from 'axios';

export const googleLoginService = async (accessToken: string) => {
  // Verify the Google access token by fetching user info
  const { data } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!data || !data.email) {
    throw new Error('Invalid Google token');
  }

  const { email, name, sub: googleId } = data;

  // Find existing user or create a new one
  let user = await User.findOne({ email });

  if (!user) {
    // Create new user — no password needed for Google users
    user = await User.create({
      name: name || email.split('@')[0],
      email,
      // Generate a random unusable password for Google-only accounts
      password: `google_${googleId}_${Date.now()}`,
      role: 'user',
    });
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(String(user._id)),
  };
};
