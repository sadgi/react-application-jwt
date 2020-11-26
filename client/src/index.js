import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import CustomerList from './components/CustomerList';
import Orders from './components/Orders';
import OrderDetails from './components/OrderDetails';
import ProductDetails from './components/ProductDetails';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Route exact path='/customers' component={CustomerList} />
			<Route exact path='/' component={App} />
			<Route path='/orders/:id' component={Orders} />
			<Route path='/orderdetails/:id' component={OrderDetails} />
			<Route path='/productdetails/:id' component={ProductDetails} />
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
