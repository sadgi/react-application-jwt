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

/** Component for Showing list of all customers coming from backend */
const CustomerList = () => {

    const classes = useStyles();
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchCustomerData() {
            const user = localStorage.getItem('user');
            const res = await axios.get('http://localhost:3000/api/customers', {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(user)
                }
            });
            setData(res.data);
        }
        fetchCustomerData();
    }, []);

    return (
        <div className="CustomerList">
            <h1 className={classes.header} >Customer List</h1>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className={classes.tableHeader}>
                        <TableRow>
                            <TableCell align="center">Orders Link</TableCell>
                            <TableCell align="center">Customer Number</TableCell>
                            <TableCell align="center">Customer Name</TableCell>
                            <TableCell align="center">Contact First Name</TableCell>
                            <TableCell align="center">Contact LastName</TableCell>
                            <TableCell align="center">Address Line1</TableCell>
                            <TableCell align="center">Address Line2</TableCell>
                            <TableCell align="center">City</TableCell>
                            <TableCell align="center">Country</TableCell>
                            <TableCell align="center">Credit Limit</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Postal Code</TableCell>
                            <TableCell align="center">Sales Employee Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((row, index) => (
                            <TableRow key={row.customerNumber}>
                                <TableCell align="center" >
                                    <Link to={'/orders/' + row.customerNumber}>{'Click here for Orders'}</Link>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.customerNumber}
                                </TableCell>
                                <TableCell align="center">{row.customerName}</TableCell>
                                <TableCell align="center">{row.contactFirstName}</TableCell>
                                <TableCell align="center">{row.contactLastName}</TableCell>
                                <TableCell align="center">{row.addressLine1}</TableCell>
                                <TableCell align="center">{row.addressLine2}</TableCell>
                                <TableCell align="center">{row.city}</TableCell>
                                <TableCell align="center">{row.country}</TableCell>
                                <TableCell align="center">{row.creditLimit}</TableCell>
                                <TableCell align="center">{row.phone}</TableCell>
                                <TableCell align="center">{row.postalCode}</TableCell>
                                <TableCell align="center">{row.salesRepEmployeeNumber}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CustomerList;
