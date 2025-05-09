import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCMz2fq2EPuhKXoJMY5qwdbzJbIXKpHOfM",
  authDomain: "meu-projeto-firebase-8fe73.firebaseapp.com",
  projectId: "meu-projeto-firebase-8fe73",
  storageBucket: "meu-projeto-firebase-8fe73.firebasestorage.app",
  messagingSenderId: "572810703688",
  appId: "1:572810703688:web:08ed9bf9050e5e6a49397d"
};

firebase.initializeApp(firebaseConfig);

import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';

export default function App(){
  const [nomes, setNomes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const nomesCollection = firebase.firestore().collection('Nomes');
      const snapshot = await nomesCollection.get();

      const data = [];
      snapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()});
      });
      setNomes(data);
    };

    fetchData();
  }, []);

  return(
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Lista de nomes:</Text>
      <FlatList
        data={nomes}
        keyExtractor={(item) => item.id}
        renderItem={({item}) =>(
          <View>
            <Text>{item.Nome} {item.Sobrenome}</Text>
          </View>
        )}
      />
    </View>
  );
}