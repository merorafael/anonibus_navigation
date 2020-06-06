import React from "react";
import { View } from "react-native";
import { Card, Button, Input } from "react-native-elements";

import { signIn } from '../../services/authentication'
import { AuthContext } from '../../context';

export default ({ navigation }) => {
  const { refreshSignInStatus } = React.useContext(AuthContext)

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSignIn = () => {
    signIn({ email, password })
      .then(() => refreshSignInStatus())
      .catch(error => alert(error.response.data.msg || 'Erro desconhecido'))
  }

  return (
    <View style={{ paddingVertical: 20 }}>
      <Card>
        <Input 
          label="E-mail"
          keyboardType='email-address'
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={value => setEmail(value.toLowerCase())}
          leftIcon={{ type: 'font-awesome', name: 'envelope' }} />
        <Input 
          label="Senha"
          secureTextEntry 
          placeholder="Digite sua senha"
          value={password}
          onChangeText={value => setPassword(value)}
          leftIcon={{ type: 'font-awesome', name: 'lock' }} />

        <Button
          title="Acessar" 
          onPress={() => handleSignIn()} />
        <Button 
          type="clear" 
          title="Criar Conta" 
          onPress={() => navigation.push("CreateAccount")} />
      </Card>
    </View>
  )
}
