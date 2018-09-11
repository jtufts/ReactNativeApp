import React, {Component} from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default class ToDoListView extends Component{
    GoToToDoList = () => {
        console.log(this.props.ToDoList.ToDoListId);
        this.props.navigation.navigate('Second', {ToDoList: this.props.ToDoList.ToDoListId});
    }

    render(){
        return(
        <TouchableOpacity onPress={this.GoToToDoList}>
            <Text style={{fontSize: 40, color: this.props.ToDoList.theme.headerColorHex}}>{this.props.ToDoList.ToDoListTitle}</Text>
        </TouchableOpacity>
        );
    }    
}

const styles = StyleSheet.create({
  toDoListButton: {
      fontSize: 40
  }
});