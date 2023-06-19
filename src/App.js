import React from "react";
import DateObject from "react-date-object";
import "./App.css";
const App = () => {
    const [todos, setTodos] = React.useState(() => {
      return JSON.parse(localStorage.getItem('todos')) || [];
    });
    const [todo, setTodo] = React.useState("");
    const [todoEditing, setTodoEditing] = React.useState(null);
    const [editingText, setEditingText] = React.useState("");

    // The handlesubmit code 
    function handleSubmit(e) {
        e.preventDefault();

        const newTodo = {
            id: new Date().getTime(),
            text: todo.trim(),
            completed: false,
        };
        if (newTodo.text.length > 0) {
            setTodos([...todos].concat(newTodo));
            setTodo("");

        } else {

            alert("Enter Valid Task");
            setTodo("");
        }
    }
    // The Date Code
    let date = new DateObject(todo.id);

    // The deleteToDo code 
    function deleteTodo(id) {
        let updatedTodos = [...todos].filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }

    // The toggleComplete code 
    function toggleComplete(id) {
        let updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    // The submitEdits code 
    function submitEdits(id) {
        const updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.text = editingText;
            }
            return todo;
        });
        setTodos(updatedTodos);
        setTodoEditing(null);
    }

    React.useEffect(() => {
        if ([todos].length > 0) {
            const response = JSON.stringify(todos);
            localStorage.setItem("todos", response);
        }
    }, [todos]);
    return (
        <div className="App">
            <h1>Habitica</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setTodo(e.target.value)}
                    placeholder="Add a new task"
                    value={todo}
                />
                <button type="submit">Add Todo</button>
            </form>
            {todos.map((todo) =>
                <div key={todo.id} className="todo">
                    <div className="todo-text">
                        <input
                            type="checkbox"
                            id="completed"
                            checked={todo.completed}
                            onChange={() => toggleComplete(todo.id)}
                        />
                        {todo.id === todoEditing ? (
                            <input
                                type="text"
                                onChange={((e) => setEditingText(e.target.value))}
                            />
                        ) : (
                                <div className="things">
                                <div>{todo.text}</div> <div className="date">{date.format('D-MMMM-YYYY @ hh : mm a')}</div>
                                </div>

                            )}
                    </div>
                    <div className="todo-actions">
                        {todo.id === todoEditing ? (
                            <button
                                onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                        ) : (
                                <button
                                    onClick={() => setTodoEditing(todo.id)}>Edit</button>
                            )}
                        <button
                            onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default App;

