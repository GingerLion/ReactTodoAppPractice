import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './components/Todos';
import Header from './components/layouts/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import './App.css';
//import uuid from 'uuid';
import axios from 'axios';

class App extends Component {
  state = {
    todos : [
      
    ]
  } 
  // runs when component mounts
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    //promise | res has a data attribute
    .then(res => this.setState({ todos: res.data }))
  }
  // Toggle Todo Item
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    })})
  }
  // Delete Todo Item
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todos: [...this.state.todos.filter(
      todo => todo.id !== id
    )]}));
  }
  // Add Todo
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: title,
      completed : false
    }) // post request data doesnt get saved on their server but they send back the title and completed with extra info like id
    .then(res => this.setState({
      todos: [...this.state.todos, res.data]
    }));
  }
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo = {this.addTodo}/>
                <Todos todos={this.state.todos} markComplete={this.markComplete}
                  delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path ="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
