import React, { useState, useEffect } from 'react';
import {View, Image} from 'react-native';
import { Avatar, Button, Card } from 'react-native-elements';

import * as ImagePicker from 'expo-image-picker';

export default () => {
  const [imagem, setImagem] = useState(null);

  uploadImagem = async (uri) => {
    setImagem(uri)
    //const response = await fetch(uri);
    //const blob = await response.blob();
    //const filename = new Date().getTime();
    //console.log(blob)

    //var ref = firebase.storage().ref().child('upload/' + filename);

    //ref.put(blob).then(function (snapshot) {

      //snapshot.ref.getDownloadURL().then(function (downloadURL) {
      //  setImagem(downloadURL)
      //})

    //})
  }

  escolherImagem = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        uploadImagem(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View>
      <Card>
        {imagem &&
          <Avatar rounded size="xlarge" source={{ uri: imagem }} />
        }
        <Button title="Escolher Imagem" onPress={() => { escolherImagem() }} />
      </Card>
    </View>
  )

}
