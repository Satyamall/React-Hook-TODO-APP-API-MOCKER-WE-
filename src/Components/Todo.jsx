import { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import {v4 as uuid} from 'uuid'

export default function Todo() {

    const [todos, setTodos] = useState([]);
    const [toggle,setToggle]=useState(false);
    const [page,setPage]=useState(1);
    const [loading,setLoading]=useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/tasks?_limit=3&_page=${page}`)
            .then(res => res.json())
            .then((res) => {
                setTodos([...res]);
                setLoading(false);
              })
            .catch((err) => {
                console.log(err);
              });
    },[page,toggle])

    const handleTask = async (title) => {
        const payload = {
            id: uuid(),
            title: title,
            status: "false"
        };
        await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
    }

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/tasks/${id}`, {
                method: "DELETE",
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleToggle=async(id,status)=>{
        try{
            var value = status==="false"? "true": "false"
            var payload = {
                status: value
            }
            await fetch(`http://localhost:3000/tasks/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            setToggle(toggle===true? false: true)           
        }
        catch(err){
            console.log(err);
        }
    }

    function handlePage(e){
        switch (e.target.name) {
            case "PREV":
                if (page===1) {
                    setPage(1)
                }else{
                    setPage((prevState) => prevState-1)
                }
                break;
        
            case "NEXT":
                todos.length<3?setPage((prevState) => prevState):setPage((prevState) => prevState+1)
                break;
        
            default:
                break;
        }
    }
    return (
        <div>
            <TodoInput onTask={handleTask} />
            {
              loading===true?<h1>Loading...</h1>:todos.map((todo) => {
                    return <TodoList
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        status={todo.status}
                        handleDelete={handleDelete}
                        handleToggle={handleToggle}
                    />
                })
            }

            {todos.length>0 && <h3>Page Count : {page}</h3>}
            
            {todos.length>0 && <div>
                <button name="PREV" color="blue" onClick={(e) => handlePage(e)}>PREV</button>
                <button name="NEXT" color="blue" onClick={(e) => handlePage(e)}>NEXT</button>
            </div>}
        </div>
    )
}