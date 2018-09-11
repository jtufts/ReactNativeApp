import React, {Component} from 'react';
import Realm, { schemaVersion } from 'realm';
import {realm} from '../../App'
import { Button } from 'react-native';
import uuid from 'uuid/v1';

export default class NewListButton extends Component{

    createNewToDoList = () => {
        //console.log("Hello!");
        realm.write(() => {
            console.log('Creatinbg New To-Do list...');
            realm.create('ToDoList', {
              ToDoListTitle: "New To-Do List",
              ToDoListId: uuid(),
              theme: realm.objects('ToDoListTheme')[0],
             })
            }
           )
    }

    render()
    {
        return(
        <Button title='NEW LIST' onPress={this.createNewToDoList} />
        );
    }
}