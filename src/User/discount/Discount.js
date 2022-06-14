import React from 'react'
import callApi from '../../api/ApiSevice.js'
import { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';


function format1(n) {
    return n.toFixed(0).replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}

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
export default function Discount() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    // Avoid a layout jump when reaching the last page with empty rows.
    // const emptyRows =
    //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        console.log(newPage)
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    //------------------------------------------
    function formatDate(date) {
        return new Date(date).toISOString().split('T')[0]
    }
    const [listMaGiamGia, setListMaGiamGia] = React.useState([])
    //Lấy danh sách mã giảm giá
    useEffect(() => {
        callApi(`api/MaGiamGia/laydanhsachMaGiamGia`, "GET")
            .then((res) => {
                setListMaGiamGia(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    //---------------------------
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [loiNhan, setLoiNhan] = React.useState('');

    const themMaGiamGiaNgDung = (maGiamGiaId) => {
        const data =
        {
            maGiamGiaId: maGiamGiaId
        }
        callApi(`api/MaGiamGia/themMaGiamNgDung`, "POST", data)
            .then((res) => {
                setLoiNhan(res.data.message)
                setOpenSuccess(true)
                console.log(res)
            })
            .catch((err) => {
                setOpenError(true)
                setLoiNhan('Thêm mã giảm thất bại')
                console.log(err);
            });
    }


    return (
        <div style={{ width: "80%", margin: "auto", minHeight: "645px" }} class="content-listproduct">
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
                        {
                            loiNhan
                        }
                    </Alert>
                </Collapse>
            </Stack>

            <TablePagination
                rowsPerPageOptions={[4]}
                component="div"
                count={listMaGiamGia.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Số mã mỗi trang"
            />
            <div class="section group">
                <div >
                    {listMaGiamGia.length == 0 ? <div> Không có mã giảm giá nào </div> :
                        stableSort(listMaGiamGia, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((data, index) => {
                                return (
                                    <div style={{ marginLeft: "30px", minHeight: "300px", borderRadius: "20px" }} class="grid_1_of_4 images_1_of_4">
                                        <CardMedia
                                            elevation={3}
                                            component="img"
                                            height="100%"
                                            image="/assets/CTSHOP.png"
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {data.tenMaGiamGia}
                                            </Typography>
                                            <p>Giảm tối đa {data.giamToiDa} <sup>₫</sup></p>
                                            <p>Đơn tối thiểu {data.donToiThieu} <sup>₫</sup></p>
                                            <p>{formatDate(data.ngayBatDau)} -- {formatDate(data.ngayHetHang)}</p>
                                        </CardContent>
                                        {data.soLuongSuDUng > 0 ?
                                            <Button onClick={() => { themMaGiamGiaNgDung(data.maGiamGiaId) }} style={{ height: "37px" }} variant="contained">Thêm mã giảm giá</Button>
                                            :
                                            <Button style={{ height: "37px" }} variant="contained">Hết mã giảm giá</Button>
                                        }
                                    </div>
                                );
                            })
                    }
                </div>

            </div>

        </div>
    )
}
