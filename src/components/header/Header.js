import React from 'react'
import './Header.css'
import callApi from '../../api/ApiSevice.js'
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


export default function Header() {
    const [proflieUser, setProflieUser] = useState([]);
    const [pt, setPT] = useState(0);
    useEffect(() => {
        callApi(`api/Users/xemthongtinnguoidung`, "GET")
            .then((res) => {
                // console.log(res.data.data[0])
                localStorage.setItem("vaiTroId", res.data.data[0].vaiTroId)
                setProflieUser(res.data.data[0])
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);
    const logOut = () => {
        localStorage.setItem("accessToken", '')
        localStorage.setItem("vaiTroId", '')
        setProflieUser([])
        window.location.replace('https://fe-user-livid.vercel.app/login')

    }
    const [cartUser, setCartUser] = useState([]);
    useEffect(() => {
        callApi(`api/GioHang/xemgiohang`, "GET")
            .then((res) => {
                setCartUser(res.data.data[0])
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    //------------------------------
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (link) => {
        window.location.replace(link)
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <AppBar style={{ fontFamily: "Times New Romen" }} position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <div class="logo">
                            <img src="/assets/CTSHOP.png" />
                        </div>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {localStorage.getItem("vaiTroId") == "2" ?
                            <>
                            <Button
                                    onClick={() => handleCloseNavMenu('https://fe-user-livid.vercel.app/bill')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Quản lý hóa đơn
                                </Button>
                            </> :
                            <>
                                <Button
                                    onClick={() => handleCloseNavMenu('https://fe-user-livid.vercel.app')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Trang chủ
                                </Button>
                                <Button
                                    onClick={() => handleCloseNavMenu('https://fe-user-livid.vercel.app/discount')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Mã giảm giá
                                </Button>
                                <Button
                                    onClick={() => handleCloseNavMenu('https://fe-user-livid.vercel.app/listproduct')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Sản phẩm
                                </Button>
                                <Button
                                    onClick={() => handleCloseNavMenu('https://fe-user-livid.vercel.app/aboutus')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    About us
                                </Button>
                                <Button
                                    onClick={() => handleCloseNavMenu('https://fe-user-livid.vercel.app/contact')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Liên hệ
                                </Button>
                            </>}

                    </Box>

                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        {
                            proflieUser.length == 0 ?
                                <>
                                    <Button
                                        onClick={() => handleCloseNavMenu('https://fe-user-livid.vercel.app/login')}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Đăng nhập
                                    </Button>
                                    <Button
                                        onClick={() => handleCloseNavMenu('https://fe-user-livid.vercel.app/register')}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Đăng ký
                                    </Button>
                                </>
                                :
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>

                                            <Avatar src="/broken-image.jpg" />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >

                                        <MenuItem onClick={() => handleCloseNavMenu('https://fe-user-livid.vercel.app/profileuser')}>
                                            <Typography textAlign="center">Thông tin</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={() => handleCloseNavMenu('https://fe-user-livid.vercel.app/bill')}>
                                            <Typography textAlign="center">Hóa đơn</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={() => handleCloseNavMenu('https://fe-user-livid.vercel.app/cartuser')}>
                                            <Typography textAlign="center">
                                                Giỏ hàng({cartUser.length})
                                                <svg aria-hidden="true" style={{ height: "20px", paddingTop: "5px" }} focusable="false" data-prefix="fas" data-icon="shopping-cart" class="svg-inline--fa fa-shopping-cart fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path></svg>
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem onClick={logOut}>
                                            <Typography textAlign="center">Đăng xuất</Typography>
                                        </MenuItem>
                                    </Menu>
                                    <div style={{ margin: "auto" }}>
                                        {proflieUser.tenNguoiDung}
                                    </div>
                                </>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    )
}
