import React, {useState, useRef, useEffect} from 'react'
import "../styles/Todo.css"
import {auth, database} from "../config/firebase"   

const Todo = () => {
    const [todos, setTodos] = useState([])

    const newTodo = useRef()


    useEffect(() => {
        const dbRef = database.ref("Todo"+localStorage.getItem("POMOTODO-USER-UID"))
        dbRef.on('value', snapshot => {
            const todosVal = snapshot.val()
            let list = []

            for (const id in todosVal) {
                list.push({id, ...todosVal[id]})
            }
            setTodos(list)
        })
    }, [])

    const addTodo = () => {
        let input = newTodo.current.value
        let email = auth.currentUser.email
        
        const dbRef = database.ref("Todo"+localStorage.getItem("POMOTODO-USER-UID"))

        if (input != "") {
            const newObj = {
                todo: input,
                user: email
            }

            dbRef.push(newObj)

            dbRef.on('value', snapshot => {
                const todosVal = snapshot.val()
                let list = []
    
                for (const id in todosVal) {
                    list.push({id, ...todosVal[id]})
                }
                setTodos(list)
            })
        }
            
        newTodo.current.value = ""
    }

    const deleteTodo = (id) => {
        const dbRef = database.ref("Todo"+localStorage.getItem("POMOTODO-USER-UID"))

        dbRef.child(id).remove()
        
        dbRef.on('value', snapshot => {
            const todosVal = snapshot.val()
            let list = []

            for (const id in todosVal) {
                list.push({id, ...todosVal[id]})
            }
            setTodos(list)
        })
    }

    return (
        <div className="todoContainer">
            <div className="todoCard">
                <div className="inputContainer">
                    <input ref={newTodo} className="todoInput" placeholder="Add a new Todo..." type="text" />
                    <button onClick={addTodo} className="addButton">Add</button>
                </div>
                <div className="todosContainer">
                    {
                        todos.map(item => (
                            <div onClick={() => deleteTodo(item.id)} className="todoElem" key={item.todo}>{item.todo}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Todo

