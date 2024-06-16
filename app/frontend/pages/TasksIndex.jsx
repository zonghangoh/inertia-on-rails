import { useForm } from '@inertiajs/react';
import axios from 'axios';
import React, { useState } from 'react';

const TasksIndexPage = (props) => {
    const [tasks, setTasks] = useState(props.tasks);

    const { 
        data, 
        setData, 
        reset,
        post, 
        processing, 
        errors 
    } = useForm();  

    const tasksList = tasks.map(task => (
        <li
        onClick={() => markTaskAsCompleted(task.id)}
        className={ task.done ? 'line-through' : ''}
        key={task.id}>{task.description} {task.done}</li>
    ));

    const markTaskAsCompleted = async (taskId) => {
        tasks.find(task => task.id === taskId).done = true;
        setTasks([...tasks]);

        const result = await axios.patch(`/tasks/${taskId}/mark_as_done`, {});
        console.log(result)
    };

    return <div className="max-w-xl mx-auto pt-24">
        <h1 className="text-2xl mb-8">Tasks</h1>
        <form onSubmit={e => {
            e.preventDefault();
            post('/tasks', {
                except: ['tasks'],
                onSuccess: () => reset(),
            });
        }}>
            <input
                type="text"
                value={data.description || ''}
                onChange={e => setData('description', e.target.value)}
                className="border border-gray-300 rounded p-2 mr-2"
            />
            {errors.description && <div className="text-red-500">{errors.description}</div>}
            <button
                type="submit"
                disabled={processing}
                className="bg-blue-500 text-white rounded p-2"
            >
                Add Task
            </button>
        </form>

        <ul>
            {tasksList}
        </ul>
    </div>;
};

export default TasksIndexPage;
