import React from 'react'
import callApi from '../../api/ApiSevice.js'
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

export default function () {
    const [openEditProfile, setOpenEditProfile] = React.useState(false);

     //---------------------------
     const [openSuccess, setOpenSuccess] = React.useState(false);
     const [openError, setOpenError] = React.useState(false);
     const [loiNhan, setLoiNhan] = React.useState('');

    const handleClickOpenEditProFile = () => {
        setOpenEditProfile(true);
    };

    const handleCloseEditProFile = () => {
        setOpenEditProfile(false);
    };
    const editProfile = ()=>{
        const data={
            tenNguoiDung: name,
            email: email,
            sDT: numberPhone,
            diaChi: address
        }
        callApi(`api/Users/khachhangcapnhatthongtin`, "PUT", data)
        .then((res) => {
            xemThongTin()
            setLoiNhan("Cập nhật thành công!")
            setOpenSuccess(true)
        })
        .catch((err) => {
            console.log(err);
        });
    }
    //--------------------------
    const [openChangePassword, setOpenChangePassword] = React.useState(false);

    const handleClickOpenChangePassword = () => {
        setOpenChangePassword(true);
    };

    const handleCloseChangePassword = () => {
        setOpenChangePassword(false);
    };
    const [passwordNow, setPasswordNow] = useState('');
    const [passwordNew, setPasswordNew] = useState('');
    const [passwordNew1, setPasswordNew1] = useState('');
    
    const changePassword = ()=>{
        const data={
            matKhauHienTai: passwordNow,
            matKhauMoi: passwordNew,
            xacNhanMatKhauMoi: passwordNew1,
        }
        console.log(data)
        callApi(`api/Users/doimatkhau`, "POST", data)
        .then((res) => {
            setLoiNhan("Đổi mật khẩu thành công!")
            setOpenSuccess(true)
        })
        .catch((err) => {
            console.log(err);
        });
    }
    //----------------------------------
    const [proflieUser, setProflieUser] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [numberPhone, setNumberPhone] = useState('');

    const xemThongTin = ()=> {
        callApi(`api/Users/xemthongtinnguoidung`, "GET")
            .then((res) => {
                setProflieUser(res.data.data[0])
                setName(res.data.data[0].tenNguoiDung)
                setEmail(res.data.data[0].email)
                setAddress(res.data.data[0].diaChi)
                setNumberPhone(res.data.data[0].sDT)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {     
        xemThongTin()
    }, []);
    

    return (
        <div>
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

            <Dialog
                open={openEditProfile}
                keepMounted
                onClose={handleCloseEditProFile}
                aria-describedby="alert-dialog-slide-description"
            >
                <TextField  onChange={(event) => setName(event.target.value)} value={name} style={{margin: "5px", marginTop: "10px", width: "500px"}}id="outlined-basic" label="Tên người dùng" variant="outlined" />
                <TextField  onChange={(event) => setNumberPhone(event.target.value)} value={numberPhone} style={{margin: "5px", width: "500px"}} type="number" id="outlined-basic" label="Số điện thoại" variant="outlined" />
                <TextField onChange={(event) => setEmail(event.target.value)} value={email} style={{margin: "5px", width: "500px"}}  type="email" id="outlined-basic" label="Email" variant="outlined" />
                <TextField  onChange={(event) => setAddress(event.target.value)} value={address} style={{margin: "5px", width: "500px"}} id="outlined-basic" label="Địa chỉ" variant="outlined" />
                <Button onClick={editProfile} style={{margin: "auto", marginBottom: "5px"}} variant="contained">Sửa thông tin</Button>
            </Dialog>

            <Dialog
                open={openChangePassword}
                keepMounted
                onClose={handleCloseChangePassword}
                aria-describedby="alert-dialog-slide-description"
            >
                <TextField  onChange={(event) => setPasswordNow(event.target.value)} style={{margin: "5px", marginTop: "10px", width: "500px"}} type="password" id="outlined-basic" label="Mật khẩu hiện tại" variant="outlined" />
                <TextField  onChange={(event) => setPasswordNew(event.target.value)}  style={{margin: "5px", width: "500px"}} type="password" id="outlined-basic" label="Mật khẩu mới" variant="outlined" />
                <TextField onChange={(event) => setPasswordNew1(event.target.value)} style={{margin: "5px", width: "500px"}}  type="password" id="outlined-basic" label="Nhập lại mật khẩu" variant="outlined" />
                <Button onClick={changePassword} style={{margin: "auto", marginBottom: "5px"}} variant="contained">Xác nhận</Button>
            </Dialog>
            <div class="wrapper">

                <div class="left">
                    <img
                        src='https://ps.w.org/simple-user-avatar/assets/icon-128x128.png?rev=2413146'
                        alt="user" />
                    <h4>{proflieUser.tenNguoiDung}</h4>

                </div>
                <div class="right">
                    <div class="info">
                        <h3>Thông tin</h3>
                        <div class="info_data">
                            <div class="data">
                                <h4>Email</h4>
                                <p> {proflieUser.email}</p>
                            </div>
                            <div class="data">
                                <h4>Số điện thoại</h4>
                                <p>{proflieUser.sDT}</p>
                            </div>
                        </div>
                    </div>

                    <div class="projects">

                        <div class="projects_data">
                            <div class="data">
                                <h4>Địa chỉ</h4>
                                <p>{proflieUser.diaChi}</p>
                            </div>

                        </div>
                    </div>

                    <div class="social_media">
                        <ul>

                            <li onClick={handleClickOpenEditProFile}><a style={{ width: "auto" }}><i
                                class="fab">Thay đổi thông tin</i></a></li>
                            <li onClick={handleClickOpenChangePassword}><a style={{ width: "auto" }}><i
                                class="fab">Thay đổi mật khẩu</i></a></li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
