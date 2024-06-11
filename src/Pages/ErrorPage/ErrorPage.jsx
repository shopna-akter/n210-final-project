import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <img className="h-[540px] mb-4" src={'https://i.ibb.co/68hcs19/404.gif'} alt="" />
            <Link to='/' className="btn">Back to Home</Link>
        </div>
    );
};

export default ErrorPage;