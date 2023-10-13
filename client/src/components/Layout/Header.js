import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { GiShoppingCart } from "react-icons/gi"
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from "../../context/cart";
import logo from "./img/logo.png";
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from 'antd';
import Item from 'antd/es/list/Item';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useWishList } from '../../context/wishlist';




const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();
    const navigate = useNavigate();
    const [wishList] = useWishList();


    const cartStyle = {
        cursor: 'pointer',
    }
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""

        });
        localStorage.removeItem("auth");
        setTimeout(() => {

            navigate("/login");
        }, 1000)
        toast.success("Logout Successfully!!")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg sticky-header " style={{
                position: 'sticky', top: 0, backgroundColor: '#fff',


                background: 'rgba(255, 255, 255, 0.49)',
                borderRadius: '16px',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(6.6px)',
                WebkitBackdropFilter: 'blur(6.6px)',



                zIndex: 1000
            }} >
                <div className="container-fluid ">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to="/" className="navbar-brand" >
                            <img height={45} src={logo} alt="Logo" />
                        </Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0  ">
                            <SearchInput />
                            <HomeIcon sx={{ fontSize: 30 }} color="success" />
                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    className="nav-link"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <CategoryIcon sx={{ fontSize: 30 }} color="success" />
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle"
                                    to={"/categories"}
                                    data-bs-toggle="dropdown"
                                >
                                    Categories
                                </Link>

                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item"
                                            to={"/categories"}
                                        >
                                            All Categories
                                        </Link>

                                    </li>
                                    {categories?.map((c) => (
                                        <li key={c._id}><Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link></li>

                                    ))}
                                </ul>
                            </li>
                            <AccountCircleIcon sx={{ fontSize: 30 }} color="success" />
                            {
                                !auth?.user ? (<>
                                    <li className="nav-item">
                                        <NavLink to="/register" className="nav-link" >
                                            Register
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link" >
                                            Login
                                        </NavLink>
                                    </li>
                                </>) : (<>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li><NavLink
                                                to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                                                className="dropdown-item" >
                                                Dashboard</NavLink></li>

                                            <li className="nav-item">
                                                <NavLink onClick={handleLogout} className="dropdown-item"  >
                                                    Logout
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>

                                </>)
                            }

                            <Badge count={cart?.length}>

                                <ShoppingCartIcon onClick={() => navigate("/cart")} sx={{ fontSize: 30, cursor: "pointer" }} color="success" />
                               
                            </Badge>
                                <NavLink
                                    to="/cart"
                                    className="nav-link"
                                >
                                    Cart
                                </NavLink>

                            <li className="nav-item">
                                <Badge count={wishList?.length}>

                                    <FavoriteIcon color="success" onClick={() => navigate("/wishList")} sx={{ fontSize: 30, cursor: "pointer" }}  /> 
                                </Badge>
                            </li>
                                <NavLink to="/wishList" className="nav-link">
                                    WishList
                                </NavLink>




                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header

// import * as React from 'react';
// import { styled, alpha } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import InputBase from '@mui/material/InputBase';
// // import Badge from '@mui/material/Badge';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import MailIcon from '@mui/icons-material/Mail';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import MoreIcon from '@mui/icons-material/MoreVert';


// // import React from 'react';
// import { NavLink, Link } from 'react-router-dom';
// import { GiShoppingCart } from "react-icons/gi"
// import { useAuth } from '../../context/auth';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import SearchInput from '../Form/SearchInput';
// import useCategory from '../../hooks/useCategory';
// import { useCart } from "../../context/cart";
// import logo from "./img/logo.png";
// import HomeIcon from '@mui/icons-material/Home';
// import CategoryIcon from '@mui/icons-material/Category';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import { Badge } from 'antd';
// import Item from 'antd/es/list/Item';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import { useWishList } from '../../context/wishlist';



