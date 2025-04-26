let API = "https://to-dos-api.softclub.tj/api/categories"
import getData from "./dom.js";

let globalData = [];

export default async function get() {
    try {
        const { data } = await axios.get(API)
        console.log(data.data);
        globalData = data.data;
        getData(globalData)
    } catch (error) {
        console.log(error);
    }
}

export async function deleteUser(id) {
    try {
        await axios.delete(`${API}?id=${id}`)
        get()
    } catch (error) {
        console.log(error);
    }
}

export async function addDialog(user) {
    try {
        await axios.post(API, user)
        get()
    } catch (error) {
        console.log(error);
    }
}

export async function editDialog(user) {
    try {
        await axios.put(API, user)
        get()
    } catch (error) {
        console.log(error);
    }
}

let search = document.querySelector(".search")

search.oninput = () => {
    let filteredData = globalData.filter((e) =>
        e.name.toLowerCase().includes(search.value.toLowerCase())
    );
    getData(filteredData);
};
