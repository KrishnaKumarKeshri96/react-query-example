import axios from "axios";

const todosApi = axios.create({
    baseURL:'http://localhost:3001/'
})

export const getTodos = async()=>{
    const data =await todosApi.get('/todos')
    
    return data.data

}

export const patchTodos = async(todo)=>{
    const data = await todosApi.patch(`/todos/${todo.id}`,todo)
    return data.data

}
export const postTodos = async(todo)=>{
    const data =await todosApi.post('/todos',todo)
    return data.data

}

export const deleteTodos = async(id)=>{
    const data = await todosApi.delete(`/todos/${id}`,id)
    return data.data

}