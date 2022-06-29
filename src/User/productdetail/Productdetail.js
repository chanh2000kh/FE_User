import React from 'react'
import "./Productdetail.css"
import callApi from '../../api/ApiSevice.js'
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';


function format2(n) {
    return n.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

function format1(n) {
    return n.toFixed(0).replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}
export default function Productdetail() {

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
    const [productDetail, setProductDetail] = useState([])
    const [sl, setSL] = useState(0)
    const [idLoai, setIDLoai] = useState('')
    const [price, setPrice] = useState(0)
    const [listDanhGia, setListDanhGia] = useState([])
    const [danhGiaTrungBinh, setDanhGiaTrungBinh] = useState(0)
    useEffect(() => {
        const id = GetURLParameter('id')
        callApi(`api/SanPham/laySanPhamById/` + id, "GET")
            .then((res) => {
                setProductDetail(res.data.data)
                setDanhGiaTrungBinh(res.data.data.danhGiaTrungBinh)
                setIDLoai(res.data.data.loaiSanPhamId)
                setPrice(format1(res.data.data.giaTien))
            })
            .catch((err) => {
                console.log(err);
            });
        callApi(`api/SanPham/laydanhsachdanhgiatheoSP/` + id, "GET")
            .then((res) => {
                console.log(res.data.data)
                setListDanhGia(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);
    const [listSanPham, setListSanPham] = useState([])
    useEffect(() => {
        callApi(`api/SanPham/laysptheoLoaisanpham/` + productDetail.loaiSanPhamId + `/1/4`, "GET")
            .then((res) => {
                setListSanPham(res.data.data.danhSachSanPham)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [idLoai]);

    const [loaiSanPham, setLoaiSanPham] = useState([]);
    useEffect(() => {
        callApi(`api/LoaiSanPham/laydanhsachLoaiSP`, "GET")
            .then((res) => {
                setLoaiSanPham(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);
    //---------------------------
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [loiNhan, setLoiNhan] = React.useState('');

    const addProductToCart = () => {
        const id = GetURLParameter('id')
        const data = {
            sanPhamId: id,
            soLuong: sl,
        }
        if (localStorage.getItem("vaiTroId") == "") {
            window.location.replace('https://fe-user-livid.vercel.app/login')
        } else {
            if (sl > 0)
                callApi(`api/GioHang/themspvaogiohang`, "POST", data)
                    .then((res) => {
                        window.location.replace('https://fe-user-livid.vercel.app/cartuser')
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            else {
                setLoiNhan('Số lượng bằng 0 không thể thêm vào giỏ hàng!')
                setOpenError(true)
            }
        }

    }


    return (
        <div style={{ width: "80%", margin: "auto" }} class="content-productdetail">
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


            <div class="section group">
                <div class="cont-desc span_1_of_2">
                    <div class="product-details">
                        <div class="grid images_3_of_2">
                            <div id="container">
                                <div id="products_example">
                                    <div id="products">
                                        <div class="slides_container">
                                            <br /><br />
                                            <a target="_blank"><img src={productDetail.hinhAnh} alt=" " /></a>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="desc span_3_of_2">
                            <h1 style={{ color: "black" }}> {productDetail.tenSP} </h1>
                            <p style={{ fontSize: "15px" }}> Giảm giá : {productDetail.giamGia} %</p>
                            <Rating name="read-only" value={danhGiaTrungBinh} readOnly />
                            <p style={{ fontSize: "15px" }}> Số lượng còn lại: {productDetail.soLuongConLai}</p>
                            <div class="price">
                                <p style={{ fontSize: "15px" }}>Giá : <span style={{ fontSize: "35px", textDecoration:"line-through" }} >{price} <sup>₫</sup> </span> </p>
                                <p style={{ fontSize: "15px" }}>Số lượng: <span> <br />

                                    <div>
                                        <button onClick={() => { sl > 0 && setSL(sl - 1) }} style={{ borderRadius: "100px", backgroundColor: "#007bff", color: "white", width: "30px" }} class="soluong button-bill"> -</button>
                                        <input formControlName="soLuong" class="soluong" type="number" value={sl} style={{ marginLeft: "20px", textAlign: "center" }} />
                                        <button onClick={() => { sl < productDetail.soLuongConLai && setSL(sl + 1) }} class="soluong button-bill" style={{ marginLeft: "20px", borderRadius: "100px", backgroundColor: "#007bff", color: "white", width: "30px" }}> +</button>
                                    </div>

                                </span></p>
                            </div>
                            <div class="share-desc">.
                                {/* <button style={{float: "right", marginRight: "10px"}}>
                            <h4><a style={{cursor: "pointer"}}>Đăng nhập để đặt hàng</a></h4>

                        </button> */}

                                <button onClick={addProductToCart} style={{ float: "right", marginRight: "10px" }} class="button-bill">
                                    <h4><a style={{ borderRadius: "20px", backgroundColor: "#007bff" }} >Đặt hàng</a></h4>

                                </button>
                                <div class="clear"></div>
                            </div>

                        </div>
                        <div class="clear"></div>
                    </div>
                    <br />

                    <div class="product_desc">
                        <div id="horizontalTab">
                            <h4 style={{ color: "black" }}>
                                Chi tiết về {productDetail.tenSP} <br />
                            </h4>
                            <div class="content-productdetail_top">
                                <p> <br /> {productDetail.moTa} <br /></p>
                            </div>

                        </div>
                    </div>

                    <div class="content-productdetail_bottom">
                        <h2>Sản phẩm liên quan đến {productDetail.tenSP}</h2>

                        <div class="see">
                            <p><a >Xem tất cả</a></p>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="section group">
                        {
                            listSanPham.map((data, a) => {
                                if (a < 4) return (

                                    <div style={{ cursor: "pointer", minHeight: "300px" }} class="grid_1_of_4 images_1_of_4">
                                        <a ><img onClick={() => { window.location.replace('https://fe-user-livid.vercel.app/productdetail?id=' + data.sanPhamId) }} width="100px" height="100px" src={data.hinhAnh} alt="" /></a>
                                        <div class="price-details">
                                            <div class="price-number">

                                                <h5><span style={{ fontSize: "15px", color: "black" }}> {data.tenSP.slice(0, 20)}...</span></h5>
                                                <p style={{ color: "red" }}>Giá: {format1(data.giaTien)}<sup>₫</sup></p>
                                            </div>


                                        </div>

                                    </div>
                                )
                            })
                        }





                    </div>
                    {listDanhGia.map((data) => {
                        return (
                            <div class="content-productdetail_bottom" style={{ marginTop: "10px" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <img style={{ width: "50px", height: "50px", borderRadius: "50%", border: "1px solid #EBE8E8", marginTop: "5px", marginRight: "" }} src="/assets/CTSHOP.png" />
                                    <div>
                                        <h5 style={{ color: "black", margin: "auto", marginLeft: "10px" }}>{data.tenNguoiDung}</h5>
                                        <Rating style={{ marginLeft: "10px" }} name="read-only" value={data.soSao} readOnly />
                                    </div>

                                </div>
                                <div style={{ marginTop: "20px", marginLeft: "60px" }}>
                                    <p>{data.binhLuanDanhGia}</p>
                                </div>
                            </div>
                        )
                    })}

                </div>
                <div class="rightsidebar span_3_of_1">
                    <h2> Danh sách loại sản phẩm</h2>
                    <ul>
                        {loaiSanPham.map((data) => {
                            return (
                                <li> <a>
                                    {data.tenLoaiSP} </a> </li>
                            )
                        })}


                    </ul>

                </div>
            </div>


        </div>
    )
}
