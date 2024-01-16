import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Box, CircularProgress} from '@mui/material';
import { DestinationContext } from '../context/DestinationContext';
import DestinationFinder from '../apis/DestinationFinder';
import StarRating from '../components/StarRating';
import ReviewCards from '../components/ReviewCards';
import AddReviewForm from '../components/AddReviewForm';

const useStyles = makeStyles({
  destDetailContainer: {
      width: '100%'
  },
  heading : {
    textAlign: 'center',
    color: '#3870ab',
    fontSize: '2.5rem',
    margin: '10px',
    textTransform: 'uppercase',
  },
  avgRating: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px',
  },
  detailsContainer: {
    width: '90%',
    margin: '10px auto',
    display: 'flex',
  },
  detailsLeftContainer: {
    width: '50%',
  },
  detailsRightContainer: {
    width: '50%',
  },
});

const DestinationDetailPage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { selectedDestination, setSelectedDestination } = useContext(DestinationContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DestinationFinder.get(`/${id}`);
        setSelectedDestination(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id, setSelectedDestination]);

  return (
    <div className={classes.destDetailContainer}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <h1 className={classes.heading}>{selectedDestination && selectedDestination.destination.name}</h1>
          <div className={classes.avgRating}>
            <StarRating rating={selectedDestination.destination.average_rating} />
          </div>

          <Box className={classes.detailsContainer}>
            <Box className={classes.detailsLeftContainer}>
              <AddReviewForm />
            </Box>
            <Box className={classes.detailsRightContainer}>
              {selectedDestination.reviews && (
                <ReviewCards reviews={selectedDestination.reviews} />
              )}
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};

export default DestinationDetailPage;
