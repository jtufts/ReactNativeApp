import React, {Component} from 'react';
import {realm} from '../../App'
import {Platform, StyleSheet, Text, View, Button, TextInput, ListView, FlatList} from 'react-native';

export default class ToDos extends Component{
  constructor(props){
      super(props);

      console.log(props);
  }
  render(){
      console.log("Re-rendering...");
      return(
          <View style={styles.container}>
             <FlatList style={{flex: 1}}
              data={ this.props.undeletedToDos }
              renderItem={({ item }) => {
                //console.log(item);
                return(
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={styles.ToDoListItemView}>
                      <Text style={item.completed ? styles.toDoListStruckThrough : styles.toDoList} > {item.title} </Text>
                    </View>
                    <View style={styles.buttonStyle}>
                      <Button
                        title={item.completed ? 'REOPEN' : 'COMPLETE'}
                        color={this.props.theme.buttonColorHex}
                        onPress={() => {
                          realm.write(() => {
                              item.completed = !item.completed;
                          })
                        }}
                      />
                    </View>
                    <View style={styles.buttonStyle}>
                      <Button
                        title='DELETE'
                        color={this.props.theme.buttonColorHex}
                        onPress={() => {
                            realm.write(() => {
                                realm.delete(item);
                            })
                        }}
                      />
                    </View>
                  </View>
                )
              }}
              keyExtractor={({item, index}) => {index}}
            />
          </View>
//           this.props.undeletedToDos.map(rowData =>(<View style={{flex: 1, flexDirection: 'row'}}>
//           <View style={styles.ToDoListItemView}>
//     <Text style={rowData.completed ? styles.toDoListStruckThrough : styles.toDoList} > {rowData.title} </Text>
//     </View>
//     <View style={styles.buttonStyle}>
//     <Button
//       title={rowData.completed ? 'REOPEN' : 'COMPLETE'}
//       onPress={() =>
//       {
//         realm.write(() => {
//           rowData.completed = !rowData.completed;
//         }
        
//         )
//       }
//     } 
//     />
//     </View>
//     <View style={styles.buttonStyle}>
//     <Button 
//       title='DELETE' 
//       onPress={() => 
//         {
//           realm.write(() => {
//             realm.delete(rowData);
//           }
          
//         )
//         // this.props.onChange();
//       }
//     } 

//     /> 
//     </View>
//   </View>))
)
} 
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#F5FCFF',
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
    ToDoListItemView: {
       flex: 8,
       height: 25
    },
    buttonStyle:{
       flex: 1
    }
  });