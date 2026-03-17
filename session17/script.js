const todos = [
{ id: 1, task: "Mua bánh chưng", done: false },
{ id: 2, task: "Dọn nhà đón Tết", done: false },
{ id: 3, task: "Gói bánh chưng", done: false },
{ id: 4, task: "Trang trí nhà cửa", done: false }
]

const list = document.getElementById("todoList")

function renderTodos(){

list.innerHTML=""

todos.forEach(todo=>{

let div = document.createElement("div")

div.className="todo"

div.innerHTML=`

<div class="task">
<span class="icon">🌸</span>
<span>${todo.task}</span>
</div>

<div class="status">
${todo.done ? "Hoàn thành" : "Chưa làm"}
</div>

`

list.appendChild(div)

})

}

function saveFirstTime(){

if(!localStorage.getItem("myTodos")){

localStorage.setItem("myTodos",JSON.stringify(todos))

}

}

renderTodos()
saveFirstTime()