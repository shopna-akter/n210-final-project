import axios from "axios";

const axiosSecure = axios.create({
  baseURL: 'https://final-project-server-jade.vercel.app'
});
const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;