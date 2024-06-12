import axios from "axios";

const axiosPublic = axios.create({
  baseURL: 'https://final-project-server-jade.vercel.app'
});

const useAxiosPublic = () => {
  return axiosPublic
};

export default useAxiosPublic;