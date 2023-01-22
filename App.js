import { FlatList, SafeAreaView, StatusBar, StyleSheet, View, Text } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"
import { Nota } from "./src/componentes/Nota"
import { useEffect, useState } from "react"
import { buscaNotas, buscaNotasByCategoria, criaTabela } from "./src/servicos/Notas"
import { Picker } from "@react-native-picker/picker"

export default function App() {

  useEffect(() => {
    criaTabela()
    mostraNotas()
  }, [])
  
  const [notaSelecionada, setNotaSelecionada] = useState({})
  const [notas, setNotas] = useState([])
  const [categoria, setCategoria] = useState("Todos")
  
  async function mostraNotas() {
    
    const todasNotas = await buscaNotas()
    setNotas(todasNotas)
    console.log(todasNotas)
  }

  async function notasPorFiltro(novaCategoria){

    setCategoria(novaCategoria)
    if(novaCategoria == "Todos"){
      mostraNotas()
    }else{
      setNotas(await buscaNotasByCategoria(novaCategoria))
    }
  }
  
  return (
    
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        renderItem={(nota) => <Nota {...nota} setNotaSelecionada={setNotaSelecionada}/>}
        keyExtractor={nota => nota.id}
        ListHeaderComponent={() => {return (
          <View style={estilos.picker}>
            <Text style={estilos.modalSubTitulo}>Filtro por Categoria:</Text>
            <Picker
                selectedValue={categoria}
                onValueChange={(novaCategoria) => notasPorFiltro(novaCategoria)}>
                <Picker.Item label="Todos" value="Todos"/>
                <Picker.Item label="Pessoal" value="Pessoal"/>
                <Picker.Item label="Trabalho" value="Trabalho"/>
                <Picker.Item label="Outros" value="Outros"/>
            </Picker>
            </View>
        )}}/>
      <NotaEditor mostraNotas={mostraNotas} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada}/>
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#EEEEEE",
    margin: 16,
  },
  modalSubTitulo: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "600",
  },
})

