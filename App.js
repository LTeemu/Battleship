import { StatusBar, SafeAreaView } from 'react-native';
import React from 'react';
import Header from './components/Header';
import Gameboard from './components/Gameboard';
import Footer from './components/Footer';
import styles from './style/style';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      <Header/>
      <Gameboard/>
      <Footer/>
    </SafeAreaView>
  );
}

