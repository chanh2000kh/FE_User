import React from 'react'
import "./Billdetail.css"
import { styled } from '@mui/material/styles';
import callApi from '../../api/ApiSevice.js'
import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

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

export default function Billdetail(props) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');

    const [billdetail, setBilldetail] = React.useState([]);
    const [day, setDay] = React.useState();
    const [listSP, setListSP] = React.useState([]);
    const [price, setPrice] = React.useState();
    const [soSP, setSoSp] = React.useState(1);

    const [expanded, setExpanded] = React.useState(false);
    const [value, setValue] = React.useState(5);
    const [binhLuan, setBinhLuan] = React.useState('');
    
    const [danhGiaThanhCong, setDanhGiaThanhCong] = React.useState(false);

    function format1(n) {
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        });
    }
    useEffect(() => {
        callApi(`api/HoaDon/xemchitiethoadon/` + props.id, "GET")
            .then((res) => {
                setExpanded(false)          
                setBilldetail(res.data.data[0])
                setDay(new Date(res.data.data[0].ngayXuatDon).toISOString().split('T')[0])
                setListSP(res.data.data[0].chiTietHD)
                setPrice(format1(res.data.data[0].tongHoaDon))
                setBinhLuan('')
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.id, danhGiaThanhCong]);

    // useEffect(() => {
    //     setSoSp(listSP.length)
    // }, [listSP]);

    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const danhGia = (id, idsp) => {
        const data = {
            hoaDonId : id,
            sanPhamId : idsp,
            soSao : value,
            binhLuanDanhGia: binhLuan
        }
       
        callApi(`api/SanPham/danhgiaSP`, "POST", data)
            .then((res) => {
                window.alert('Đánh giá thành công!')
                setBinhLuan('')
                setValue(5)
                setExpanded(false)
                setDanhGiaThanhCong(!danhGiaThanhCong)
            })
            .catch((err) => {
                window.alert('Đánh giá thất bại!')
                console.log(err);
            });
    }

    

    return (
        <div>
            <div style={{ marginLeft: "5px", minWidth: "550px", height: "350px" }} class="container-billdetil">
                <div style={{ marginTop: "5px" }}></div>
                <div class="cart-total-billdetail">
                    <div class="products-billdetil">
                        {stableSort(listSP, getComparator(order, orderBy))
                            .slice(soSP - 1, soSP).map((data, a) => {
                                return (
                                    <div style={{ height: "310px" }} class="product-billdetil">
                                        <img style={{ marginLeft: "5px", marginTop: "10px", minWidth: "220px" }} src={data.hinhAnh} />

                                        <div class="product-billdetil-info">
                                            <p style={{ marginBottom: "10px" }}>{data.tenSP}</p>
                                            <p style={{ marginBottom: "5px" }} class="product-billdetil-price">Số lượng đặt: {data.soLuongDat}   </p>


                                            <p style={{ color: "red", marginBottom: "5px", display: "flex", alignItems: "center" }} class="product-billdetil-offer">Giá: {format1(data.giaTien)} ₫
                                                {(props.status == "4") && (data.trangThaiDanhGia == 0) ?
                                                    <ExpandMore
                                                        expand={expanded}
                                                        onClick={handleExpandClick}
                                                        aria-expanded={expanded}
                                                        aria-label="show more"
                                                    >
                                                        <ExpandMoreIcon />
                                                    </ExpandMore>
                                                    :
                                                    <></>
                                                }
                                               
                                            </p>

                                            <Collapse style={{ borderTop: "2px ridge #b1154a" }} in={expanded} timeout="auto" unmountOnExit>
                                                <p style={{ color: "#000", marginBottom: "5px", display: "flex", alignItems: "center" }} >Đánh giá: <Rating
                                                    style={{ margin: "auto" }}
                                                    name="simple-controlled "
                                                    value={value}
                                                    onChange={(event, newValue) => {
                                                        setValue(newValue);
                                                    }}
                                                /></p>

                                                <textarea onChange={(event)=> setBinhLuan(event.target.value)} style={{ width: "100%", background: "#e9edf0", fontFamily: "Times New Roman", fontSize: "16px", marginBottom: "20x" }} ></textarea>
                                                <div style={{ width: "55%", margin: "auto" }}><Button onClick={()=>danhGia(props.id,data.sanPhamId)} style={{ height: "37px" }} variant="contained">đánh giá</Button></div>
                                            </Collapse>
                                        </div>

                                    </div>
                                )
                            })}

                    </div> <br />
                </div>
            </div>
            <br />
            <Stack spacing={2}>
                <Pagination onChange={(event, value) => setSoSp(value)} style={{ margin: "auto" }} count={listSP.length} variant="outlined" />
            </Stack>
            <div style={{ margin: "5px" }}>
                <p>Địa chỉ giao hàng:  {billdetail.diaChiGiaoHang}</p>
                <p>Số điện thoại người nhận: {billdetail.sdtNguoiNhan} </p>
                <p>Đã thanh toán: {billdetail.daThanhToan == true ? <>xong</> : <>chưa</>} </p>
                <p>Trạng thái đơn hàng: {row.trangThaiGiaoHangId == "1" && <>Chờ xác nhận</>} {row.trangThaiGiaoHangId == "3" && <>Đang giao</>} {row.trangThaiGiaoHangId == "4" && <>Đã nhận</>} {row.trangThaiGiaoHangId == "5" && <>Đã hủy</>} </p>
                <p>Ngày đặt hàng: {day}</p>
                <p style={{ color: "red" }}>Tổng tiền: {price}  <sup>₫</sup></p>



            </div>
        </div >
    )
}
