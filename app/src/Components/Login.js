import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { useForm } from 'react-hook-form'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Form from '../Components/Ingredients/Form'
import Header from '../Components/Header'
import App from '../Components/App'
import Image from '../images/img.png';


const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundImage: `url(${Image})`,
    height: '874px',
    //width: '1168px',
    //left: '968px',
    top: '330px',
    borderRadius: '0px'

  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 425,
    height: 467,
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    margin: theme.spacing(3.5),
  },
  margin: {
    margin: theme.spacing(1),
  },
    form: {
        margin: theme.spacing(1),
    },
  textField: {
    width: '30ch',
    marginLeft: theme.spacing(8.5),
    marginBottom: theme.spacing(1),
  },
  loginBtn: {
    width: '325px', 
    height: '50px', 
    marginLeft: 'auto', 
    marginRight: 'auto', 
    marginTop: '-100px'
  }
}));

export default function InputAdornments() {
  const classes = useStyles();
  const { handleSubmit } = useForm();
  const [values, setValues] = useState({ email: '', password: '', token: ''});
  const [token, setToken] = useState(null);

  const handleChange = (prop) => (event) => {
    console.log(prop)
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = () => {
    async function fetchData(){
        try {
            await fetch(`http://localhost:3000/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify ({
                    "email": values.email, 
                    "password": values.password,
                }),
            })
            .then(res => res.json())
            .then(response => {
              console.log(response.token)
              return setToken(response.token);
            })
            
        } catch(err){
            console.log(`fetch: ${err}`);
        } 
    }
    fetchData();
  };

  const enterenceForm = () => {
    return (
      <div className={classes.wrapper}>
        <Header />
      <Paper component="form" className={classes.root} >
        <div className={classes.form} >
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel htmlFor="standard-adornment-password">Email Address</InputLabel>
            <Input
              id="standard-adornment-password"
              label="With normal TextField"
              value={values.email}
              onChange={handleChange('email')}
            />
          </FormControl>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              label="With normal TextField"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <Button variant="contained" className={classes.loginBtn} onClick={(e) => { onSubmit(e) }}>
              Login
        </Button>
      </Paper>
      </div>
    );
  }

  return token === null ? enterenceForm(): <App value={token}/> 
}