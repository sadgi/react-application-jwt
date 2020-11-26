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

/** Component for showing all Product Details coming from backend */
const ProductDetails = props => {

    const classes = useStyles();
    const [productDetails, setProductDetails] = useState([]);
    const { match } = props;
    let { id } = match.params;

    useEffect(() => {
        async function fetchProductDetails() {
            const user = localStorage.getItem('user');
            const res = await axios.get('http://localhost:3000/api/productdetails/' + id, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(user)
                }
            });
            setProductDetails(res.data);
        }
        fetchProductDetails();
    }, [id]);

    return (
        <div className="ProductDetails">
            <h1 className={classes.header} >Product Details</h1>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className={classes.tableHeader}>
                        <TableRow>
                            <TableCell align="center">Product Code</TableCell>
                            <TableCell align="center">Product Name</TableCell>
                            <TableCell align="center">Product Line</TableCell>
                            <TableCell align="center">Product Scale</TableCell>
                            <TableCell align="center">Product Vendor</TableCell>
                            <TableCell align="center">Product Description</TableCell>
                            <TableCell align="center">Qunatity InStock  </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productDetails && productDetails.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{row.productCode}</TableCell>
                                <TableCell align="center">{row.productName}</TableCell>
                                <TableCell align="center">{row.productLine}</TableCell>
                                <TableCell align="center">{row.productScale}</TableCell>
                                <TableCell align="center">{row.productVendor}</TableCell>
                                <TableCell align="center">{row.productDescription}</TableCell>
                                <TableCell align="center">{row.quantityInStock}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ProductDetails;
