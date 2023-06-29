import axios from "axios";
import { useEffect, useState } from "react"

const useFecth = (url, token) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);//ko có nỗi
    const [isError, setIsError] = useState(false);//ko có nỗi

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = (async () => {
            await axios.get(url, {
                data: controller.signal,
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then((response) => {
                console.log(response.data)
                setData(response.data);
            }).catch((error) => {

                if (axios.isCancel(error)) {
                    console.log("Request Abort: ", error.message);
                }
                else {
                    setIsError(true);
                    setIsLoading(true);
                }
            });
            return () => {
                controller.abort("Operation canceled by the user.")
            }
        });
        fetchData();
    }, [url, token])
    return { data, isLoading, isError };
}
export default useFecth;
