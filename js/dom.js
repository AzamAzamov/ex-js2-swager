let box = document.querySelector(".box")
let tbody = document.querySelector(".tbody")
import { deleteUser, addDialog, editDialog } from "./api.js"

let addForm = document.querySelector(".addForm")
let editModal = document.querySelector(".editModal")
let editForm = document.querySelector(".editForm")
let close = document.querySelector(".close")
let closeInfo = document.querySelector(".closeInfo")
let getInfo = document.querySelector(".getInfo")
let add = document.querySelector(".add")


let Id = document.querySelector(".Id")
let Name = document.querySelector(".Name")
closeInfo.onclick = () => {
    getInfo.close()
}
add.onclick = () => {
    editModal.close()
}
let idx = null

close.onclick = () => {
    editModal.close()
}


function OpenInfo(data, i) {
    getInfo.showModal()
    Id.innerHTML = data.id
    Name.innerHTML = data.name
}

addForm.onsubmit = (event) => {
    event.preventDefault()

    let form = event.target

    let addUser = {
        name: form["addName"].value
    }
    addDialog(addUser)
}

function opneEditModal(user) {
    editModal.showModal()
    editForm["editName"].value = user.name
    idx = user.id
}



editForm.onsubmit = (event) => {
    event.preventDefault()
    let form = event.target
    let editUser = {
        name: form["editName"].value,
        id: idx
    }

    editDialog(editUser, idx)
    editModal.close()
}

export default function getData(data) {
    tbody.innerHTML = ""
    data.forEach((e, i) => {
        let tr = document.createElement("tr")
        let id = document.createElement("td")
        id.innerHTML = i + 1
        let name = document.createElement("td")
        name.innerHTML = e.name

        let info = document.createElement("td")
        let status = document.createElement("button")
        status.innerHTML = "👁️"
        status.onclick = (el) => {
            OpenInfo(e)
        }
        info.append(status)
        let action = document.createElement("td")
        action.classList.add("action")
        let delBtn = document.createElement("button")
        delBtn.innerHTML = "✏️ Delete"
        delBtn.onclick = () => {
            deleteUser(e.id)
        }
        let editBtn = document.createElement("button")
        editBtn.innerHTML = "Edit"

        editBtn.onclick = () => {
            opneEditModal(e)
        }
        action.append(editBtn, delBtn)
        tr.append(id, name, info, action)
        tbody.append(tr)
    })
}