import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import PerfumeServico from '../servico/perfume_servico'
import Icon from 'react-native-vector-icons/Ionicons'
import { Perfume } from '../modelo/perfume'


// métodos da home
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.findAllPerfume()
    }

    state = {
        perfume: Perfume,
        lista_array_dados_perfume: [],
        value: null,
        Id_pesquisar: null,
        onChangeText: null,
        formularioId: null,
        formularioNome: null,
        formularioAroma: null,
        formularioCategoria: null,
        formularioMarca: null,
        formularioDescricao: null
    }

    //acionado quando o componente e montado
    componentDidMount() {
        this.instanciarPerfume();
        this.findAllPerfume();
    }

    //escuta atualizações na lista
    componentDidUpdate(prevProps, prevState) {
        if (prevState.lista_array_dados_perfume !== this.state.lista_array_dados_perfume) {
            this.findAllPerfume();
        }
    }

    findAllPerfume = () => {
        PerfumeServico.findAll()
            .then((response: any) => {
                this.setState({
                    lista_array_dados_perfume: response._array,
                    isLoading: false,
                })
            }), (error) => {
                console.log(error);
            }
    }


    deletePerfume = (id) => {
        this.findPerfumeById(id)
        if (this.state.formularioId != null || this.state.formularioId != undefined) {
            PerfumeServico.deleteById(id)
            Alert.alert("Perfume excluído com sucesso")
        }
    }

    atualizaPerfume = (item0, item1, item2, item3, item4, item5) => {
        let perfume = new Perfume()// cria objeto memória
        perfume.id = item0 
        perfume.nome = item1 
        perfume.aroma = item2 
        perfume.categoria = item3 
        perfume.marca = item4
        perfume.descricao = item5 
        // com o valor(state) do item

        PerfumeServico.updateByObjeto(perfume).then((response: any) => {
            if (response._array.length > 0 && response != null && response != undefined) {
                // popular o objeto da memória
                Alert.alert("Atualizado");

            } else {
                Alert.alert("Perfume não encontrado")
            }
        }), (error) => {
            console.log(error);
        }
    }


    insertPerfume = (item1, item2, item3, item4, item5) => {
        let perfume = new Perfume()// cria objeto memória
        perfume.nome = item1 
        perfume.aroma = item2 
        perfume.categoria = item3 
        perfume.marca = item4
        perfume.descricao = item5 
        // com o valor(state) do item

        // cria um id no banco para persistir o objeto
        const insertId = PerfumeServico.addData(perfume);
        // testa pra ver se deu certo a criação do id
        if (insertId == null || insertId == undefined) {
            Alert.alert("Não foi possivel inserir o novo perfume")
        }
        return perfume
    }

    instanciarPerfume = () => {
        let perfume: Perfume = new Perfume()// cria objeto memória
        return perfume
    }



    findPerfumeById = (id) => {
        PerfumeServico.findById(id)
            .then((response: any) => {
                if (response._array.length > 0 && response != null && response != undefined) {
                } else {
                    Alert.alert("Id não encontrado")
                }
            }), (error) => {
                console.log(error);
            }
    }

    localizaPerfume = (id) => {
        PerfumeServico.findById(id)
            .then((response: any) => {
                if (response._array.length > 0 && response != null && response != undefined) {
                    let perfumepesquisa: Perfume = new Perfume()// cria objeto memória
                    const perfumeretorno = response._array.map((item, key) => {
                        perfumepesquisa.id = item.id;
                        perfumepesquisa.nome = item.nome;
                        perfumepesquisa.aroma = item.aroma;
                        perfumepesquisa.categoria = item.categoria;
                        perfumepesquisa.marca = item.marca;
                        perfumepesquisa.descricao = item.descricao;
                    })
                    // o SetState abaixo mostra para o usuário o objeto recuperado do banco
                    // e atualmente somente em memória 

                    this.setState({
                        perfume: perfumepesquisa,
                        formularioId: perfumepesquisa.id,
                        formularioNome: perfumepesquisa.nome,
                        formularioAroma: perfumepesquisa.aroma,
                        formularioCategoria: perfumepesquisa.categoria,
                        formularioMarca: perfumepesquisa.marca,
                        formularioDescricao: perfumepesquisa.descricao,
                    })
                    // popular o objeto da memória
                    //Alert.alert("Atualizado"); 
                } else {
                    Alert.alert("Não foi possível atualizar")
                }
            }), (error) => {
                console.log(error);
            }
    }
    // fim da parte de funções

    //renderização da tela (visão)
    render() {

        //extrai as propriedades entre chaves
        const { perfume, lista_array_dados_perfume, value, Id_pesquisar, formularioId, formularioNome, formularioAroma, formularioCategoria, formularioMarca, formularioDescricao } = this.state;
        

        const perfumeList = lista_array_dados_perfume.map((item, key) => {
            return (
                <View key={item.id}>
                    <Text>id:{item.id} nome:{item.nome} aroma:{item.aroma} categoria:{item.categoria} marca:{item.marca} descricao:{item.descricao}</Text>
                </View>
            )
        })

        return (

            <View style={styles.container}>

                <Text style={{ fontSize: 20, paddingBottom: 20 }}>Crud de Perfumes</Text>

                <TextInput
                    placeholder="Digite o Id para pesquisar"
                    style={styles.textInput}
                    onChangeText={Id_pesquisar => { this.setState({ Id_pesquisar: Id_pesquisar }) }}
                    value={Id_pesquisar}
                />

                <Text>{formularioId}</Text>


                <TextInput
                    placeholder="Digite o nome do perfume"
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioNome => { this.setState({ formularioNome: formularioNome }) }}
                    value={formularioNome}
                />

                <TextInput
                    placeholder="Digite o aroma "
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioAroma => { this.setState({ formularioAroma: formularioAroma }) }}
                    value={formularioAroma}

                />

                <TextInput
                    placeholder="Digite a categoria "
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioCategoria => { this.setState({ formularioCategoria: formularioCategoria }) }}
                    value={formularioCategoria}

                />

                <TextInput
                    placeholder="Digite a marca "
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioMarca => { this.setState({ formularioMarca: formularioMarca }) }}
                    value={formularioMarca}

                />

                <TextInput
                    placeholder="Digite a descrição "
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioDescricao => { this.setState({ formularioDescricao: formularioDescricao }) }}
                    value={formularioDescricao}

                />

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { formularioNome == null ? Alert.alert("O campo de nome do perfume não pode ser vazio") : this.insertPerfume(formularioNome, formularioAroma, formularioCategoria, formularioMarca, formularioDescricao) }} style={{ alignItems: "center", backgroundColor: 'pink' }}>
                        <Icon name="md-add" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { formularioId == null ? Alert.alert("Não tem Objeto para atualizar faça uma pesquisa") : this.atualizaPerfume(formularioId, formularioNome, formularioAroma, formularioCategoria, formularioMarca, formularioDescricao) }} style={{ alignItems: "center", backgroundColor: 'pink' }}>
                        <Icon name="md-refresh" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { Id_pesquisar == null ? Alert.alert("O campo de id não pode ser vazio") : this.localizaPerfume(Id_pesquisar) }} style={{ alignItems: "center", backgroundColor: 'pink' }}>
                        <Icon name="md-search" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { formularioId == null ? Alert.alert("O campo de id não pode ser vazio") : this.deletePerfume(Id_pesquisar) }} style={{ alignItems: "center", backgroundColor: 'pink' }}>
                        <Icon name="md-remove" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                {perfumeList}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textInput: {
        alignItems: "center",
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    containerTouch: {
        width: 200,
        padding: 10
    }
});