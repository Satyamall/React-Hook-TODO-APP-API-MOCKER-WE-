

export default function TodoList({id,status,title,handleDelete,handleToggle}){
    return (
        <div>
            <span>{title} - </span>
            <span>{status} - </span>
            <button onClick={()=>handleToggle(id,status)}>Toggle</button>
            <button onClick={()=>handleDelete(id)}>X</button>
        </div>
    )
}