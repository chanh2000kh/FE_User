import React from 'react'
import './Login.css'
import callApi from '../../api/ApiSevice.js'
import { useState, useEffect } from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

export default function Login() {
	const [tenDangNhap, setTenDangNhap] = useState('');
	const [matKhau, setMatKhau] = useState('');

	//---------------------------
	const [openSuccess, setOpenSuccess] = React.useState(false);
	const [openError, setOpenError] = React.useState(false);

	//----------------------------------------------
	const btnLogin = (e) => {
		e.preventDefault();

		if (tenDangNhap !== "" && matKhau !== "") {
			let data = {
				tenDangNhap: tenDangNhap,
				matKhau: matKhau,
			};

			callApi(`api/Users/dangnhap`, "POST", data)
				.then((res) => {
					localStorage.setItem("accessToken", res.data.data)
					setOpenSuccess(true)
					setTimeout(window.location.replace('https://fe-user-livid.vercel.app/'), 3000);	
				})
				.catch((err) => {
					setOpenError(true)
					console.log(err);
				});
		}
	}
	
	return (
		<div>
			<div class="limiter">

				<div class="container-login100">
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
								Đăng nhập thất bại, vui lòng thử lại!
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
								Đăng nhập thành công!
							</Alert>
						</Collapse>
					</Stack>
					<div class="wrap-login100">

						<div class="login100-pic js-tilt" data-tilt>
							<img src="http://www.epayment.com.ng/images/blog-wp-login-1200x400.png" alt="IMG" />
						</div>

						<div class="login100-form validate-form">
							<span class="login100-form-title">
								Đăng nhập thành viên
							</span>

							<div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
								<input formControlName="tenDangNhap" class="input100" type="text" name="email" placeholder="Tên tài khoản " onChange={(event) => setTenDangNhap(event.target.value)} />
								<span class="focus-input100"></span>
								<span class="symbol-input100">
									<i class="fa fa-envelope" aria-hidden="true"></i>
								</span>
							</div>

							<div class="wrap-input100 validate-input" data-validate="Password is required">
								<input formControlName="matKhau" class="input100" type="password" name="pass" placeholder="Mật khẩu" onChange={(event) => setMatKhau(event.target.value)} />
								<span class="focus-input100"></span>
								<span class="symbol-input100">
									<i class="fa fa-lock" aria-hidden="true"></i>
								</span>
							</div>

							<div class="container-login100-form-btn">
								<button class="login100-form-btn" onClick={btnLogin}>
									Đăng nhập
								</button>
							</div>

							<div class="text-center p-t-12">

								<a class="txt2" href='https://fe-user-livid.vercel.app/sendgmailresetpassword'>
									Quên Mật khẩu?
								</a>
							</div>

							<div class="text-center p-t-136">
								<a class="txt2" href='https://fe-user-livid.vercel.app/register'>
									Tạo tài khoản của bạn

								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

