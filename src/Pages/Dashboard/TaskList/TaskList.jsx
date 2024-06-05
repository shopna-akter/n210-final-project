import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/availableTasks')
        .then(res => res.json())
        .then(data => {
            setTasks(data)
        })
    },[])
    console.log(tasks);
    return (
        <>
            <div>
                <div className="text-center">
                    <h1 className="text-xl font-bold">Available Task</h1>
                    <p>Explore our selection of delicious and fresh tasks available for you to enjoy!</p>
                </div>
                <div className="md:flex gap-8 my-6 justify-center">
                    {/* <div className="join ml-[100px] mt-2 md:ml-0">
                        <form onSubmit={handleSearch}>
                            <input name="searchField" onChange={handleInputChange} className="input input-bordered join-item" placeholder="Search" />
                        </form>
                        <div className="indicator">
                            <button onClick={handleSearchValue} className="btn join-item">Search</button>
                        </div>
                    </div>
                    <div className="flex gap-4 ml-[130px] mt-2 md:ml-0">
                        <h2 className="mt-3 font-medium ">Filter By Expire Date</h2>
                        <button onClick={handleSort} className="btn"> High To Low</button>
                    </div> */}
                </div>
                <div className={`grid grid-cols-1 md:grid-cols-2`}>
                    {tasks.map((task) => (
                        <div className="mx-4" key={task._id}>
                            <div className="mb-4">
                                <div className="card border bg-base-100 shadow-xl">
                                    <div className="card-body text-left">
                                        <div className="text-center mr-2">
                                            <h2 className="font-bold text-xl">{task.task_title}</h2>
                                        </div>
                                        <p>{task.creator_name}</p>
                                        <div className="card-actions justify-between">
                                            <div className="flex gap-2">
                                                <span>Cost:</span>
                                                <span>{task.task_quantity}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <span>Completion date:</span>
                                                <span>{task.creator_name}</span>
                                            </div>
                                        </div>
                                        <div className="card-actions justify-between">
                                            <div className="flex items-center gap-2">
                                                <span>Travel time:</span>
                                                <span></span>
                                            </div>
                                            <div className="flex gap-2">
                                                <span>Visitors(year):</span>
                                                <span>{task.payable_amount}</span>
                                            </div>
                                        </div>
                                        <Link className="btn bg-indigo-500" to={`/tasks/${task._id}`}>View Details</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TaskList;