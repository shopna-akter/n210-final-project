import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const MySubmission = () => {
    const { user } = useContext(AuthContext)
    const { isPending, isError, error, data: mySubmissions } = useQuery({
        queryKey: ['Submission'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/submission?email=${user.email}`, { credentials: 'include' });
            return res.json()
        }
    })
    if (isPending) {
        return <span className="loading loading-spinner"></span>
    }
    if (isError) {
        return <h2>{error.message}</h2>
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th><label>
                                <input type="checkbox" className="checkbox" />
                            </label></th>
                            <th>Task Title</th>
                            <th>Creator Email</th>
                            <th>Request Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            mySubmissions.map(mySubmission => (
                                <tr key={mySubmission._id}>
                                    <td><label>
                                        <input type="checkbox" className="checkbox" />
                                    </label></td>
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
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySubmission;