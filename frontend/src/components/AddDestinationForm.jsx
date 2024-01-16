import React, { useContext, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import DestLogoImage from '../assests/DestForm.jpg';
import DestinationFinder from '../apis/DestinationFinder';
import { DestinationContext } from '../context/DestinationContext';

const useStyles = makeStyles({
  destinationFormContainer: {
    backgroundColor: '#ececec',
    display: 'flex',
    margin: '10px auto',
    width: '50%',
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: '15px',
  },
  formContainer: {
    border: '5px solid #f1f1f1',
    '& h1': {
      textAlign: 'center',
      fontSize: '30px',
      fontWeight: 'bold',
      margin: '10px 0',
    }
  },
  formImgContainer: {
    width: '100%',
    height: '20vh',
    overflow: 'hidden',
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'inherit', 
    }
  },
  formMainContainer: {
    textAlign: 'center',
    margin: '16px 50px 12px',
    '& div': {
      padding: '16px 0',
      textAlign: 'left',
    },
  },
  inputField: {
    width: '100%',
    padding: '16px 8px',
    margin: '8px 0',
    display: 'inline-block',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#2067db',
    color: 'white',
    padding: '14px 0',
    display: 'block',
    border: 'none',
    cursor: 'grab',
    width: '48%',
    margin: '10px auto 30px auto',
    '&:hover': {
      backgroundColor: '#3f51b5',
    },
  },
});

const AddDestinationForm = () => {
  const classes = useStyles();
  let navigate = useNavigate();
  const { addDestination } = useContext(DestinationContext);
  const [ name, setName ] = useState("");
  const [ location, setLocation ] = useState("");
  const [ price, setPrice ] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await DestinationFinder.post("/", {
        name,
        location,
        price_range: price
      })
      addDestination(response.data.data.destination);
      navigate("/");
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.destinationFormContainer}>
    <form className={classes.formContainer}>
      <div className={classes.formImgContainer}>
        <img src={DestLogoImage} alt="Destination Logo"></img>
      </div>
      <h1>Add Destination here!</h1>
      <div className={classes.formMainContainer}>
        <div>
          <label htmlFor="name"><strong>Name of Place</strong></label>
          <input 
          value={name} 
          onChange = {(e) => setName(e.target.value)}
          type="text" 
          placeholder="Enter the Place Name" 
          name="name" required 
          className={classes.inputField}
          />
          <label htmlFor="location"><strong>Location</strong></label>
          <input 
          value={location} 
          onChange = {(e) => setLocation(e.target.value)} 
          type="text" 
          placeholder="Enter location" 
          name="location" required 
          className={classes.inputField} 
          />
          <label htmlFor="price"><strong>Price Start Rate</strong></label>
          <input 
          value={price} 
          onChange = {(e) => setPrice(e.target.value)} 
          type="number" 
          placeholder="Enter Price" 
          name="price" required 
          className={classes.inputField}
          />
        </div>
      </div>
      <button onClick={handleSubmit} type="submit" className={classes.button}><strong>ADD Destination</strong></button>
    </form>
    </div>
  )
}

export default AddDestinationForm;
