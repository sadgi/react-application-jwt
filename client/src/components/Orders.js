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

/** Component for showing all Orders coming from backend */
const Orders = props => {

	const classes = useStyles();
	const [ordersData, setOrdersData] = useState([]);
	const { match } = props;
	let { id } = match.params;

	useEffect(() => {
		async function fetchOrders() {
			const user = localStorage.getItem('user');
			const res = await axios.get('http://localhost:3000/api/orders/' + id, {
				headers: {
					Authorization: 'Bearer ' + JSON.parse(user)
				}
			});
			setOrdersData(res.data);
		}
		fetchOrders();

	}, [id]);

	return (
		<div className="Orders">
			<h1 className={classes.header} >Orders</h1>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead className={classes.tableHeader}>
						<TableRow>
							<TableCell align="center">Order Details Link</TableCell>
							<TableCell align="center">Order Number</TableCell>
							<TableCell align="center">Order Date</TableCell>
							<TableCell align="center">Required Date</TableCell>
							<TableCell align="center">Shipped Date</TableCell>
							<TableCell align="center">Status</TableCell>
							<TableCell align="center">Comments</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ordersData && ordersData.map((row, index) => (
							<TableRow key={index}>
								<TableCell align="center" >
									<Link to={'/orderdetails/' + row.orderNumber}>{'Click here for Order Details'}</Link>
								</TableCell>
								<TableCell align="center">{row.orderNumber}</TableCell>
								<TableCell align="center">{row.orderDate}</TableCell>
								<TableCell align="center">{row.requiredDate}</TableCell>
								<TableCell align="center">{row.shippedDate}</TableCell>
								<TableCell align="center">{row.status}</TableCell>
								<TableCell align="center">{row.comments}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default Orders;
