import { keyboard } from '@testing-library/user-event/dist/keyboard';
import React, {useState} from 'react'; 
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Clipboard } from 'react-copy-to-clipboard';

export default function App() {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [urlFinal, setUrlFinal] = useState('');

  const short = async () =>{
    if(url.includes('https://') || url.includes('http://')){
      await fetch(`http://localhost:3001&short=${url}&name=${name}`)
      .then(async response => {
        const data = await response.json();
        if(data.url.status === 3){
          alert('Esse nome já esta em uso!')
          return;
        }
        if(data.url.status === 2){
          alert('url é invalida');
          return;
        }

        setUrlFinal(data.url);
        keyboard.dismiss();
      })
    }
  }

  function copyUrl(){
    Clipboard.setString(urlFinal);
    alert('Url copiada com sucesso!');
  }
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>url
            <Text style={{ color: '#1076f7'}}>One</Text> 
          </Text>
          <TextInput 
          style={styles.urlInput}
          onChangeText={ (texto) => setUrl(texto)} 
          value={url}
          placeholder="Digite a url..."
          />

          <TextInput 
          style={styles.urlInput}
          onChangeText={ (texto) => setName(texto)} 
          value={name}
          placeholder="Nome personalizado"
          />

          <TouchableOpacity onPress={() => short() } style={styles.shortBtn}>
            <Text style={{ color: '#FFF' }}>Encurtar</Text>
          </TouchableOpacity>

      <TouchableWithoutFeedback onPress={urlFinal ? copyUrl : () => {}}>
        <Text style={styles.finalUrl}>meulink</Text>
      </TouchableWithoutFeedback>

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    color: '#21243d',
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 20,
  },
  urlInput:{
    height: 50,
    width: '80%',
    borderColor:'#21243d',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
    fontSize: 20,
  },
  shortBtn:{
    backgroundColor: '#ff7c7c',
    borderRadius: 20,
    height: 40,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  finalUrl:{
    height: 40,
    width: '80%',
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
  }
})
