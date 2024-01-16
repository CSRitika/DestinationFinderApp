import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '@mui/material/Button';
import DestinationTable from '../components/DestinationTable';

const DestinationTablePage = () => {
  const navigate = useNavigate();

   // navigate to add destination page
   const handleAddDestination = () => {
    navigate(`add/destination`);
};
  return (
    <>
    <Header />
    <div style={{ display: 'flex', width: '90%', margin: '10px auto'}}>
      <div style={{ width: '50%'}}>
        <h6>Here you can find Best Destination Place for your holidays</h6>
        <h6>You can Add, Edit or Delete, View Destination and and can see Details About Places in like Reviews Etc.</h6>
        <h6>You can add Your review also by clicking on rows...</h6>
      </div>
      <div style={{ width: '50%', position: 'relative' }}>
      <Button
      onClick={handleAddDestination} 
      style={{ position: 'absolute', bottom: 0, right: 0 }} 
      color="info" variant="contained"
      >
       + Add New Destination
      </Button>
      </div>
    </div>
    <DestinationTable />
    </>
  )
};

export default DestinationTablePage;
