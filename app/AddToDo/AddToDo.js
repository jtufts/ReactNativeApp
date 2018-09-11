import React, {Component} from 'react';
import Realm, { schemaVersion } from 'realm';
import {Text, View, Button, TextInput, StyleSheet } from 'react-native';
import uuid from 'uuid/v1'

export default class AddToDo extends Component{
    static navigationOptions = {
        title: 'AddToDo',
    };
  
    constructor(props) {
        super(props);
  
      this.state = {
        data: [], toDoToBeAdded: 'Write Your To-Do Here!', currentToDoList: props.navigation.getParam('ToDoList', [])
      };
    }
  
    componentDidMount(){
      const myData = realm.objects('ToDoList');
      this.setState({data: myData});
      // realm.addListener('change', () => {
      //   this.setState({data: realm.objects('ToDoList')});
      // });
    }
  
    saveToDo = () => {
      let myToDoList = this.state.currentToDoList;
      console.log(myToDoList);
        if(!myToDoList.ToDoList)
      {
           realm.write(() =>{
             console.log(myToDoList);
             myToDoList.ToDoList = {title: this.state.toDoToBeAdded, id: uuid(), completed: false, deleted: false};
           })
      }
      else
      {
      realm.write(() => {
        console.log(myToDoList);
        myToDoList.ToDoList.push({title: this.state.toDoToBeAdded, id: uuid(), completed: false, deleted: false});
      })
     }
    this.GoToSecondActivity()
    }
  
    GoToSecondActivity = () => {
      this.props.navigation.navigate('Second', {ToDoList: this.state.currentToDoList});
    }
  
    render()
    {
      return(
      <View style={styles.container}>
        <Text style={styles.toDoForm}> New To-Do </Text>
        <TextInput 
          style={styles.toDoFormInput} 
          onChangeText={(text) => this.setState({toDoToBeAdded: text})}
        >
          {this.state.toDoToBeAdded}
        </TextInput>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Button title = 'SUBMIT' onPress={
          this.saveToDo
        } />
        <Button title='CANCEL' onPress={
            this.GoToSecondActivity
         } />
         </View>
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    toDoFormInput: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    toDoForm: {
      textAlign: 'left',
      fontSize: 40,
    },
    toDoList: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
      fontSize: 20,
    },
    toDoListStruckThrough: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
      fontSize: 20,
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid'
    }
  });

