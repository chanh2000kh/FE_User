import React from 'react'
import callApi from '../../api/ApiSevice.js'
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

export default function Register() {
    //---------------------------
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [loiNhan, setLoiNhan] = React.useState('');

    const [email, setEmail] = useState('');
    const [tenDangNhap, setTenDangNhap] = useState('');
    const [tenNguoiDung, setTenNguoiDung] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [sDT, setSDT] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [xacNhanMatKhau, setXacNhanMatKhau] = useState('');

    const register = () => {
        const data = {
            email: email,
            tenDangNhap: tenDangNhap,
            tenNguoiDung: tenNguoiDung,
            diaChi: diaChi,
            sDT: sDT,
            matKhau: matKhau,
            xacNhanMatKhau: xacNhanMatKhau
        }
        console.log(data)
        if(xacNhanMatKhau.length < 8)
        {
            setLoiNhan('Mật khẩu bắt buộc, tối thiểu 8 ký tự!')
            setOpenError(true)
        }
        else
        {
            callApi(`api/Users/dangky`, "POST", data)
            .then((res) => {
                setLoiNhan('Đăng ký thành công !')
                setOpenSuccess(true)
                setTimeout(window.location.replace('https://fe-user-livid.vercel.app/login'), 3000);
            })
            .catch((err) => {
                setLoiNhan('Đăng ký không thành công !')
                setOpenError(true)
                console.log(err);
            });
        }
    }
    return (
        <div style={{ display: "block" }} class="limiter ">

            <div class="main container-login100">
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Collapse in={openError}>
                        <Alert variant="filled" severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpenError(false);

                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}>
                            <AlertTitle>Error</AlertTitle>
                            {loiNhan}
                        </Alert>
                    </Collapse>
                    <Collapse in={openSuccess}>
                        <Alert variant="filled" severity="success"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpenSuccess(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}>
                            <AlertTitle>Success</AlertTitle>
                            {loiNhan}
                        </Alert>
                    </Collapse>
                </Stack>
                <div class="main-w3l">
                    <div style={{ marginTop: "10px", width: "40%", margin: "auto", background: "#ffff", borderRadius: "20px", boxShadow: "rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px" }}>
                        <h2 style={{ color: "black", margin: "auto", width: "20%" }}><span>Đăng Kí </span></h2>
                        <div >
                            <TextField onChange={(event) => setEmail(event.target.value)} style={{ width: "100%", marginTop: "10px" }} type="email" id="outlined-basic" label="Email" variant="outlined" />
                            <TextField onChange={(event) => setTenDangNhap(event.target.value)} style={{ width: "100%", marginTop: "10px" }} type="text" id="outlined-basic" label="Tên đăng nhập" variant="outlined" />
                            <TextField onChange={(event) => setTenNguoiDung(event.target.value)} style={{ width: "100%", marginTop: "10px" }} type="text" id="outlined-basic" label="Tên người dùng" variant="outlined" />
                            <TextField onChange={(event) => setDiaChi(event.target.value)} style={{ width: "100%", marginTop: "10px" }} type="text" id="outlined-basic" label="Địa chỉ" variant="outlined" />
                            <TextField onChange={(event) => setSDT(event.target.value)} style={{ width: "100%", marginTop: "10px" }} type="number" id="outlined-basic" label="Số điện thoại" variant="outlined" />
                            <TextField onChange={(event) => setMatKhau(event.target.value)} style={{ width: "100%", marginTop: "10px" }} type="password" id="outlined-basic" label="Mật khẩu" variant="outlined" />
                            <TextField onChange={(event) => setXacNhanMatKhau(event.target.value)} style={{ width: "100%", marginTop: "10px" }} type="password" id="outlined-basic" label="Xác nhận mật khẩu" variant="outlined" />
                            <Stack style={{ marginTop: "10px" }} direction="row" spacing={2}>
                                <Button style={{ margin: "auto", marginBottom: "10px" }} onClick={register} variant="contained">Đăng ký</Button>
                                {/* <Button variant="contained" disabled>
                                    Disabled
                                </Button> */}
                                <Button style={{ margin: "auto", marginBottom: "10px" }} onClick={() => window.location.replace('https://fe-user-livid.vercel.app/login')} variant="contained">
                                    Đăng nhập
                                </Button>
                            </Stack>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    )
}
