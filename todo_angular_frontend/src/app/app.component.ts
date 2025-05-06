import { Component, OnInit } from "@angular/core"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  todos: Array<any> = []

  baseUrl: string = "http://localhost:3000/todos"

  //Properties to Bind with Create Form
  createTitle: string = ""
  createBody: string = ""

  //Properties to Bind with Create Form
  editTitle: string = ""
  editBody: string = ""
  editId: number = 0

  //Function to Grab list of todos
  async getTodos() {
    const response = await fetch(this.baseUrl)
    const data = await response.json()
    this.todos = await data
  }

  //takes data from form and creates new todo
  async createTodo() {
    await fetch(this.baseUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: this.createTitle,
        body: this.createBody,
      }),
    })
    //update todo list and reset form
    this.getTodos()
    this.createTitle = ""
    this.createBody = ""
  }

  editSelect(todo) {
    this.editId = todo.id
    this.editTitle = todo.title
    this.editBody = todo.body
  }

  //takes data from form and updates new todo
  async updateTodo() {
    await fetch(this.baseUrl + "/" + this.editId, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: this.editTitle,
        body: this.editBody,
      }),
    })
    //update todo list and reset form
    this.getTodos()
    this.editTitle = ""
    this.editBody = ""
    this.editId = 0
  }


  //takes data from form and deletes todo
  async deleteTodo(todo) {
    await fetch(this.baseUrl + "/" + todo.id, {
      method: "delete",
    })
    //update list of todos
    this.getTodos()
  }



  //this function runs when the component loads
  ngOnInit() {
    this.getTodos()
  }
}
