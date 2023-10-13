import React from 'react';
import { useSearch } from '../../context/search';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, Container, TextField } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));


const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`);
            setValues({ ...values, results: data });
            navigate("/search");


        } catch (error) {
            console.log("Error While Search ---> ", error);

        }

    }

    return (
        <div>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                {/* <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search" 
                        value={values.keyword}
                        onChange={(e)=>setValues({...values , keyword:e.target.value})}
                    /> */}
                <Container maxWidth="md" >
                    <TextField value={values.keyword}
                        onChange={(e) => setValues({ ...values, keyword: e.target.value })} type="search"
                        placeholder="Search"
                        id="search"
                        label="Search"
                        sx={{ width: 200 }} />
                    <Button className='mt-2 ml-2' variant="contained" color="success"
                        type="submit">
                        Search
                    </Button>
                </Container>
            </form>

        </div>
    )
}

export default SearchInput