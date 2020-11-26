import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
        backgroundColor: '#ecf7fc',
        minWidth: 400,
        border: 'solid 1px',
        '& .MuiTableCell-head': {
            fontWeight: 'bold',
            borderBottom: 'solid 1px',
        }
    },
    header: {
        textAlign: 'center',
    },
    tableHeader: {
        backgroundColor: 'beige',
    },
});

/** Component for showing all Order Details coming from backend  */
const OrderDetails = props => {

    const classes = useStyles();
    const [ordersDetails, setOrderDetails] = useState([]);
    const { match } = props;
    let { id } = match.params;

    useEffect(() => {
        async function fetchOrderDetails() {
            const user = localStorage.getItem('user');
            const res = await axios.get('http://localhost:3000/api/orderdetails/' + id, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(user)
                }
            });
            setOrderDetails(res.data);
        }
        fetchOrderDetails();
    }, [id]);

    return (
        <div className="OrderDetails">
            <h1 className={classes.header} >Order Details</h1>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className={classes.tableHeader}>
                        <TableRow>
                            <TableCell align="center">Product Details Link</TableCell>
                            <TableCell align="center">Order Number</TableCell>
                            <TableCell align="center">Product Code</TableCell>
                            <TableCell align="center">Quantity Ordered</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">OrderLineNumber</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ordersDetails && ordersDetails.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="center" >
                                    <Link to={'/productdetails/' + row.productCode}>{'Click here for Product Details'}</Link>
                                </TableCell>
                                <TableCell align="center">{row.orderNumber}</TableCell>
                                <TableCell align="center">{row.productCode}</TableCell>
                                <TableCell align="center">{row.quantityOrdered}</TableCell>
                                <TableCell align="center">{row.priceEach}</TableCell>
                                <TableCell align="center">{row.orderLineNumber}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default OrderDetails;
