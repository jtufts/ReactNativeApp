import React, {Component} from 'react';
import {realm} from '../App'
import {Platform, StyleSheet, Text, View, Button, TextInput, ListView} from 'react-native';
import ToDos from './sub_components/ToDos';

export default class ShowToDos extends Component {

    static navigationOptions = {
      title: 'ShowToDos',
    };
  
    constructor(props){
      super(props);

      let ToDoListId = props.navigation.getParam('ToDoList', 0);
      this.state = {currentToDoListId: ToDoListId, currentToDoList: realm.objects('ToDoList').filtered('ToDoListId == $0', ToDoListId)[0]}

      console.log(this.state);
    }
  
    GoToThirdActivity = () =>
    {
       this.props.navigation.navigate('Third', {ToDoList: this.state.currentToDoList});
    }

    GoToFourthActivity = () =>
    {
      this.props.navigation.navigate('Fourth', {ToDoList: this.state.currentToDoList});
    }

    listenForChange = () => {
      console.log('Change Detected');
      this.setState({currentToDoList: realm.objects('ToDoList').filtered('ToDoListId == $0', this.state.currentToDoListId)[0]});
    }
  
    // componentDidMount(){
    //   this.changeSub = this.props.navigation.addListener(
    //     'didFocus',
    //     () => {this._sub = realm.addListener('change', this.listenForChange)}
    //   );
    //   this.removeChangeSub = this.props.navigation.addListener(
    //     'didBlur',
    //     () => {realm.removeListener('change', this.listenForChange)}
    //   );
    // }

    componentWillUnmount(){
      this.changeSub.remove();
      this.removeChangeSub.remove();
    }

    // const willBlurSubscription = this.props.navigation.addListener(
    //   'willBlur',
    //   realm.addListener('change', this.listenForChange)
    // );

    // const willFocusSubscription = this.props.navigation.addListener(
    //   'willFocus',
    //   realm.addListener('change', this.listenForChange)
    // );

    onTitleChange(text){
      console.log('Changing Title...');
      realm.write(() => {
        this.state.currentToDoList.ToDoListTitle = text;
      });
    }
    render() {
        console.log('Re-rendering ShowToDos...');
        let ToDoList = this.state.currentToDoList;
        // console.log(ToDoList.ToDoList);
      return (
        <View style={styles.container}>
          <View style={{height: '10%', width: '100%', backgroundColor: ToDoList.theme.headerColorHex}}>
          <TextInput style={styles.toDoListTitle} onChangeText={(text) => this.onTitleChange(text)} editable={true} >{ToDoList.ToDoListTitle}</TextInput>
          </View>
          <View style={{height: '80%', width: '100%', backgroundColor: ToDoList.theme.backgroundColorHex}}>
          <ToDos undeletedToDos={ToDoList.ToDoList} theme={ToDoList.theme} />
          </View>
          <View style={styles.addButton}>
          <Button title='ADD' color={ToDoList.theme.buttonColorHex} onPress={
            this.GoToThirdActivity
         } />
         </View>
         <View style={styles.addButton} >
           <Button title='CHANGE THEME' color={ToDoList.theme.buttonColorHex} onPress={
             this.GoToFourthActivity
           } />
         </View>
        </View>
      );
  }
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      height: '100%',
      width: '100%',
      // marginHorizontal: '100%',
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
      flex: 1
    },
    toDoListStruckThrough: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
      fontSize: 20,
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid'
    },
    Title: {
      height: '10%',
      width: '100%',
      backgroundColor: 'steelblue',
      // marginHorizontal: '100%',
      // marginVertical: '10%'
    },
    allToDos: {
      height: '80%',
      width: '100%',
      backgroundColor: 'powderblue',
      // marginHorizontal: '100%',
      // marginVertical: '80%'
    },
    addButton: {
      height: '5%',
      width: '100%',
      // marginHorizontal: '100%',
      // marginVertical: '10%'
    },
    toDoListTitle: {
      fontSize: 40,
      textAlign: 'center',
      color: 'white',
    }
  });