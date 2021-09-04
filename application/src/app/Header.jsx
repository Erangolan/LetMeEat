import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header(props) {
  const token = props.value;
  const [title, setTitle] = useState('Login');
  const classes = useStyles();
  const { onTouch } = props;

  const handleClick = () => {
    console.log(token);
    if (token !== undefined) { onTouch(1); }
  };

  useEffect(() => {
    token !== undefined ? setTitle('Profile') : setTitle('Login');
  });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Let Me Eat!
          </Typography>
          <Button color="inherit" onClick={handleClick}>
            {title}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
