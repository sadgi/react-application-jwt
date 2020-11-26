import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    header: {
        textAlign: 'center',
    },
    app: {
        backgroundColor: 'beige',
        textAlign: 'center',
        height: '350px',
        width: '60%',
        margin: 'auto',
        padding: '10px',
        border: '1px solid'
    },
    textFields: {
        display: 'flex',
    },
    label: {
        fontWeight: 'bold',
        marginRight: '20px',
        marginLeft: '90px',
        paddingTop: '20px',
    },
    button: {
        marginTop: '20px',
    }
});

/** App component for showing Login Page for user authentication from backend */
const App = () => {

    const classes = useStyles();
    const [email, setEmail] = useState(null);
    const [password, setPwd] = useState(null);
    const [authErrorExist, setAuthErrorExist] = useState(false);
    const history = useHistory();

    // login handler function which also set token into local storage
    const login = () => {
        axios.post('http://localhost:3000/auth/login', {
            email: email,
            password: password
        }).then((resp) => {
            localStorage.setItem("user", JSON.stringify(resp.data.token));
            history.push("/customers");
        }).catch(err => {
            setAuthErrorExist(true);
            setEmail('');
            setPwd('');
        })
    }

    return (
        <div className='App'>
            <h1 className={classes.header}>Login Page</h1>
            <div className={classes.app}>
                <h1>Enter your Details</h1>
                {authErrorExist && <div>Unauthorized user. Please try again!</div>}
                <div className={classes.textFields}>
                    <span className={classes.label}> {'Enter User Name'}</span>
                    <TextField
                        variant="standard"
                        placeholder="Username"
                        margin="normal"
                        required
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                    />
                </div>
                <br />
                <div className={classes.textFields}>
                    <span className={classes.label}> {'Enter Password'}</span>
                    <TextField
                        variant="standard"
                        placeholder="Password"
                        margin="normal"
                        required
                        type="password"
                        onChange={(event) => setPwd(event.target.value)}
                        value={password}
                    />
                </div>
                <br />
                <div className={classes.button}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={login}
                    >
                        Log In
             </Button>
                </div>
            </div>
        </div>
    );
};

export default App;