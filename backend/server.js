require('dotenv').config();
const express = require('express');
var cors = require('cors')
const db = require('./db');

const PORT = process.env.PORT || 4005;
const app = express();

// middlewares
app.use(cors())
app.use(express.json());

// get all destination data
app.get('/api/destinations', async (req, res) => {
    try {
        // getting destination detailed data with avg rating to show in dest details page
        const destRatingData = await db.query("SELECT * FROM destination LEFT JOIN (SELECT destination_id, COUNT(*), TRUNC(AVG(rating), 1) as Average_rating FROM reviews group by destination_id) reviews on destination.id = reviews.destination_id;");
        res.status(200).json({
        status: 'success',
        results: destRatingData.rows.length,
        data: {
            destinations: destRatingData.rows,
        },
    });
    } catch (error) {
        console.log(error);
    }
});

// get a single destination data
app.get('/api/destinations/:id', async (req, res) => {
    try {
        // this is right way to write Query in psql instead of string literals use $1
        const destination = await db.query("SELECT * FROM destination LEFT JOIN (SELECT destination_id, COUNT(*), TRUNC(AVG(rating), 1) as Average_rating FROM reviews group by destination_id) reviews on destination.id = reviews.destination_id WHERE id = $1", [req.params.id]);

        // get review data from reviews table id
        const review = await db.query("SELECT * FROM reviews WHERE destination_id = $1", [req.params.id]);

        res.status(200).json({
            status: 'success',
            data: {
                destination: destination.rows[0],
                reviews: review.rows
            },
        });
    } catch (error) {
        console.log(error);
    }
});

// create a destination
app.post('/api/destinations', async (req, res) => {
    try {
        const result = await db.query("INSERT INTO destination (name, location, price_range) values ($1, $2, $3) returning *",
        [req.body.name, req.body.location, req.body.price_range]);
        res.status(201).json({
            status: 'success',
            data: {
                destination: result.rows[0],
            },
        });
    } catch (error) {
        console.log(error);
    }
});

// update a destination data
app.put('/api/destinations/:id', async (req, res) => {
    try {
        const result = await db.query(" UPDATE destination SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *",
        [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        res.status(200).json({
            status: 'success',
            data: {
                destination: result.rows[0],
            },
        });
    } catch (error) {
        console.log(error);
    }
});

// delete a destination data
app.delete('/api/destinations/:id', async (req, res) => {
    try {
        // Delete associated reviews first
        await db.query("DELETE FROM reviews WHERE destination_id = $1", [req.params.id]);

        // Now, delete the destination
        const result = await db.query("DELETE FROM destination WHERE id = $1", [req.params.id]);
        
        res.status(204).json({
            status: 'success',
        });
    } catch (error) {
        console.log(error);
    }
});

// create review on particular destination
app.post('/api/destinations/:id/addReview', async (req, res) => {
    try {
        const newReview = await db.query(
            "INSERT INTO reviews (destination_id, name, review, rating) values ($1, $2, $3, $4) returning *",
            [req.params.id, req.body.name, req.body.review, req.body.rating]
        );
        res.status(201).json({
            status: 'success',
            data: {
                review: newReview.rows[0],
            },
        });
    } catch (error) {
        console.log(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});