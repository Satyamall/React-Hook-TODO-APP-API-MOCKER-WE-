import { useState } from "react";


export default function TodoInput({onTask}){

    const [text,setText]=useState("");

    const handleChange=(e)=>{
        setText(e.target.value);
    }

    const handleCLick=()=>{
       onTask && onTask(text)
        setText("");
    }

    return (
        <div>
            <input type="text"
             placeholder="Add Something..."
             value={text} 
             onChange={handleChange}
            />
            <button onClick={handleCLick}>+</button>
        </div>
    )
}