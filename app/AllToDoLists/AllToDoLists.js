import React, {Component} from 'react';
import Realm, { schemaVersion } from 'realm';
import {realm} from '../App'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import NewListButton from './sub_components/NewListButton'
import ToDoListView from './sub_components/ToDoListView'
            // function mkRenderToDoListView(props) { 
            //   function renderToDoListView(ToDoList) {
            //     return (
            //       <ToDoListView ToDoList={ToDoList} {...props} />
            //     )
            //   }
            
            //   return renderToDoListView
            // }

export default class AllToDoLists extends Component{
    static navigationOptions = {
        title: 'AllToDoLists',
    };

    constructor()
    {
        super();

        this.state = {data: realm.objects('ToDoList')};
    }

    // componentDidMount(){
    //     this.changeSub = this.props.navigation.addListener(
    //       'didFocus',
    //       () => {this._sub = realm.addListener('change', () => {this.setState({data: realm.objects('ToDoList')})})}
    //     );
    //     this.removeChangeSub = this.props.navigation.addListener(
    //       'didBlur',
    //       () => {realm.removeListener('change', () => {this.setState({data: realm.objects('ToDoList')})})}
    //     )
    // }

    componentWillUnmount(){
      this.changeSub.remove();
      this.removeChangeSub.remove();
    }

    render()
    {
        return(
        <View style={styles.container} >
          {this.state.data.map(ToDoList => 
               <ToDoListView ToDoList={ToDoList} {...this.props} />
            )
          }
          {/* {this.state.data.map(mkRenderToDoListView(this.props))} */}
          <NewListButton />
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
    },
    toDoListButton: {
        fontSize: 40
    }
  });