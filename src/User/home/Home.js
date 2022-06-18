import React from 'react'
import './Home.css'
import callApi from '../../api/ApiSevice.js'
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const styleHome = {
    background: "#e9edf0",
    // background: "-webkit-linear-gradient(-135deg, #c850c0, #4158d0)",
    // background: "-o-linear-gradient(-135deg, #c850c0, #4158d0)",
    // background: "-moz-linear-gradient(-135deg, #c850c0, #4158d0)",
    // background: "linear-gradient(-135deg, #c850c0, #4158d0)"
}

const styleH2 = {
    position: "relative",
    marginTop: "20px",
    marginBottom: "15px",
    paddingBottom: "15px",
    // textTransform: "uppercase",
    margin: "0 0 20px 0",
    fontWeight: "800",
    fontSize: "36px",
    color: "#333",
    textAlign: "center",
}


export default function Home() {
    const [listSanPhamBanChay, setListSanPhamBanChay] = useState([])
    const [listSanPhamThem, setListSanPhamThem] = useState([])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    useEffect(() => {
        if (localStorage.getItem("tuMuonTim") == '') {
            callApi(`api/SanPham/topsanphambanchay/8`, "GET")
                .then((res) => {
                    setListSanPhamBanChay(res.data.data)                  
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {           
            callApi('api/SanPham/timkiemsanphamtheoten/'+ localStorage.getItem("tuMuonTim") +'/1/10', "GET")
                .then((res) => {
                    console.log(res.data.data.danhSachSanPham)
                    setListSanPhamBanChay(res.data.data.danhSachSanPham)
                    if (res.data.data.danhSachSanPham.length < 8) {
                        const tinh = 8 - res.data.data.danhSachSanPham.length
                        callApi(`api/SanPham/topsanphambanchay/`+ tinh, "GET")
                            .then((res) => {                                
                                setListSanPhamThem(res.data.data)
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }



    }, []);
    return (
        <div >
            <body class="is-preload">
                <div id="wrapper">
                    <section id="banner" class="major">
                        <div class="inner">
                            <header class="major">
                                <h1 class="h-home">Tìm kiếm sản phẩm của bạn </h1>
                            </header>
                            <div class="content">
                                <p>Liên hệ chúng tôi để tìm được sản phẩm mà bạn thích</p>
                                <ul class="actions">
                                    <li><a href='https://fe-user-livid.vercel.app/contact' class="button next scrolly"> Liên hệ </a></li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <div id="main">

                        {/* <h1>Top sản phẩm bán chạy</h1> */}

                        {/* <section class="tiles">
                            {
                                listSanPhamBanChay.map((data) => {
                                    return (

                                        <article onClick={() => { window.location.replace('https://fe-user-livid.vercel.app/productdetail?id=' + data.sanPhamId) }} style={{ border: "2px solid black" }}>
                                            <a class="image">
                                                <a style={{ cursor: "pointer" }}><img src={data.hinhAnh} width="370px" height="300px" alt="" /></a>
                                                <a ><h5>{data.tenSP} (đã bán {data.soLuongDaBan})</h5></a>                                              
                                            </a>



                                        </article>
                                    )
                                })
                            }



                        </section> */}
                        <div style={styleHome} >
                            <div style={{ width: "80%", margin: "auto" }} class="content-productdetail">
                                {/* <Typography gutterBottom variant="h5" component="div">
                                    Có thể bạn sẽ thích
                                </Typography> */}
                                <Slider style={{ marginBottom: "20px" }} {...settings}>

                                    <CardMedia
                                        elevation={3}
                                        component="img"
                                        height="400px"
                                        image="https://salt.tikicdn.com/cache/w1080/ts/banner/0a/b8/e7/e6203b5c9aaf6be2b7066177b396501a.png.webp"
                                        alt="green iguana"
                                    />
                                    <CardMedia
                                        elevation={3}
                                        component="img"
                                        height="400px"
                                        image="https://salt.tikicdn.com/cache/w1080/ts/banner/82/9c/5a/4703a4314b9571fc642a50bb4e6c9186.png.webp"
                                        alt="green iguana"
                                    />

                                    <CardMedia
                                        elevation={3}
                                        component="img"
                                        height="400px"
                                        image="https://salt.tikicdn.com/cache/w1080/ts/banner/9f/53/e8/de9fa949250e4d5955397fbeacc8d9cb.png.webp"
                                        alt="green iguana"
                                    />
                                </Slider>
                                <h2 class="section-h2" style={styleH2}>Bạn sẽ thích</h2>
                                <Box

                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        '& > :not(style)': {
                                            m: 1,
                                            width: 500,
                                            height: 450,
                                        },
                                    }}
                                >
                                    {
                                        listSanPhamBanChay.map((data, a) => {
                                            if(a < 8)
                                            return (
                                                <Card onClick={() => { window.location.replace('https://fe-user-livid.vercel.app/productdetail?id=' + data.sanPhamId) }} sx={{ maxWidth: 287 }} >
                                                    <CardMedia
                                                        elevation={3}
                                                        component="img"
                                                        height="70%"
                                                        // image="https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu-1.jpg"
                                                        image={data.hinhAnh}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent style={{ borderTop: "2px ridge #b1154a", marginTop: "5px" }}>
                                                        {/* <Typography style={{fontSize: "20px"}} gutterBottom variant="h6" component="div">
                                                            {data.tenSP.slice(0, 20)}
                                                        </Typography> */}
                                                        <p style={{ height: "50px", }}> {data.tenSP}</p>
                                                        <Rating name="read-only" value={data.danhGiaTrungBinh} readOnly />
                                                    </CardContent>
                                                </Card>

                                            )
                                        })
                                    }

                                    {
                                        listSanPhamThem.map((data, a) => {                                         
                                            return (
                                                <Card onClick={() => { window.location.replace('https://fe-user-livid.vercel.app/productdetail?id=' + data.sanPhamId) }} sx={{ maxWidth: 287 }} >
                                                    <CardMedia
                                                        elevation={3}
                                                        component="img"
                                                        height="70%"
                                                        // image="https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu-1.jpg"
                                                        image={data.hinhAnh}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent style={{ borderTop: "2px ridge #b1154a", marginTop: "5px" }}>
                                                        {/* <Typography style={{fontSize: "20px"}} gutterBottom variant="h6" component="div">
                                                            {data.tenSP.slice(0, 20)}
                                                        </Typography> */}
                                                        <p style={{ height: "50px", }}> {data.tenSP}</p>
                                                        <Rating name="read-only" value={data.danhGiaTrungBinh} readOnly />
                                                    </CardContent>
                                                </Card>

                                            )
                                        })
                                    }
                                </Box>
                            </div>
                        </div>

                        

                        <section>
                            <div class="inner">
                                <header class="major">
                                    <h2>Thông tin về chúng tôi</h2>
                                </header>
                                <p style={{ textAlign: "left" }}>
                                    LT Shop là một sàn giao dịch thương mại điện tử, cung cấp sản phẩm đồ gia dụng khác nhau khác nhau như quạt , tủ lạnh, tivi , đồ dùng nhà bếp,..
                                    <br />
                                </p>
                                <p style={{ textAlign: "left" }}>
                                    ✪ Là mô hình market place – là trung gian trong quy trình mua bán online<br />
                                    ✪ Đại lý các sản phẩm của Sunhouse<br />
                                    ✪ Chăm sóc khách hàng từ đội ngũ chuyên nghiệp 24/7 <br />
                                    ✪ Tận dụng các công cụ đắc lực hỗ trợ cho việc bán hàng. <br />
                                    ✪ Quy trình bán hàng trên LT Shop đơn giản, thuận tiện
                                </p>
                                <ul class="actions">
                                    <li><a href='https://fe-user-livid.vercel.app/aboutus' class="button next">Read more</a></li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>

            </body >
        </div >
    )
}
