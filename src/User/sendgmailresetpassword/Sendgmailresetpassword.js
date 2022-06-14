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

export default function Sendgmailresetpassword() {
	//---------------------------
	const [openSuccess, setOpenSuccess] = React.useState(false);
	const [openError, setOpenError] = React.useState(false);
	const [loiNhan, setLoiNhan] = React.useState('');
	
	const [email, setEmail] = useState('');
	const sentEmail = ()=>{
		const data = {
			email: email,
			url: 'http://localhost:3000/resetpassword'
		}
		callApi(`api/Users/sendEmailResetPassword`, "POST", data)
				.then((res) => {	
					setLoiNhan('Gửi yêu cầu thành công, vui lòng kiểm trả email !')
                	setOpenSuccess(true)									
					// setTimeout(window.location.replace('http://localhost:3000/'), 3000);	
				})
				.catch((err) => {
					setLoiNhan('Gửi mã thất bại!')
                	setOpenError(true)
					console.log(err);
				});
	}
  return (
    <div style={{display: "block", paddingTop: "100px"}} class="main container-login100">
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
				<h2 style={{color: "black", margin: "auto", width: "50%"}}><span>Lấy lại mật khẩu</span></h2>


				<div>
					{/* <input class="input-register" placeholder="Nhập email của bạn" formControlName="email" name="Email" type="email" required/>

					<input class="input-register" type="submit" value="Xác Nhận" name="login"/> */}
					<TextField onChange={(event) => setEmail(event.target.value)} style={{ width: "100%", marginTop: "10px", marginLeft: "5px", marginRight: "5px" }} type="email" id="outlined-basic" label="Email" variant="outlined" />
						<Stack style={{ marginTop: "10px" }} direction="row" spacing={2}>
							<Button onClick={sentEmail} style={{ margin: "auto" , marginBottom: "10px"}}  variant="contained">Xác nhận</Button>
						
						</Stack>

				</div>

				
			</div>

		</div>
	</div>
  )
}
