import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store/authSlice';


export function useLoadingWithRefresh() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        let isCancelled = false;
        const refreshToken = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/refresh`,
                    {
                        withCredentials: true,
                    }
                );
                dispatch(setAuth(data));
                // console.log(message);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        refreshToken();

        return ()=>{
            isCancelled = true;
        }

    }, []);

    return { loading };
}


// export function useLoadingWithRefresh() {
//     const [loading, setLoading] = useState(true);
//     // const dispatch = useDispatch();
//     useEffect(() => {
//         let isCancelled = false;
//         const refreshToken = async () => {
//             if(!isCancelled){
//                 try {
//                     const { message } = await axios.get(
//                         `${process.env.REACT_APP_API_URL}/api/solving`,
//                         {
//                             withCredentials: true,
//                         }
//                     );
//                     // dispatch(setAuth(data));
//                     console.log(message);
//                     setLoading(false);
//                 } catch (err) {
//                     console.log(err);
//                     setLoading(false);
//                 }
//             }
//         };
//         refreshToken();

//         // clean up 
//         return ()=>{
//             isCancelled = true;
//         }

//     }, []);

//     return { loading };
// }


