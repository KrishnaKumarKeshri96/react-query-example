import React, { Fragment, useState } from 'react'
import { useQuery,useMutation,useQueryClient } from 'react-query';
import { deleteTodos, getTodos, patchTodos, postTodos } from '../api/todosApi';

const TodoMain = () => {
    const [newTodo,setNeewTodo] = useState('');
    const queryClient = useQueryClient();
    const {isLoading,isError,error,data:todosList} = useQuery('todos',getTodos,{select:(data)=>data.sort((a,b)=>b.id-a.id)});
    const addMutation = useMutation(postTodos,{
        onSuccess:()=>{
            //Invalidate Cache & Refetch
            queryClient.invalidateQueries('todos')
        }
    })

    const updateMutation = useMutation(patchTodos,{
        onSuccess:()=>{
            //Invalidate Cache & Refetch
            queryClient.invalidateQueries('todos')
        }
    })
    const deleteMutation = useMutation(deleteTodos,{
        onSuccess:()=>{
            //Invalidate Cache & Refetch
            queryClient.invalidateQueries('todos')
        }
    })

    const handleSubmit = ()=>{
        addMutation.mutate({title:newTodo,completed:false})
        setNeewTodo('')

    }

    const handleChange = (e)=>{
setNeewTodo(e.target.value)
    }


    if(isLoading) return <h1>Loading...</h1>
    if(isError) return <h1>Error...</h1>


  return (
    <div>
       <input value={newTodo} onChange={handleChange} type="text" placeholder='add your todo' />
       <button onClick={handleSubmit}>Add Todo</button>

      <h1> Your Todos</h1>

      {todosList?.map(({id,title,completed})=>
      <div  key={id} style={{display:'flex',"justifyContent":'space-between','alignItems':'center'}}>
          <input type="checkbox" checked={completed}  onChange={()=>
updateMutation.mutate({id,title,completed:!completed})
          }/>
          <div>{title}</div>
          <button onClick={()=>deleteMutation.mutate(id)}>delete</button>
           </div>
 )}
    </div>
  )
}

export default TodoMain