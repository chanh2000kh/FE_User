import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import callApi from '../../api/ApiSevice.js'
import { useState, useEffect } from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

export default function Resetpassword() {
	//---------------------------
	const [openSuccess, setOpenSuccess] = React.useState(false);
	const [openError, setOpenError] = React.useState(false);
	const [loiNhan, setLoiNhan] = React.useState('');

	const [matKhau, setMatKhau] = useState('');
	const [xacNhanMatKhau, setXacNhanMatKhau] = useState('');
	const GetURLParameter = (sParam) => {

		var sPageURL = window.location.search.substring(1);
		var sURLVariables = sPageURL.split('&');
		for (var i = 0; i < sURLVariables.length; i++) {
			var sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] === sParam) {
				return (sParameterName[1].toString());
			}
		}

	}
	const resetPass = () => {
		const token = GetURLParameter('token')
		localStorage.setItem("accessToken", token)
		const data = {
			matKhauMoi: matKhau,
			xacNhanMatKhauMoi: xacNhanMatKhau
		}
		callApi(`api/Users/ResetPassword`, "POST", data)
			.then((res) => {
				setLoiNhan('Đổi mật khẩu thành công!')
                setOpenSuccess(true)
				localStorage.setItem("accessToken", "")
				setTimeout(window.location.replace('http://localhost:3000/login'), 3000);
			})
			.catch((err) => {
				setLoiNhan('Đổi mật khẩu không thành công!')
                setOpenError(true)
				console.log(err);
			});
	}
	return (
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

			<div style={{ marginTop: "10px", width: "40%", margin: "auto", background: "#ffff", borderRadius: "20px", boxShadow: "rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px" }} class="main-w3l">
				<div >
					<h2 style={{ color: "black", margin: "auto", width: "50%" }}><span>Lấy lại mật khẩu</span></h2>


					<div >
						{/* <input class="input-register" formControlName="matKhauMoi" placeholder="Mật khẩu mới" name="Email" type="password" required/>
                    <input class="input-register" formControlName="xacNhanMatKhauMoi" placeholder="Xác nhận mật khẩu mới  " name="Email" type="password" required/>

					<input class="input-register" type="submit" value="Xác nhận" name="login"/> */}

						<TextField onChange={(event) => setMatKhau(event.target.value)} style={{ width: "100%", marginTop: "10px" }} type="password" id="outlined-basic" label="Mật khẩu mới" variant="outlined" />
						<TextField onChange={(event) => setXacNhanMatKhau(event.target.value)} style={{ width: "100%", marginTop: "10px" }} type="password" id="outlined-basic" label="Nhập lại mật khẩu" variant="outlined" />
						<Stack style={{ marginTop: "10px" }} direction="row" spacing={2}>
							<Button style={{ margin: "auto", marginBottom: "10px" }} variant="contained" onClick={resetPass}>Xác nhận</Button>

						</Stack>
					</div>


				</div>

			</div>
		</div>

	)
}


