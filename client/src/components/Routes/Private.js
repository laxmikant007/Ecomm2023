import {useState , useEffect} from 'react';
import {Outlet} from 'react-router-dom';

import {useAuth} from '../../context/auth';
import Spinner from '../Spinner';
import axios from 'axios';

export default function PrivateRoute () {
    const [auth , setAuth] = useAuth();
    const [ok , setOk] = useState(false);

    useEffect(() => {
            const authCheck = async ()=>{
                const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`);
                if(res.data.ok){
                    setOk(true);
                }else{
                    setOk(false);
                }
            };
            if(auth?.token) authCheck();
    },[auth?.token]);

    return ok ? <Outlet /> : <Spinner/>;
}