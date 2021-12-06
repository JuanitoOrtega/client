import React, { Fragment, useEffect, useState } from 'react';

import EditTodo from './EditTodo';

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    // deleteTodo function
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: 'DELETE'
            });
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };
    const getTodos = async () => {
        try {
            const response = await fetch('http://localhost:5000/todos');
            const data = await response.json();
            setTodos(data);
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getTodos();
    }, []);

    return (
        <Fragment>
            <table class="table mt-4">
                <thead>
                    <tr>
                        <th width="85%">Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                    <tr key={ todo.id }>
                        <td>{ todo.description }</td>
                        <td>
                            <EditTodo todo={todo} />
                        </td>
                        <td>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => deleteTodo(todo.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default ListTodos;