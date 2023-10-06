import React from 'react'
import { StyleSheet, Text, TextInput, Button, View, TouchableOpacity } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements'

export default class HomeScreen extends React.Component{
    
    getWord=(word)=>{
        var searchKeyword=word.toLowerCase()
        var url = 'https://rupinwhitehatjr.github.io/dictionary/'+searchKeyword+'.json'
        console.log(url)

        return fetch(url)
        .then((data)=>{
            if(data.status===200)
            {
                return data.json()
            }
            else
            {
                return null
            }
        })
        .then((response)=>{
            var responseObject = response

            if(responseObject)
            {
                var wordData = responseObject.definitions[0]

                var definition = wordData.description
                var lexicalCategory = wordData.wordtype

                this.setState({
                    'word' : this.state.text,
                    "definition" : definition,
                    "lexicalCategory" : lexicalCategory
                })
            }
            else 
            {
                this.setState({
                    "word": this.state.text,
                    "definition" : 'Not Found'
                })
            }
            
        })
    }
    
    render(){
        return(
            <SafeAreaProvider style={styles.container}>
                <View>
                    <Header centerComponent={{ text: 'Dictionary App', style: { color: '#fff' } }}/>
                    
                    <TextInput
                    style={styles.inputBox}
                    onChangeText={text => {
                        this.setState({ 
                            text: text,
                            isSearchPressed: false,
                            word: "Loading...",
                            lexicalCategory: '',
                            examples: [],
                            definition: ''
                         });
                    }}
                
                    />
                    <TouchableOpacity
                    style={styles.searchButton}
                    onPress={()=> {
                        this.setState({ isSearchPressed: true})
                        this.getWord(this.state.text)
                    }}
                    ><Text>Click me</Text></TouchableOpacity>

                </View>

                <View style = {styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                        Word: {''}
                    </Text>
                    <Text style = {{fontSize: 18}}>
                        {this.state.word}
                    </Text>
                </View>

                <View style = {styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                        Type: {''}
                    </Text>
                    <Text style = {{fontSize: 18}}>
                        {this.state.lexicalCategory}
                    </Text>
                </View>

                <View style = {{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Text style = {styles.detailsTitle}>
                        Definition: {''}
                    </Text>
                    <Text style = {{fontSize: 18}}>
                        {this.state.definition}
                    </Text>
                </View>
            </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifiyContent: 'center',
      alignItems: 'center'
    },
    inputBox: {
        borderColor: '#000000',
        borderWidth: 3,
        marginTop: 100,
        marginRight: 100,
        marginLeft: 100,
        height: 40
    },
    searchButton: {
        backgroundColor: '#FFAA33',
        margin: 75,
        marginRight: 100,
        marginLeft: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        borderRadius: 15,
        
    },
    detailsContainer: {
        flex: 1,
        margin: 0
    },
    detailsTitle: {
        flex: 1,
        margin: 0
    }
})