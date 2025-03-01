import { ActivityIndicator, StatusBar, StyleSheet, Text, TouchableOpacity, View, Appearance } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { showMessage } from "react-native-flash-message";
import { auth } from "../../firebase_config";
import { sendEmailVerification, signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import * as Google from 'expo-auth-session/providers/google';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const theme = Appearance.getColorScheme();
  const navigation = useNavigation();
  const [email, set_email] = useState();
  const [password, set_password] = useState();
  const [loading, set_loading] = useState(false);
  const [password_attempt, set_password_attempt] = useState(3);

  const [error_text, set_error_text] = useState(null);
  const [danger_text, set_danger_text] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    //ios,web,android google cloud key
  });

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.idToken) {
      const { idToken } = response.authentication;
      const credential = GoogleAuthProvider.credential(idToken);
      signInWithCredential(auth, credential)
        .then((user) => AsyncStorage.setItem('user',JSON.stringify(user._tokenResponse))).finally(()=>navigation.replace('main'))
    }
  }, [response]);

  useEffect(() => {
    const fetch_data = async () => {
      const data = await AsyncStorage.getItem('user');
      if (data != null)
        navigation.replace('main');
    };
    fetch_data();
  }, []);

  // email hesabı oluşturulması için kullanılan method
  async function sign_email(email, password) {
    set_error_text(null);
    set_danger_text(null);
    set_loading(true);
    if (password_attempt != 0) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        if (!auth.currentUser.emailVerified) {
          await sendEmailVerification(auth.currentUser);
          set_danger_text('Email adresiniz doğrulanmamış.Doğrulama e-postası gönderilmiştir.Hesaba giriş yapabilmek için email adresinizi doğrulayın.');
        }
        else {
          await AsyncStorage.setItem('user', JSON.stringify(auth.currentUser));
          navigation.replace('main');
        }
      } catch (e) {
        console.log(e)
        if (e == 'FirebaseError: Firebase: Error (auth/invalid-email).')
          set_error_text('Girdiğiniz email geçerli bir email değildir!');

        else if (e == 'FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).')
          set_error_text('Güçlü bir şifre girin!');

        else if (e == 'FirebaseError: Firebase: Error (auth/invalid-credential).')
          set_error_text('Email veya şifre yanlış!');

        else
          set_error_text('Bilinmeyen bir hata meydana geldi internet bağlantınızı kontrol edebilir veya bir süre sonra tekrar deneyebilirsiniz!');

        set_password_attempt(password_attempt - 1);
      }
    }
    else
      set_error_text('Çok sayıda giriş yaptınız tekrar deneyebilmek için lütfen uygulamayı yeniden başlatın.');

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
    } else if (danger_text != null) {
      showMessage({
        message: "Uyarı!",
        description: danger_text,
        type: "warning",
      })
      set_danger_text(null);
    }
  }, [error_text, danger_text]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Login</Text>
      <TextInput style={{ width: '80%', backgroundColor: 'yellow', height: 50, paddingLeft: 20, borderRadius: 15, marginTop: 10 }} placeholder='Email' value={email} onChangeText={(v) => set_email(v)} />
      <TextInput style={{ width: '80%', backgroundColor: 'yellow', height: 50, paddingLeft: 20, borderRadius: 15, marginTop: 10 }} placeholder='password' value={password} onChangeText={(v) => set_password(v)} secureTextEntry />
      <TouchableOpacity
        onPress={() => {
          if (email && password)
            sign_email(email, password);
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
              signin account
            </Text>
        }
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 10 }} onPress={() => navigation.navigate('register')}>
        <Text style={{ color: 'blue', textDecorationLine: 'underline', fontSize: 17 }}>
          Create account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 10 }} onPress={() => { promptAsync() }}>
        <Text style={{ color: 'blue', textDecorationLine: 'underline', fontSize: 17 }}>
          Google login
        </Text>
      </TouchableOpacity>
      <StatusBar barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme == 'dark' ? '#000' : '#fff'} />
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})