// const Search = styled('div')(({ theme }) => ({
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     '&:hover': {
//         backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//         marginLeft: theme.spacing(3),
//         width: 'auto',
//     },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: 'inherit',
//     '& .MuiInputBase-input': {
//         padding: theme.spacing(1, 1, 1, 0),
//         // vertical padding + font size from searchIcon
//         paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//         transition: theme.transitions.create('width'),
//         width: '100%',
//         [theme.breakpoints.up('md')]: {
//             width: '20ch',
//         },
//     },
// }));

// export default function PrimarySearchAppBar() {

//     const [auth, setAuth] = useAuth();
//     const [cart] = useCart();
//     const categories = useCategory();
//     const navigate = useNavigate();
//     const [wishList] = useWishList();

//     const cartStyle = {
//         cursor: 'pointer',
//     }
//     const handleLogout = () => {
//         setAuth({
//             ...auth,
//             user: null,
//             token: ""

//         });
//         localStorage.removeItem("auth");
//         setTimeout(() => {

//             navigate("/login");
//         }, 1000)
//         toast.success("Logout Successfully!!")
//     }


//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

//     const isMenuOpen = Boolean(anchorEl);
//     const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

//     const handleProfileMenuOpen = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleMobileMenuClose = () => {
//         setMobileMoreAnchorEl(null);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//         handleMobileMenuClose();
//     };

//     const handleMobileMenuOpen = (event) => {
//         setMobileMoreAnchorEl(event.currentTarget);
//     };

//     const menuId = 'primary-search-account-menu';
//     const renderMenu = (
//         <Menu
//             anchorEl={anchorEl}
//             anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//             }}
//             id={menuId}
//             keepMounted
//             transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//             }}
//             open={isMenuOpen}
//             onClose={handleMenuClose}
//         >
//             <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//             <MenuItem onClick={handleMenuClose}>My account</MenuItem>
//         </Menu>
//     );

//     const mobileMenuId = 'primary-search-account-menu-mobile';
//     const renderMobileMenu = (
//         <Menu
//             anchorEl={mobileMoreAnchorEl}
//             anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//             }}
//             id={mobileMenuId}
//             keepMounted
//             transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//             }}
//             open={isMobileMenuOpen}
//             onClose={handleMobileMenuClose}
//         >
//             <MenuItem>
//                 <IconButton size="large" aria-label="show 4 new mails" color="inherit">
//                     <Badge badgeContent={4} color="error">
//                         <MailIcon />
//                     </Badge>
//                 </IconButton>
//                 <p>Messages</p>
//             </MenuItem>
//             <MenuItem>
//                 <IconButton
//                     size="large"
//                     aria-label="show 17 new notifications"
//                     color="inherit"
//                 >
//                     <Badge badgeContent={17} color="error">
//                         <NotificationsIcon />
//                     </Badge>
//                 </IconButton>
//                 <p>Notifications</p>
//             </MenuItem>
//             <MenuItem onClick={handleProfileMenuOpen}>
//                 <IconButton
//                     size="large"
//                     aria-label="account of current user"
//                     aria-controls="primary-search-account-menu"
//                     aria-haspopup="true"
//                     color="inherit"
//                 >
//                     <AccountCircle />
//                 </IconButton>
//                 <p>Profile</p>
//             </MenuItem>
//         </Menu>
//     );

//     return (
//         <Box sx={{ flexGrow: 1 }}>
//             <AppBar position="static">

//                 <Toolbar>
//                     <Link to="/" className="navbar-brand" >
//                         <img height={45} style={{ borderRadius: "20px" }} src={logo} alt="Logo" />
//                     </Link>

//                     <Search>
//                         <Box>
//                             <SearchInput />
//                         </Box>
//                     </Search>

//                     <Box sx={{ flexGrow: 1 }} />
//                     <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%" }} >


//                         <ul className="navbar-nav ms-auto mb-2 mb-lg-0  ">
//                             <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>

//                                 <Box marginLeft={3} >

//                                     <HomeIcon sx={{ fontSize: 30, color: "#ffffff" }} />
//                                     <li className="nav-item">
//                                         <NavLink
//                                             to="/"
//                                             className="nav-link"
//                                         >
//                                             Home
//                                         </NavLink>
//                                     </li>
//                                 </Box>
//                                 <Box marginLeft={3}>

//                                     <CategoryIcon sx={{ fontSize: 30, color: "#ffffff" }} />
//                                     <li className="nav-item dropdown">
//                                         <Link className="nav-link dropdown-toggle"
//                                             to={"/categories"}
//                                             data-bs-toggle="dropdown"
//                                         >
//                                             Categories
//                                         </Link>

//                                         <ul className="dropdown-menu">
//                                             <li>
//                                                 <Link className="dropdown-item"
//                                                     to={"/categories"}
//                                                 >
//                                                     All Categories
//                                                 </Link>

//                                             </li>
//                                             {categories?.map((c) => (
//                                                 <li key={c._id}><Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link></li>

//                                             ))}
//                                         </ul>
//                                     </li>
//                                 </Box>
//                                 <Box marginLeft={3} >

//                                     <AccountCircleIcon sx={{ fontSize: 30, color: "#ffffff" }} />
//                                     {
//                                         !auth?.user ? (<>
//                                             <li className="nav-item">
//                                                 <NavLink to="/register" className="nav-link" >
//                                                     Register
//                                                 </NavLink>
//                                             </li>
//                                             <li className="nav-item">
//                                                 <NavLink to="/login" className="nav-link" >
//                                                     Login
//                                                 </NavLink>
//                                             </li>
//                                         </>) : (<>
//                                             <li className="nav-item dropdown">
//                                                 <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                                     {auth?.user?.name}
//                                                 </NavLink>
//                                                 <ul className="dropdown-menu">
//                                                     <li><NavLink
//                                                         to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
//                                                         className="dropdown-item" >
//                                                         Dashboard</NavLink></li>

//                                                     <li className="nav-item">
//                                                         <NavLink onClick={handleLogout} className="dropdown-item"  >
//                                                             Logout
//                                                         </NavLink>
//                                                     </li>
//                                                 </ul>
//                                             </li>

//                                         </>)
//                                     }

//                                 </Box>
//                                 <Box marginLeft={3}>

//                                     <Badge count={cart?.length}>

//                                         <ShoppingCartIcon onClick={() => navigate("/cart")} sx={{ cursor: "pointer", color: "#ffffff", fontSize: 20 }} color="success" />
//                                     </Badge>

//                                     <li>
//                                         <NavLink to="/cart" className="nav-link">
//                                             Cart
//                                         </NavLink>
//                                     </li>




//                                 </Box>

//                                 <Box marginLeft={3}>
//                                     <li className="nav-item">
//                                         <NavLink to="/wishList" className="nav-link">
//                                             WishList
//                                             <FavoriteIcon color="success" /> ({wishList?.length})
//                                         </NavLink>
//                                     </li>
//                                 </Box>




//                             </Box>

//                         </ul>

//                         {/* </div> */}


//                     </Box>
//                     <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
//                         <IconButton size="large" aria-label="show 4 new mails" color="inherit">
//                             <Badge badgeContent={4} color="error">
//                                 <MailIcon />
//                             </Badge>
//                         </IconButton>
//                         <IconButton
//                             size="large"
//                             aria-label="show 17 new notifications"
//                             color="inherit"
//                         >
//                             <Badge badgeContent={17} color="error">
//                                 <NotificationsIcon />
//                             </Badge>
//                         </IconButton>
//                         <IconButton
//                             size="large"
//                             edge="end"
//                             aria-label="account of current user"
//                             aria-controls={menuId}
//                             aria-haspopup="true"
//                             onClick={handleProfileMenuOpen}
//                             color="inherit"
//                         >
//                             <AccountCircle />
//                         </IconButton>
//                     </Box>
//                     <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
//                         <IconButton
//                             size="large"
//                             aria-label="show more"
//                             aria-controls={mobileMenuId}
//                             aria-haspopup="true"
//                             onClick={handleMobileMenuOpen}
//                             color="inherit"
//                         >
//                             <MoreIcon />
//                         </IconButton>
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//             {renderMobileMenu}
//             {renderMenu}
//         </Box>
//     );
// }
