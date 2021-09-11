/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
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
import Image from '../images/img.png';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import { login } from './userSlice'
import { Link, Redirect } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundImage: `url(${Image})`,
    height: '874px',
    top: '330px',
    borderRadius: '0px'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 425,
    height: 467,
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

export const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const loginStatus = useSelector((state) => state.users.status)
  const [values, setValues] = useState({ email: '', password: '' });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
  }, [loginStatus, dispatch])

  const onSubmit = () => {
    dispatch(login(values))
  };

  return loginStatus === 'succeeded' ? <Redirect to="/ingredients" /> : (
    <div className={classes.wrapper}>
      <Paper component="form" className={classes.root} >
        <div className={classes.form} >
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              value={values.email}
              onChange={handleChange('email')}
              labelWidth={70}
            />
          </FormControl>
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </div>
        <Button variant="contained" className={classes.loginBtn} onClick={(e) => { onSubmit(e) }} >
              Login
        </Button>
      </Paper>
    </div>
  );
}
