import React, { useEffect, useState } from 'react';
import { View, Text, Alert, Button, TextInput } from 'react-native';
import messaging from '@react-native-firebase/messaging';


const [token, setToken] = useState(null);

useEffect(() => {
    const requestPermission = async () => {
        try {
            const authStatus = await messaging().requestPermission();
        } catch (error) {
            //pass
        }
    };

    const getToken = async () => {
        try {
            const token = await messaging().getToken();
            setToken(token);
        } catch (error) {
            //pass
        }
    };

    messaging().onMessage(async remoteMessage => {
        Alert.alert('📩 Yeni Bildirim', remoteMessage.notification?.title);
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
        //pass
    });

    requestPermission();
    getToken();
}, []);
