import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useContext } from "react";

const WorkerHome = () => {
    const { user } = useContext(AuthContext)
    const { isPending, isError, error, data: myApprovedSubmissions } = useQuery({
        queryKey: ['approvedSubmission'],
        queryFn: async () => {
            const res = await fetch(`https://final-project-server-jade.vercel.app/approvedSubmission?email=${user.email}`, { credentials: 'include' });
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
                            <th>Payable Amount</th>
                            <th>Creator Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            myApprovedSubmissions.map(myApprovedSubmission => (
                                <tr key={myApprovedSubmission._id}>
                                    <td><label>
                                        <input type="checkbox" className="checkbox" />
                                    </label></td>
                                    <td className="font-bold">{myApprovedSubmission.task_title}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <h2 className="font-bold">{myApprovedSubmission.payable_amount}</h2>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-bold">{myApprovedSubmission.creator_name}</td>
                                    <th>{myApprovedSubmission.status}</th>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WorkerHome;