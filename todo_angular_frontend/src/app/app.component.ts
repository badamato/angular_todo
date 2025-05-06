import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: Array<any> = []

  baseUrl: string = "http://localhost:3000/todos"

  //properties to bind with create form
  createTitle: string = ""
  createBody: string = ""

  //function to get list of todos
  async getTodos() {
    const response = await fetch(this.baseUrl)
    const data = await response.json()
    this.todos = await data
  }

  //takes the date from the form and creates a new todo
  async createTodo() {
    console.log(this.createTitle, this.createBody)
    await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        title: this.createTitle,
        body: this.createBody
      }),
  })
  //updates todo list and resets form
  this.getTodos()
  this.createTitle = ""
  this.createBody = ""
  }

  //function runs when the component loads
  ngOnInit() {
    this.getTodos()
  }
}
