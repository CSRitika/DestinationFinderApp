import React from 'react';
import { Divider, Typography, CardContent, Card } from '@mui/material';
import StarRating from './StarRating';

const ReviewCards = ({ reviews }) => {
  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Card
            key={review.id}
            sx={{ maxWidth: 345, backgroundColor: '#2067db', margin: '0px 20px 20px 20px' }}
          >
            <CardContent
              sx={{
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography gutterBottom variant="h6" component="div" sx={{ marginBottom: '0px', color: 'white' }}>
                {review.name}
              </Typography>
              <Typography gutterBottom variant="subtitle2" component="div">
                <StarRating rating={review.rating} />
              </Typography>
            </CardContent>
            <Divider sx={{ borderColor: 'rgba(0, 0, 0, 8.5)' }} />
            <CardContent sx={{ padding: '10px', paddingBottom: '15px' }}>
              <Typography variant="body2" sx={{ fontWeight: '500', color: '#fff' }}>
                {review.review}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body2">No reviews available for this destination.</Typography>
      )}
    </div>
  );
};

export default ReviewCards;
