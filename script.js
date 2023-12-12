let form = document.getElementById("form");
let inp = document.getElementById("inp");
let inpAge = document.getElementById("inp-age");
let inp2 = document.getElementById('inp2')
let btn = document.getElementById("btn");
let data = document.getElementById("data");
// Modal
let editModal = document.getElementById('editModal');
let closeModal = document.querySelector('.modal__close');
let editModalForm = document.querySelector('.edit__todo__form form');
let editInput = document.getElementById('editInput');

let baza = [];

form.addEventListener("submit", (event) => {
    event.preventDefault()
    create();
    form.reset()
})

editModalForm.addEventListener("submit", function(event){
    event.preventDefault()
    let inpValue = editInput.value.trim();
    const todoId = +editInput.dataset.todoId;
    // form.reset()
    updateEditedData(editInput.value, todoId)
})

function updateEditedData(editInp, id){
    const todoIndex = baza.findIndex((todoId) => {
        return todoId.id === id;
    })
    baza[todoIndex].name = editInp
    hide()
    localStorage.setItem("baza", JSON.stringify(baza))
    read()
}
closeModal.addEventListener("click",()=>{
    hide()
})
function showModal(todoText, todoId){
    editModal.style.display = "block"
    editInput.value = todoText
    editInput.dataset.todoId = todoId
}

function hide(){
    editModal.style.display = "none"
}

let id = 1

function create() {
    baza.push({
        name: inp.value,
        ball:inp2.value,
        id:id++
    })
    localStorage.setItem("baza", JSON.stringify(baza))
    read()
}

function editFc(id) {
    const editId = baza.find((todoId)=>{
        return todoId.id === id
    });
    showModal(editId.name, id)
}

function deleteFc(id) {
    const idx = baza.findIndex((todoId) => {
        todoId.id === id
    })

    baza.splice(idx, 1)
    localStorage.setItem("baza", JSON.stringify(baza))
    read()
}


function read() {
    data.innerHTML = ""
    baza.sort((a,b)=>{
        return b.ball - a.ball
    })
    baza.map((item,idx) => {
        data.innerHTML += `
    <td>${idx}</td>
    <td>${item.name}</td>
    <td>${item.ball}</td>
    <td><i onclick="editFc(${item.id})" class="fas fa-edit"></i></td>
    <td><i onclick="deleteFc(${item.id})" class="fas fa-trash-alt"></i></td>
        `
    })
}


(function () {
    baza = JSON.parse(localStorage.getItem("baza")) || []
    read()
})()