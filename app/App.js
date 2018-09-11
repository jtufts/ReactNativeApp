/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Realm, { schemaVersion } from 'realm';
import { createStackNavigator } from 'react-navigation';
import AddToDo from './AddToDo/AddToDo';
import ShowToDos from './ShowToDos/ShowToDos';
import AllToDoLists from './AllToDoLists/AllToDoLists';
import ColorPicker from './ColorPicker/ColorPicker';
import uuid from 'uuid/v1';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


realm = new Realm({
  schema: [{name: 'ToDoList', primaryKey: 'ToDoListId', properties: {ToDoList: 'ToDoListItem[]', ToDoListId: 'string', ToDoListTitle: 'string', theme: 'ToDoListTheme'}}, {name:'ToDoListItem', primaryKey: 'id', properties: {title: 'string', id: 'string', completed: 'bool', deleted: 'bool'}}, {name:'ToDoListTheme', primaryKey: 'id', properties: {themeName: 'string', id: 'string', headerColorHex: 'string', backgroundColorHex: 'string', buttonColorHex: 'string'}}],
  schemaVersion: 19,
  migration: (oldRealm, newRealm) => {
    if(oldRealm.schemaVersion < 19)
    {
      
      let newRealmToDoLists = newRealm.objects('ToDoList');
      let oldRealmToDoLists = oldRealm.objects('ToDoList');
      
      newRealm.delete(newRealm.objects('ToDoListTheme'));

      newRealm.create('ToDoListTheme', {
        themeName: 'Blue',
        headerColorHex: 'steelblue',
        backgroundColorHex: 'powderblue',
        buttonColorHex: 'cyan',
        id: uuid()    
      })

      newRealm.create('ToDoListTheme', {
        themeName: 'Red',
        headerColorHex: 'darkred',
        backgroundColorHex: 'lightpink',
        buttonColorHex: 'red',
        id: uuid()
      })

      for(let i = 0; i < oldRealmToDoLists.length; i++)
      {
        newRealmToDoLists[i].ToDoList = oldRealmToDoLists[i].ToDoList;
        newRealmToDoLists[i].ToDoListId = oldRealmToDoLists[i].ToDoListId;
        newRealmToDoLists[i].ToDoListTitle = oldRealmToDoLists[i].ToDoListTitle;
        newRealmToDoLists[i].theme = oldRealmToDoLists[i].theme;
        newRealmToDoLists[i].theme = newRealm.objects('ToDoListTheme')[0];
      }
    }
  }
})

export {realm};

export default Project = createStackNavigator(
  {
   First: { screen: AllToDoLists },
   
   Second: { screen: ShowToDos },

   Third: { screen: AddToDo },

   Fourth: { screen: ColorPicker },
  });
