import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button, Card } from 'react-native-elements';
import { AuthContext } from '../../context';
import { signOut, getUserData, getAvatar, uploadAvatar } from '../../services/authentication';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

export default () => {
  const { refreshSignInStatus } = React.useContext(AuthContext)

  const [avatar, setAvatar] = React.useState('')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')

  getUserData().then((userData) => {
    setName(userData.name)
    setEmail(userData.email)
  })

  getAvatar().then((userAvatar) => {
    setAvatar(userAvatar)
  }).catch(error => {
    if (error.response.status === 401) {
      alert('Sessão perdida, favor realizar login novamente')
      signOut().then(() => { refreshSignInStatus() })
    }
  })

  escolherImagem = async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!image.cancelled) {
        const imageCompressed = await ImageManipulator.manipulateAsync(
          image.uri,
          [{ resize: { width: 200, height: 200 } }],
          { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
        )

        uploadAvatar(imageCompressed.uri).then(() => {
          setAvatar(imageCompressed.uri)
        }).catch(error => {
          if (error.response.status === 401) {
            alert('Sessão perdida, favor realizar login novamente')
            signOut().then(() => { refreshSignInStatus() })
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.avatarView}>
          <Avatar
            source={{ uri: avatar }}
            rounded 
            size="xlarge"
            onPress={() => { escolherImagem() }}
          />
          <Button 
            title="Enviar avatar" 
            type="clear"
            onPress={() => { escolherImagem() }} 
          />
        </View>

        <Text style={styles.profileProperty}>NOME:</Text>
        <Text style={styles.profileValue}>{ name }</Text>
        <Text style={styles.profileProperty}>E-MAIL:</Text>
        <Text style={styles.profileValue}>{ email }</Text>
        
        <Button 
          buttonStyle={styles.buttonStyle}
          title="Logout" 
          onPress={() => {
            signOut().then(() => { refreshSignInStatus() })
          }} 
        />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  avatarView: { 
    justifyContent: "center", 
    alignItems: 'center', 
    marginBottom: 30 
  },
  container: {
    paddingVertical: 20
  },
  button: {
    marginTop: 20
  },
  profileProperty: {
    fontSize: 14,
    color: "#41414d",
    fontWeight: "bold"
  },
  profileValue: {
    marginTop: 0,
    fontSize: 15,
    marginBottom: 24,
    color: "#737380"
  }
});

