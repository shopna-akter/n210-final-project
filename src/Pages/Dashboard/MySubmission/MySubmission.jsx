import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const MySubmission = () => {
    const { user } = useContext(AuthContext);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [count, setCount] = useState(0);
    const [selected, setSelected] = useState('bg-indigo-500 hover:bg-indigo-500');

    useEffect(() => {
        if (user && user.email) {
            fetch(`http://localhost:5000/submissionCount/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setCount(data.count);
                    console.log(data.count);
                })
                .catch(err => {
                    console.error("Error fetching submission count:", err);
                });
        }
    }, [user]);
    const { isLoading, isError, error, data: mySubmissions } = useQuery({
        queryKey: ['Submission', user.email, itemsPerPage, currentPage],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/submission?email=${user.email}&page=${currentPage}&size=${itemsPerPage}`, { credentials: 'include' });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        },
        enabled: !!user && !!user.email
    });
    console.log(mySubmissions);
    useEffect(() => {
        const numberOfPages = Math.ceil(count / itemsPerPage);
        setPages([...Array(numberOfPages).keys()]);
    }, [count, itemsPerPage]);

    const handleItemsPerPage = (e) => {
        const value = parseInt(e.target.value);
        setItemsPerPage(value);
        setCurrentPage(0);
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (isLoading) {
        return <span className="loading loading-spinner"></span>;
    }

    if (isError) {
        return <h2>{error.message}</h2>;
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Task Title</th>
                            <th>Creator Email</th>
                            <th>Request Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mySubmissions && mySubmissions.map(mySubmission => (
                            <tr key={mySubmission._id}>
                                <td>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </td>
                                <td className="font-bold">{mySubmission.task_title}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <h2 className="font-bold">{mySubmission.creator_email}</h2>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-bold">{mySubmission.current_date}</td>
                                <th>{mySubmission.status}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-center mb-10 flex justify-center">
                    <div>
                        <button className="btn mr-2" onClick={handlePrev}>Previous</button>
                        {pages.map(page => (
                            <button onClick={() => setCurrentPage(page)} className={`mr-3 btn ${currentPage === page && selected}`} key={page}>{page + 1}</button>
                        ))}
                        <button onClick={handleNext} className="btn">Next</button>
                    </div>
                    <select value={itemsPerPage} onChange={handleItemsPerPage}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default MySubmission;
