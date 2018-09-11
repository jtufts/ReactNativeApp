import React, {Component} from 'react';
import {realm} from '../App'
import {Platform, StyleSheet, Text, View, Button, TextInput, ListView, FlatList} from 'react-native';

export default class ColorPicker extends Component{

    static navigationOptions = {
      title: 'ColorPicker',
    };

    constructor(props)
    {
      super(props);

      this.state = { ToDoList: props.navigation.getParam('ToDoList'), ToDoListId: props.navigation.getParam('ToDoList').ToDoListId, AllThemes: realm.objects('ToDoListTheme') }
    }

    changeTheme(item)
    {
        console.log(this.state);
        console.log('Changing Theme...');
        realm.write(() => {
          console.log('Theme Change Started...');
          realm.create('ToDoList', {...this.state.ToDoList, theme: item}, true);
          // this.state.ToDoList.theme = item;
          console.log('Theme Change Successful!');
        });
    }

    GoToSecondActivity()
    {
        this.props.navigation.navigate('Second', {ToDoList: this.state.ToDoList});
    }

    render(){
        console.log(this.state.AllThemes);
        return(
          <View>
            <FlatList
              data={this.state.AllThemes}
              renderItem={({item}) => {
                  console.log(item);
                return(
                  <View style={{height: 100, width: '100%', backgroundColor: item.headerColorHex, alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 10}}>
                    <View style = {{height: 75, width: '75%', backgroundColor: item.backgroundColorHex, alignItems: 'center', justifyContent: 'center'}}>
                      <View style = {{height: 25, width: '50%'}}>
                        <Button 
                          title={item.themeName}
                          color={item.buttonColorHex}
                          onPress={(item) => {this.changeTheme(item)}}
                        />
                      </View>
                    </View>
                  </View>
                )
              }}
              keyExtractor={({item, index}) => {index}}
            />
            <Button title='OK' />
          </View>
        );
    }
}