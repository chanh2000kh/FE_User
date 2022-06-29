import React from 'react'
import "./Listproduct.css"
import callApi from '../../api/ApiSevice.js'
import { useState, useEffect } from 'react';

import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Rating from '@mui/material/Rating';
function format1(n) {
    return n.toFixed(0).replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}


export default function Listproduct() {
    const [loaiSanPham, setLoaiSanPham] = useState([]);
    const [listSanPham, setListSanPham] = useState([])
    //--------------------------
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const [sumPage, setSumPage] = React.useState(1);
    const [typeGet, setTypeGet] = React.useState(1);

    const [tuTimKiem, setTuTimKiem] = useState('');

    const [idType, setIdType] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    //-----------------------------
    useEffect(() => {
        callApi(`api/LoaiSanPham/laydanhsachLoaiSP`, "GET")
            .then((res) => {
                setLoaiSanPham(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    const timAll = () => {
        setTypeGet(1)
        setPage(1)
    }

    useEffect(() => {
        if (typeGet == 1)
            callApi(`api/SanPham/laydanhsachSP/${page}/${rowsPerPage}`, "GET")
                .then((res) => {
                    setListSanPham(res.data.data.danhSachSanPham)
                    setSumPage(res.data.data.tongSoTrang)
                })
                .catch((err) => {
                    console.log(err);
                });
        if (typeGet == 2) {

            callApi(`api/SanPham/timkiemsanphamtheoten/` + tuTimKiem + `/${page}/8`, "GET")
                .then((res) => {
                    setListSanPham(res.data.data.danhSachSanPham)
                    setSumPage(res.data.data.tongSoTrang)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (typeGet == 3) {
            callApi(`api/SanPham/laysptheoLoaisanpham/` + idType + `/${page}/8`, "GET")
                .then((res) => {
                    setListSanPham(res.data.data.danhSachSanPham)
                    setSumPage(res.data.data.tongSoTrang)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [page, typeGet, idType]);

    const layDanhSachID = (id) => {
        setIdType(id)
        setTypeGet(3)
        setPage(1)
    }

    const timKiemSP = () => {
        localStorage.setItem("tuMuonTim", tuTimKiem)
        setPage(1)
        setTypeGet(2)
    }
    const tinhGiaMoi = (gia, giamgia) => {
        return format1(gia - gia * (giamgia / 100))
    }
    return (
        <div style={{ width: "80%", margin: "auto", minHeight: "645px" }} class="content-listproduct">
            <div class="content_top">
                <div class="heading">

                    <h3></h3>

                    <span style={{ fontSize: "18px", cursor: "pointer" }}>
                        {
                            loaiSanPham.map((data, a) => {
                                return (
                                    <> <a key={data.loaiSanPhamID} onClick={(event) => {
                                        // setLoaiSanPhamID(data.loaiSanPhamId)
                                        layDanhSachID(data.loaiSanPhamId)
                                    }}>{data.tenLoaiSP}</a> | </>
                                )
                            })
                        }
                    </span>




                </div>

                <div class="clear"></div>
                <br></br>
            </div>

            <div><br></br></div>

            <div class="content_top" style={{ display: "flex", alignItems: "center", marginRight: "0px" }}>
                <div style={{ width: "30%" }}>
                    <Button style={{ marginLeft: "5px" }} onClick={timAll} variant="contained">Tất cả sản phẩm</Button>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                    <TextField style={{ textAlign: "left", width: "500px", borderRadius: "8px" }} onChange={(event) => {
                        setTuTimKiem(event.target.value)
                    }} id="outlined-basic" label="Nhập từ muốn tìm" variant="outlined" />
                    <Button style={{ marginLeft: "5px" }} onClick={timKiemSP} variant="contained">Tìm kiếm</Button>
                </div>
            </div>
            <Pagination count={sumPage} page={page} onChange={handleChangePage} />
            <div class="section group">

                <div >


                    {listSanPham.length == 0 ? <div> Không tìm thấy sản phẩm </div> :
                        listSanPham.map((data, index) => {
                            return (
                                <div onClick={() => { window.location.replace('https://fe-user-livid.vercel.app/productdetail?id=' + data.sanPhamId) }} style={{ marginLeft: "25px", minHeight: "300px" }} class="grid_1_of_4 images_1_of_4">
                                    <a ><img src={data.hinhAnh} alt="" width="100%" height="175" /></a>
                                    <br />
                                    <p style={{ height: "50px", }}> {data.tenSP}</p>

                                    <div class="price-details">

                                        <div class="price-number">
                                            {data.giamGia > 0 ?
                                                <p style={{ textAlign: "left" }}><span style={{color: "#9e9e9e", textDecoration: "line-through" }}> {format1(data.giaTien)}</span> <span style={{ color: "red" }}>{tinhGiaMoi(data.giaTien, data.giamGia)} <sup>₫</sup> </span>
                                                </p>
                                                :
                                                <p style={{ textAlign: "left", color: "red" }}><span>{format1(data.giaTien)}</span> <sup>₫</sup>
                                                </p>
                                            }
                                            <br />
                                            <Rating name="read-only" value={data.danhGiaTrungBinh} readOnly />
                                        </div>
                                        <div class="clear">
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>

            </div>

        </div>
    )
}
