import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Main = () => {
  const [user_data, set_user_data] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetch_data = async () => {
      set_user_data(JSON.parse(await AsyncStorage.getItem('user')));
    };

    fetch_data();
  }, []);

  async function cikis() {
    await AsyncStorage.removeItem('user');
    navigation.replace('login');
  }

  if (user_data != null) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hoşgeldiniz! {user_data.email}</Text>
        <Image source={{ uri: user_data.photoUrl }} style={{ width: 100, height: 100 }} />
        <TouchableOpacity onPress={async () => { cikis() }}>
          <Text>Çıkış</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

export default Main

const styles = StyleSheet.create({})