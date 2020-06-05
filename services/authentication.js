import axios from 'axios'
import * as Crypto from 'expo-crypto';
import { AsyncStorage } from 'react-native';

const TOKEN_KEY = "@anonibus:token";
const httpClient = axios.create({
  baseURL: 'http://192.168.0.5:3000'
})

const onSignIn = (token) => AsyncStorage.setItem(TOKEN_KEY, token);

const onSignOut = () => AsyncStorage.removeItem(TOKEN_KEY);

const signIn = async ({ email, password }) => {
  const encryptedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password,
  )

  try {
      const response = await httpClient.post('/login', {
          email,
          encryptedPassword
      })

      onSignIn(response.data.token)
  } catch (error) {
      throw error
  }
}

const createAccount = async ({ name, email, password }) => {
  const encryptedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password,
  )

  try {
      const response = await httpClient.post('/users', {
          name,
          email,
          encryptedPassword
      })

      return response.data
  } catch (error) {
      throw error
  }
}

const isSignedIn = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return (token !== null);
};

export { signIn, createAccount, isSignedIn }