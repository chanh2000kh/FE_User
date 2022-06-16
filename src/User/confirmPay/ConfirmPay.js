import React from 'react'
import callApi from '../../api/ApiSevice.js'
import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

export default function ConfirmPay() {
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

    useEffect(() => {       
        callApi(`api/HoaDon/CheckoutVNPay?vnp_Amount=` +  GetURLParameter('vnp_Amount')
        + '&vnp_BankCode='+ GetURLParameter('vnp_BankCode')
        + '&vnp_BankTranNo=' + GetURLParameter('vnp_BankTranNo')
        + '&vnp_CardType=' + GetURLParameter('vnp_CardType')
        + '&vnp_OrderInfo=' + GetURLParameter('vnp_OrderInfo')
        + '&vnp_PayDate=' + GetURLParameter('vnp_PayDate')
        + '&vnp_ResponseCode=' + GetURLParameter('vnp_ResponseCode')
        + '&vnp_TmnCode=' + GetURLParameter('vnp_TmnCode')
        + '&vnp_TransactionNo=' + GetURLParameter('vnp_TransactionNo')
        + '&vnp_TransactionStatus=' + GetURLParameter('vnp_TransactionStatus')
        + '&vnp_TxnRef=' + GetURLParameter('vnp_TxnRef')
        + '&vnp_SecureHash=' + GetURLParameter('vnp_SecureHash')
            , "GET")
            .then((res) => {
                console.log(res)
            })  
            .catch((err) => {
                console.log(err);
            });

    }, []);

    return (

        <div style={{ display: "block", paddingTop: "100px" }} class="main container-login100">
            <div class="main-w3l">
                <div style={{ marginTop: "10px", width: "40%", margin: "auto", background: "#ffff", borderRadius: "20px", boxShadow: "rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px" }}>
                    <Alert style={{ height: "200px" }} severity="success">
                        <AlertTitle>Success</AlertTitle>
                        {/* This is a success alert — <strong>check it out!</strong> */}
                        <h1 style={{ margin: "auto", color: "black" }}>Xác nhận thanh toán thành công!</h1>
                        <Stack style={{ marginTop: "10px" }} direction="row" spacing={2}>
                            <Button onClick={()=>window.location.replace('https://fe-user-livid.vercel.app')}style={{ margin: "auto", marginBottom: "10px" }} variant="contained">Tiếp tục mua sắm</Button>
                        </Stack>
                    </Alert>
                </div>

            </div>
        </div>
    )
}

