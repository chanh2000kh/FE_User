import React from 'react'
import Dialog from '@mui/material/Dialog';
import "./Bill.css"
import Billdetail from '../billdetail/Billdetail';
import callApi from '../../api/ApiSevice.js'
import { useState, useEffect } from 'react';

import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Fab from '@mui/material/Fab';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import AddCardIcon from '@mui/icons-material/AddCard';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


export default function Bill() {
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState(0);
    const [hoaDonId, setHoaDonId] = React.useState('');
    const [hoaDonStatus, setHoaDonStatus] = React.useState('');

    //---------------------------
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    // Avoid a layout jump when reaching the last page with empty rows.
    // const emptyRows =
    //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    //--------------------------------------

    const handleClickOpen = (id, status) => {
        setHoaDonId(id)
        setHoaDonStatus(status)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [rows, setListBill] = useState([])
    const getListBill = () => {
        if (localStorage.getItem("vaiTroId") == "2") {
            callApi(`api/HoaDon/danhsachtatcahoadon`, "GET")
                .then((res) => {
                    setListBill(res.data.data)

                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            callApi(`api/HoaDon/danhsachhoadonNguoiDung`, "GET")
                .then((res) => {
                    setListBill(res.data.data)
                    console.log(res.data.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }
    useEffect(() => {
        filterBill(status)
    }, [status]);

    const filterBill = (status) => {
        if (status == 0) {
            getListBill()
        }
        else {
            if (localStorage.getItem("vaiTroId") == "2") {
                callApi(`api/HoaDon/danhsachtatcahoadon`, "GET")
                    .then((res) => {
                        const listBillNew = res.data.data.filter((data) => data.trangThaiGiaoHangId == status)
                        setListBill(listBillNew)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                callApi(`api/HoaDon/danhsachhoadonNguoiDung`, "GET")
                    .then((res) => {
                        const listBillNew = res.data.data.filter((data) => data.trangThaiGiaoHangId == status)
                        setListBill(listBillNew)
                
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            setPage(0)
        }

    }

    function format2(n) {
        return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }
    //-------------------


    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const cancelBill = (id) => {
        callApi(`api/HoaDon/nguoidunghuydonhang/` + id, "PUT")
            .then((res) => {
                setOpenSuccess(true)
                filterBill(status)
            })
            .catch((err) => {
                console.log(err);
            });
        setPage(0)
    }
    const changeStatusBill = (id, status) => {
        const data = {
            hoaDonId: id,
            trangThaiGiaoHangId: status
        }
        callApi(`api/HoaDon/capnhattrangthaidonAdmin`, "PUT", data)
            .then((res) => {
                setStatus(status)
                setOpenSuccess(true)
                filterBill(status)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const tiepTucThanhToan = (id) => {
        const data = {
            hoaDonId: id,
            bankCode: "",
            vnpLocale: "",
            vnp_Returnurl: "https://fe-user-livid.vercel.app/confirmpay"
        }
        callApi(`api/HoaDon/ThanhToanVNPayTheoHoaDon`, "POST", data)
            .then((res) => {
                window.location.replace(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const xacNhanDonHang = (id) => {
        callApi(`api/HoaDon/nguoidungxacnhandon/` + id, "PUT")
            .then((res) => {
                setOpenSuccess(true)
                filterBill(status)
            })
            .catch((err) => {
                console.log(err);
            });
        setPage(0)
    }

    return (
        <div style={{ background: "white", width: "80%", margin: "0 auto", minHeight: "645px" }}>

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
                        Thành công!
                    </Alert>
                </Collapse>
            </Stack>

            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <Billdetail id={hoaDonId} status={hoaDonStatus} />
            </Dialog>

            <div style={{ margin: "auto", textAlign: "center" }} class="container">
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Trạng thái đơn hàng</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Trạng thái đơn hàng"
                            onChange={handleChange}
                        >
                            <MenuItem value={0}>Xem tất cả</MenuItem>
                            <MenuItem value={1}>Chờ xác nhận</MenuItem>
                            <MenuItem value={3}>Đang giao</MenuItem>
                            <MenuItem value={4}>Đã nhận</MenuItem>
                            <MenuItem value={5}>Đã hủy</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <div style={{ marginTop: "50px" }}></div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Số hàng mỗi trang"
                />
            </div>
            {
                rows.length < 1 ? <h2 style={{ margin: "auto", textAlign: "center", color: "black" }}>Không có hóa đơn nào </h2> :
                    <table style={{ textAlign: "center" }} class="styled-table" border="1">
                        <thead>
                            <tr>
                                {/* <th style={{ textAlign: "center" }}>Id hóa đơn</th> */}
                                <th style={{ textAlign: "center" }}>Tổng tiền</th>
                                <th style={{ textAlign: "center" }}>Ngày đặt hàng</th>
                                <th style={{ textAlign: "center" }}>Số điện thoại người nhận </th>
                                <th style={{ textAlign: "center" }}>Địa chỉ</th>
                                <th style={{ textAlign: "center" }}>Trạng thái</th>
                                {/* <th style={{ textAlign: "center" }}>Kiểu thanh toán</th> */}
                                <th style={{ textAlign: "center" }}>Mô tả</th>
                                <th style={{ textAlign: "center" }}>Hủy</th>
                                <th style={{ textAlign: "center" }}>Xác nhận</th>
                                <th style={{ textAlign: "center" }}>Tiếp tục thanh toán Online</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {


                                        return (
                                            <tr >
                                                {/* <td> {index} </td> */}
                                                <td style={{ width: "180px" }}> {format2(row.tongHoaDon)} <sup>₫</sup> </td>
                                                <td style={{ width: "150px" }}> {new Date(row.ngayXuatDon).toISOString().split('T')[0]}</td>
                                                <td> {row.sdtNguoiNhan}</td>
                                                <td style={{ width: "300px" }}> {row.diaChiGiaoHang}</td>
                                                <td> {row.trangThaiGiaoHangId == "1" && <>Chờ xác nhận</>} {row.trangThaiGiaoHangId == "3" && <>Đang giao</>} {row.trangThaiGiaoHangId == "4" && <>Đã nhận</>} {row.trangThaiGiaoHangId == "5" && <>Đã hủy</>}</td>
                                                <td> <svg onClick={() => handleClickOpen(row.hoaDonId, row.trangThaiGiaoHangId)} style={{ color: "#007bff", height: "40px" }} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" class="svg-inline--fa fa-info-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg> </td>
                                                <td> {(row.trangThaiGiaoHangId == "1" && localStorage.getItem("vaiTroId") == "3") &&
                                                    <svg onClick={() => cancelBill(row.hoaDonId)} style={{ color: "red", height: "30px" }} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                                                }
                                                    {(row.trangThaiGiaoHangId == "1" && localStorage.getItem("vaiTroId") == "2") &&
                                                        <svg onClick={() => changeStatusBill(row.hoaDonId, "5")} style={{ color: "red", height: "30px" }} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                                                    }
                                                </td>
                                                <td style={{ width: "88px" }}> {(row.trangThaiGiaoHangId == "3" && localStorage.getItem("vaiTroId") == "3") &&
                                                    <Fab onClick={() => xacNhanDonHang(row.hoaDonId)} style={{ width: "39px", height: "39px" }} color="success" aria-label="add">
                                                        <CheckIcon />
                                                    </Fab>
                                                }
                                                    {(row.trangThaiGiaoHangId == "1" && localStorage.getItem("vaiTroId") == "2") &&
                                                        <Fab style={{ width: "39px", height: "39px" }} onClick={() => changeStatusBill(row.hoaDonId, "3")} color="success" aria-label="add">
                                                            <CheckIcon />
                                                        </Fab>
                                                    }
                                                </td>
                                                <td style={{ width: "88px" }}>
                                                    {
                                                        (row.daThanhToan == false && localStorage.getItem("vaiTroId") == "3" && row.thanhToanOnline == true) &&
                                                        <Fab style={{ width: "39px", height: "39px" }} onClick={() => tiepTucThanhToan(row.hoaDonId)} color="success" aria-label="add">
                                                            <AddCardIcon />
                                                        </Fab>
                                                    }

                                                </td>
                                            </tr>
                                        );
                                    })
                            }



                        </tbody>
                    </table>
            }


        </div>
    )
}
