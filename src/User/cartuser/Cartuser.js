import React from 'react'
import './Cartuser.css'
import callApi from '../../api/ApiSevice.js'
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Pagination from '@mui/material/Pagination';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

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

export default function Cartuser() {
    const [cartUser, setCartUser] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [pay, setPay] = useState(0);



    useEffect(() => {
        callApi(`api/GioHang/xemgiohang`, "GET")
            .then((res) => {
                setCartUser(res.data.data[0])
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);
    //------------------------------------
    //----------------------
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    function formatDate(date) {
        return new Date(date).toISOString().split('T')[0]
    }
    const [soMaGiamGia, setSoMaGiamGia] = React.useState(1);
    const [open, setOpen] = React.useState(false);
    const [maGiamGia, setMaGiamGia] = React.useState('');
    const [kieuGiam, setKieuGiam] = React.useState('');
    const [giamGia, setGiamGia] = React.useState('');
    const [giamToiDa, setGiamToiDa] = React.useState('');
    const [donToiThieu, setDonToiThieu] = React.useState('');
    const [listMaGiamGia, setListMaGiamGia] = React.useState([]);

    const handleClickOpen = (id) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const themMaGiamGia = (code, kieugiam, giamgia, giamtoida, dontoithieu) => {
        setKieuGiam(kieugiam)
        setGiamGia(giamgia)
        setGiamToiDa(giamtoida)
        setMaGiamGia(code)
        setDonToiThieu(dontoithieu)
        setOpen(false);
    }

    //-----------------------
    const [proflieUser, setProflieUser] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [numberPhone, setNumberPhone] = useState('');
    useEffect(() => {
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
        callApi(`api/MaGiamGia/xemdanhsachMaGiamGiaCuaNgDung`, "GET")
            .then((res) => {
                console.log(res)
                setListMaGiamGia(res.data.data[0])
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const tinhTong = (sum, pay, sumPS) => {
        cartUser.map((data, a) => {
            sum = sum + (data.giaTien * data.soLuongTrongGio)
            pay = pay + (data.giaTien * data.soLuongTrongGio * (100 - data.giamGia)) / 100
            sumPS = sumPS + data.soLuongTrongGio
        })
        setTotal(sum)

        if (maGiamGia != '') {
            if (pay >= donToiThieu) {
                if (kieuGiam == 0) {
                    pay = pay - giamToiDa
                    if (pay < 0) pay = 0
                }
                if (kieuGiam == 1) {
                    if (pay * giamGia > giamToiDa) pay = pay - giamToiDa
                    else pay = pay - pay * (giamGia / 100)
                }
            }
            
        }
        setPay(pay)
        setTotalProduct(sumPS)
    }

    useEffect(() => {
        tinhTong(0, 0, 0)
    }, [cartUser, maGiamGia]);

    const updateCart = (sl, id) => {
        const data = {
            sanPhamId: id,
            soLuong: sl
        }
        callApi(`api/GioHang/giamsoluongtronggiohang`, "POST", data)
            .then((res) => {
                console.log(res)
                callApi(`api/GioHang/xemgiohang`, "GET")
                    .then((res) => {
                        setCartUser(res.data.data[0])
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });



    }

    //---------------------------
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);

    const [listProduct, setListProduct] = useState([]);
    const payMent = () => {
        cartUser.map((data, a) => {
            return listProduct.push({
                sanPhamId: data.sanPhamId,
                soLuongDat: data.soLuongTrongGio
            })
        })
        const data = {
            danhSachDat: listProduct,
            diaChiGiaoHang: address,
            sdtNguoiNhan: numberPhone,
            thanhToanOnline: true,
            maGiamGiaId: maGiamGia
        }
        console.log(data)
        callApi(`api/HoaDon/taohoadon`, "POST", data)
            .then((res) => {
                callApi(`api/GioHang/xemgiohang`, "GET")
                    .then((res) => {
                        setCartUser(res.data.data[0])
                        setListProduct([])
                        setOpenSuccess(true)
                        setMaGiamGia("")
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })

    }


    const deleteCart = (id) => {
        callApi(`api/GioHang/xoasanphamtronggiohang/` + id, "DELETE")
            .then((res) => {
                console.log(res)
                callApi(`api/GioHang/xemgiohang`, "GET")
                    .then((res) => {
                        console.log(res.data.data[0])
                        setCartUser(res.data.data[0])
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function format2(n) {
        return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }
    function format1(n) {
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        });
    }

    //-----Thanh toan VNPay
    const thanhToanVNPAY = () => {
        cartUser.map((data, a) => {
            return listProduct.push({
                sanPhamId: data.sanPhamId,
                soLuongDat: data.soLuongTrongGio
            })
        })
        const data = {
            danhSachDat: listProduct,
            diaChiGiaoHang: address,
            sdtNguoiNhan: numberPhone,
            bankCode: "",
            vnpLocale: "",
            vnp_Returnurl: "http://localhost:3000/confirmpay",
            maGiamGiaId: maGiamGia
        }
        callApi(`api/HoaDon/ThanhToanVNPay`, "POST", data)
            .then((res) => {
                setListProduct([])
                setOpenSuccess(true)
                setMaGiamGia("")
                window.location.replace(res.data.data)
            })
            .catch((err) => {
                setOpenError(true)
                console.log(err);
            })
    }

    return (
        <div style={{ background: "#ffffff", minHeight: "645px", display: "block", paddingTop: "100px" }} class="container-cartuser">

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
                        Thêm hóa đơn thất bại!
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
                        Thêm hóa đơn thành công!
                    </Alert>
                </Collapse>
            </Stack>


            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <div style={{ marginLeft: "5px", minWidth: "550px", padding: '5px' }} class="container-billdetil">
                    <div style={{ marginTop: "5px" }}></div>
                    <div class="cart-total-billdetail">
                        <div class="products-billdetil">
                            {stableSort(listMaGiamGia, getComparator(order, orderBy))
                                .slice(soMaGiamGia - 1, soMaGiamGia).map((data, a) => {
                                    //if(data.daSuDung == false)
                                    return (
                                        <div style={{ height: '215px' }} class="product-billdetil">
                                            <img style={{ marginLeft: "5px", marginTop: "10px", Width: "220px" }} src="/assets/CTSHOP.png" />
                                            <div class="product-billdetil-info">
                                                <Typography variant="h5" component="div">
                                                    {data.tenMaGiamGia}
                                                </Typography>
                                                <Stack style={{ marginTop: "5px" }} direction="row" spacing={2}>
                                                    <p style={{ marginBottom: '5px' }} >Đơn tối thiểu: {data.donToiThieu / 1000}k  </p>
                                                    <p style={{ marginBottom: '5px' }} >Giảm tối đa: {data.giamToiDa / 1000}k  </p>
                                                </Stack>
                                                <Stack style={{ marginTop: "5px" }} direction="row" spacing={2}>
                                                    <p style={{ marginBottom: '5px' }} class="product-billdetil-price">Ngày hiệu lực: {formatDate(data.ngayBatDau)}</p>
                                                    <p style={{ marginBottom: '5px' }} class="product-billdetil-price">Ngày hết hạn: {formatDate(data.ngayHetHang)}</p>
                                                </Stack>
                                                {
                                                    data.daSuDung == false ?
                                                        <Button onClick={() => { themMaGiamGia(data.maGiamGiaId, data.kieuGiam, data.giamGia, data.giamToiDa, data.donToiThieu) }} style={{ height: "37px" }} variant="contained">Thêm</Button>
                                                        :
                                                        <Button style={{ height: "37px" }} variant="contained">Đã sử dụng</Button>
                                                }

                                            </div>

                                        </div>
                                    )

                                }
                                )
                            }

                        </div> <br />
                    </div>
                </div>
                <Stack spacing={2}>
                    <Pagination onChange={(event, value) => setSoMaGiamGia(value)} style={{ margin: "auto", marginBottom: "10px" }} count={listMaGiamGia.length} variant="outlined" />
                </Stack>
            </Dialog>
            <h1 style={{ color: "#242943", fontSize: "50px" }}>Giỏ hàng</h1>
            <div class="cart">

                <div class="products">
                    {cartUser.length < 1 && <h2 style={{ color: "black" }}>Không có sản phẩm trong giỏ hàng</h2>}

                    {

                        cartUser.map((data, a) => {


                            return (<div class="product">

                                <img onClick={() => { window.location.replace('http://localhost:3000/productdetail?id=' + data.sanPhamId) }} style={{ width: "200px" }} src={data.hinhAnh} />

                                <div class="product-info">

                                    {/* <h3 style={{ color: "black" }} class="product-name">{data.tenSP} </h3> */}
                                    <Typography variant="h5" component="div">
                                        {data.tenSP}
                                    </Typography>


                                    {/* <h4 style={{ color: "red" }} class="product-price">Giá:   
                                        <del >{format2(data.giaTien * data.soLuongTrongGio)} VNĐ </del></h4> */}
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {format2(data.giaTien * data.soLuongTrongGio)} <sup>₫</sup>
                                    </Typography>

                                    <h4 style={{ color: "red" }} class="product-offer">Giảm giá: {data.giamGia}%</h4>

                                    <p>Số lượng còn lại: {data.soLuongConLai} </p>
                                    <div>
                                        <p class="product-quantity">Số lượng:
                                            <button onClick={() => { updateCart(- 1, data.sanPhamId) }} style={{ borderRadius: "10px", backgroundColor: "#007bff", color: "white", width: "40px", height: "25px" }} class="soluong"> -</button>
                                            <input formControlname="soLuong" style={{ borderRadius: "10px" }} disabled value={data.soLuongTrongGio} name="" />
                                            <button onClick={() => { updateCart(1, data.sanPhamId) }} style={{ borderRadius: "10px", backgroundColor: "#007bff", color: "white", width: "40px", height: "25px" }} class="soluong"> +</button>
                                        </p>
                                    </div>
                                    <Button onClick={(event) => { deleteCart(data.sanPhamId) }} style={{ position: "absolute", right: "20px", }} variant="outlined" startIcon={<DeleteIcon />}>
                                        Xóa
                                    </Button>


                                </div>

                            </div>)
                        })
                    }


                </div>

                <div style={{ height: "500px" }} class="cart-total">
                    <p>

                        <span>Số lượng sản phẩm</span>

                        <span>{totalProduct}</span>

                    </p>

                    <p>

                        <span>Tổng tiền</span>

                        <span> {format2(total)} ₫ </span>

                    </p>



                    <p>

                        <span>Phải trả</span>

                        <span> {format2(pay)} ₫</span>

                    </p>

                    <p>

                        <span>Đã được giảm</span>

                        <span> {format2(total - pay)} ₫</span>

                    </p>

                    <Stack style={{ marginTop: "10px" }} direction="row" spacing={2}>
                        <TextField onChange={(event) => setMaGiamGia(event.target.value)} value={maGiamGia} id="outlined-basic" style={{ width: "80%" }} label="Nhập mã giảm giá" variant="outlined" />
                        <Button onClick={handleClickOpen} style={{ height: "px" }} variant="contained">Thêm Mã</Button>
                    </Stack>
                    <Stack style={{ marginTop: "10px" }} direction="row" spacing={2}>

                        <Button onClick={payMent} style={{ width: "100%" }} variant="contained">Thanh toán khi nhận hàng</Button>
                    </Stack>
                    <Stack style={{ marginTop: "10px" }} direction="row" spacing={2}>
                        <Button onClick={thanhToanVNPAY} style={{ width: "100%" }} variant="contained">Thanh toán VNPay</Button>
                    </Stack>
                </div>

            </div>

        </div>
    )
}
