import { ActivityIndicator, StatusBar, StyleSheet, Text, TouchableOpacity, View, Appearance, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import FlashMessage, { showMessage } from "react-native-flash-message";
import { auth } from "../../firebase_config";
import { sendEmailVerification, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Register = () => {
  const theme = Appearance.getColorScheme();
  const navigation = useNavigation();
  const [email, set_email] = useState();
  const [password, set_password] = useState();
  const [password_confirm, set_password_confirm] = useState();
  const [loading, set_loading] = useState(false);

  const [error_text, set_error_text] = useState(null);

  // email hesabı oluşturulması için kullanılan method
  async function create_email(email, password) {
    set_error_text(null);
    set_loading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(auth.currentUser);
      navigation.replace('login');
    } catch (e) {

      if (e == 'FirebaseError: Firebase: Error (auth/invalid-email).')
        set_error_text('Girdiğiniz email geçerli bir email değildir!');

      else if (e == 'FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).')
        set_error_text('Güçlü bir şifre girin!');

      else if (e == 'FirebaseError: Firebase: Error (auth/email-already-in-use).')
        set_error_text('Böyle bir hesap zaten bulunuyor giriş yapın!');

      else
        set_error_text('Bilinmeyen bir hata meydana geldi internet bağlantınızı kontrol edebilir veya bir süre sonra tekrar deneyebilirsiniz!');

    }
    set_loading(false);
  }

  useEffect(() => {
    if (error_text != null) {
      showMessage({
        message: "Hata!",
        description: error_text,
        type: "danger",
      })
      set_error_text(null);
    }
  }, [error_text]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Register</Text>
      <TextInput style={{ width: '80%', backgroundColor: 'yellow', height: 50, paddingLeft: 20, borderRadius: 15, marginTop: 10 }} placeholder='Email' value={email} onChangeText={(v) => set_email(v)} />
      <TextInput style={{ width: '80%', backgroundColor: 'yellow', height: 50, paddingLeft: 20, borderRadius: 15, marginTop: 10 }} placeholder='password' value={password} onChangeText={(v) => set_password(v)} secureTextEntry />
      <TextInput style={{ width: '80%', backgroundColor: 'yellow', height: 50, paddingLeft: 20, borderRadius: 15, marginTop: 10 }} placeholder='password confirm' value={password_confirm} onChangeText={(v) => set_password_confirm(v)} secureTextEntry />
      <TouchableOpacity
        onPress={() => {
          if (email && password === password_confirm)
            create_email(email, password);
          else
            showMessage({
              message: "Uyarı!",
              description: "Lütfen gerekli alanları doldurun",
              type: "warning",
            })
        }}

        style={{ width: '30%', backgroundColor: 'darkblue', borderRadius: 10, marginTop: 20, height: 50, justifyContent: 'center', alignItems: 'center' }}
      >
        {
          loading ?
            <ActivityIndicator size={'large'} /> :
            <Text style={{ color: 'white' }}>
              create account
            </Text>
        }
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 10 }} onPress={() => navigation.navigate('login')}>
        <Text style={{ color: 'blue', textDecorationLine: 'underline', fontSize: 17 }}>
          Create account
        </Text>
      </TouchableOpacity>
      <StatusBar barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme == 'dark' ? '#000' : '#fff'} />
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({})