import React from "react";
import { View } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import { createAccount } from '../../services/authentication';

export default ({ navigation }) => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      throw new Error('Preencha todos os campos obrigatórios')
    } else if (password.length < 6) {
      throw new Error('Sua senha deverá possuir no mínimo 6 digitos')
    } else if (password !== confirmPassword) {
      throw new Error('Senhas não conferem')
    } else {
      try {
        await createAccount({
          name,
          email,
          password
        })
      } catch (error) {
        throw new Error(error.response.data?.msg || 'Erro desconhecido')
      }
    }
  }

  return (
    <View style={{ paddingVertical: 20 }}>
      <Card>
        <Input 
          label="Nome"
          placeholder="Digite seu nome"
          onChangeText={value => setName(value)}
          value={name}
          leftIcon={{ type: 'font-awesome', name: 'id-card' }} />
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
        <Input 
          label="Confirmar senha"
          secureTextEntry 
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChangeText={value => setConfirmPassword(value)}
          leftIcon={{ type: 'font-awesome', name: 'lock' }} />

        <Button
          buttonStyle={{ marginTop: 20 }}
          backgroundColor="#03A9F4"
          title="Criar conta"
          onPress={() => {
            handleSignUp().then(() => navigation.navigate("SignIn")).catch((error) => alert(error.message));
          }}
        />
      </Card>
    </View>
  )
}
