import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'


let todoCounter = 0
function createNewTodo(text) {
  return {
    completed: false,
    id: todoCounter++,
    text
  }
}

class MList extends Component {
  state = {
    todos: [],
    inputText: ''
  }



  componentWillMount(){
    console.log(111111111111)
    
   /*  this.onNewTodo() */
  }
  onNewTodo() {
    this.setState({
      todos: [...this.state.todos, createNewTodo(this.state.inputText)]
    })
  }
  
  renderHeader(header){
    return <View>{header}</View>
  }

  renderFooter(){
    const todoList = [{id:1,text:1, completed:true}, {id:2, text:2, completed: false}, {id:3,text:3, completed: true}]
    const contain = todoList.map(todo=>{
      console.log('todo: ', todo);
      <View key={todo.id} id={todo.id} >
        <Text>{todo.text}</Text>
        <Text>{todo.completed}</Text>
      </View>
    })
    console.log('todoList', todoList)
    return <View>{contain}</View>
  }
  render() {
    return (
      <View>
        {/* {this.renderHeader('sjh')} */}
        {this.renderFooter()}
      </View>
    )
  }
}

export default MList