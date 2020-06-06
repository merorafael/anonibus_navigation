import axios from 'axios'
import * as Crypto from 'expo-crypto';
import { AsyncStorage } from 'react-native';
import decode from 'jwt-decode'

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

const signOut = async () => {
  onSignOut()
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

const getUserData = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return token ? decode(token) : {};
}

const isSignedIn = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return (token !== null);
};

const convertBlobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = () => {
      resolve(reader.result)      
    }
  })
}

const uploadAvatar = async (avatarUri) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  const response = await fetch(avatarUri);
  const blob = await response.blob();
  const base64 = await convertBlobToBase64(blob)

  try {
    const response = await httpClient.put('/profile/avatar', {
      avatar: base64
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    throw error
  }  
}

const getAvatar = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);

  try {
    const response = await httpClient.get('/profile/avatar', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data.avatar
  } catch (error) {
    throw error
  }  
}

export { signIn, signOut, isSignedIn, createAccount, getUserData, getAvatar, uploadAvatar }