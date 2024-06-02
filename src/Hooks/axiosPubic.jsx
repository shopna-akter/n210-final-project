import axios from "axios";

const axiosPubic = axios.create({
    baseURL: 'http://localhost:5000'
  });

const useAxiosPubic = () => {
    return axiosPubic
};

export default useAxiosPubic;