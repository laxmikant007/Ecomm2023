import {useState , useEffect} from 'react';
import {Outlet} from 'react-router-dom';

import {useAuth} from '../../context/auth';
import Spinner from '../Spinner';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AdminRoute () {
    const [auth , setAuth] = useAuth();
    const [ok , setOk] = useState(false);

    useEffect(() => {
            const authCheck = async ()=>{
                const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`);
             
                if(res.data.success===false){
                    toast.error(res.data.message);
                }
                if(res.data.ok){
                    setOk(true);
                }else{
                    setOk(false);
                }
            };
            if(auth?.token) authCheck();
    },[auth?.token]);

    return ok ? <Outlet /> : <Spinner path="/"/>;
}