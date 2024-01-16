import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    headerContainer: {
        backgroundColor: '#3f51b5',
        padding: '20px',
        textAlign: 'center',
        color: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        '& h4' : {
            fontSize: '1.8rem',
            letterSpacing: '1px',
        },
      },
});

const Header = () => {
    const classes = useStyles();
    return (
        <div className={classes.headerContainer}>
            <h4>Holiday Destination Finder App</h4>
        </div>
    );
};

export default Header;
