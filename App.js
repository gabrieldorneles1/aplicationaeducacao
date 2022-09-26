import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button} from 'react-native';
import { ScrollView } from 'react-native-web';
import { api, config, } from './services/api';

export default function App() {

  const [data, setData] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataIni, setDataIni] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [equipe, setEquipe] = useState('');
  const [alterar,setAlterar] = useState('');

  useEffect(() => {
    api.get("/api/rest/projects", config)
      .then((response) => {
        setData(response.data.projects);
      })
      .catch((erro) => {
        console.log(erro)
      })
  }, []);

  function excluiItem(id) {
    api.delete(`/api/rest/projects/${id}`, config)
      .then((response) => {
        alert('Item excluído com sucesso!');
        api.get("/api/rest/projects", config)
          .then((response) => {
            setData(response.data.projects);
          })
          .catch((erro) => {
            console.log(erro)
          })
      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  function atualizar(id) {
    if (titulo != '' && descricao != '' && dataIni != '' && dataFim != '' && equipe != '') {
      const obj = {
        "id": id,
        "object":{
        "title": titulo,
        "description": descricao,
        "start_date": dataIni,
        "expected_end_date": dataFim,
        "amount_people": equipe
        }
        }
        api.put(`/api/rest/projects/`,obj, config)
          .then(() => {
            alert('Item alterado com sucesso!');
            api.get("/api/rest/projects", config)
              .then((response) => {
                setData(response.data.projects);
              })
              .catch((erro) => {
                console.log(erro)
              })
          })
          .catch((erro) => {
            console.log(erro)
          })
    } else {
      alert('Campos vazios! Por favor, insira algo!')
      
    }
  }

  function incluir(){
    if (titulo != '' && descricao != '' && dataIni != '' && dataFim != '' && equipe.toString() != '') {
      const object = {"object":{
      "title": titulo,
      "description": descricao,
      "start_date": dataIni,
      "expected_end_date": dataFim,
      "amount_people": equipe.toString()
      }}
      api.post(`/api/rest/projects/`,object, config)
        .then(() => {
          alert('Projeto inserido!')
          api.get("/api/rest/projects", config)
            .then((response) => {
              setData(response.data.projects);
            })
            .catch((erro) => {
              console.log(erro)
            })
        })
        .catch((erro) => {
          console.log(erro)
        })
    }
    else{
      alert('Dados vazios! Por favor, insira algo!')
    }
  }

  return (
    <ScrollView style={{width: '100%'}}>
      <View>
        <Text style={styles.text}>Bem vindo a +A educação</Text>
        <Text style={styles.label}>Título:</Text>
        <TextInput style={styles.TextInput} defaultValue={titulo} onChangeText={setTitulo} />
        <Text style={styles.label}>Descrição:</Text>
        <TextInput style={styles.TextInput} defaultValue={descricao} onChangeText={setDescricao} />
        <Text style={styles.label}>Data Inicial:</Text>
        <TextInput style={styles.TextInput} defaultValue={dataIni} onChangeText={setDataIni} />
        <Text style={styles.label}>Data final:</Text>
        <TextInput style={styles.TextInput} defaultValue={dataFim} onChangeText={setDataFim} />
        <Text style={styles.label}>Equipe:</Text>
        <TextInput style={styles.TextInput} defaultValue={equipe} onChangeText={setEquipe} />
        <Button style={styles.button} title='Incluir'onPress={() => {incluir()}} />
    
        <Image source={require('./assets/image001.png')}
          style={styles.logo} />
        <View>
          {data.map((item) => {
            return (
              <View style={styles.listContainer} key={item.id}>
                <Text style={styles.label}>Título:</Text>
                <Text>{item.title}</Text>
                <Text style={styles.label}>Descrição:</Text>
                <Text>{item.description}</Text>
                <Text style={styles.label}>Data Inicial:</Text>
                <Text>{item.start_date}</Text>
                <Text style={styles.label}>Data Final:</Text>
                <Text>{item.expected_end_date}</Text>
                <Text style={styles.label}>Equipe:</Text>
                <Text>{item.amount_people}</Text>
                <Button style={styles.button} onPress={() => {alterar == ''? setAlterar(item.id) : setAlterar('')}} title='Alterar' />
                {alterar == item.id && 
                <View>
                <Text style={styles.label}>Título:</Text>
                <TextInput style={styles.TextInput} defaultValue={titulo} onChangeText={setTitulo} />
                <Text style={styles.label}>Descrição:</Text>
                <TextInput style={styles.TextInput} defaultValue={descricao} onChangeText={setDescricao} />
                <Text style={styles.label}>Data Inicial:</Text>
                <TextInput style={styles.TextInput} defaultValue={dataIni} onChangeText={setDataIni} />
                <Text style={styles.label}>Data final:</Text>
                <TextInput style={styles.TextInput} defaultValue={dataFim} onChangeText={setDataFim} />
                <Text style={styles.label}>Equipe:</Text>
                <TextInput style={styles.TextInput} defaultValue={equipe} onChangeText={setEquipe} />
                <Button style={styles.button} title='Atualizar'  onPress={() => {atualizar(item.id)}} />
              
                </View>
                }
                <Button style={styles.button} onPress={() => excluiItem(item.id)} title='Excluir' />
              </View>
            )
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: { width: 250, height: 150, margin: 45 },
  text: {fontSize: '25px', fontStyle: 'italic', margin: 10

  },
  TextInput: {
    height: 20,
    width: 350,
    marginTop: 3,
    marginBottom: 18,
    borderWidth: 1,
    borderRadius: '8px',
    backgroundColor: '#D3D3D3',
    borderColor: '#000000',
    padding: 5,
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
   
  },
  listContainer: {
    borderRadius: '16px',
    borderColor: 'black',
    borderWidth: '3px',
    width: '100%',
    marginTop: 25,
    marginBottom: 25,
    padding: '10px'
  },

  button: {
  marginTop: 10,

},
  flex: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
     
  }
})


