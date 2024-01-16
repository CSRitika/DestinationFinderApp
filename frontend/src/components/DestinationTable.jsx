import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DestinationFinder from '../apis/DestinationFinder';
import { DestinationContext } from '../context/DestinationContext';
import StarRating from './StarRating';

const DestinationTable = (props) => {
    const { destinations, setDestinations } = useContext(DestinationContext);
    let navigate = useNavigate();

    // using axios to fetch
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await DestinationFinder.get("/");
                setDestinations(response.data.data.destinations);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    // handling delete functionality
    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            await DestinationFinder.delete(`/${id}`);
            setDestinations((prevDestinations) => {
                return prevDestinations.filter((destination) => destination.id !== id);
            });
        } catch (error) {
            console.log(error);
        }
    };

    // handling Update functionality
    const handleUpdate = (e, id) => {
        e.stopPropagation();
        navigate(`destinations/${id}/update`);
    };

    // handling selecting destination field functionality
    const handleDestinationSelect = (id) => {
        navigate(`destinations/${id}`);
    };

    // rendering rating from here
    const renderRating = (destination) => {
        if (!destination.count) {
            return <span className='text-warning'>0 reviews</span>
        }
        return (
            <>
            <StarRating rating={destination.id} />
            <span className='text-warning'>({destination.count})</span>
            </>
        );
    };

    return (
        <div className='list-group mx-auto' style={{ width: '90%' }}>
            <table className='table table-hover'>
                <thead className='table table-hover table-info'>
                    <tr className='bg-primary'>
                        <th scope='col'>Destination</th>
                        <th scope='col'>Location</th>
                        <th scope='col'>Starting Price</th>
                        <th scope='col'>Rating</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {destinations && destinations.map((destination) => {
                        return (
                            <tr 
                            onClick={() => {handleDestinationSelect(destination.id)}} 
                            key={destination.id} 
                            style={{ cursor: 'pointer'
                            }}>
                                <Tooltip title="Click to view">
                                <td style={{ fontWeight: 500}}>{destination.name}</td>
                                </Tooltip>
                            <td style={{ fontWeight: 500}}>{destination.location}</td>
                            <td style={{ fontWeight: 500}}>Rs. {destination.price_range}</td>
                            <Tooltip title="Click to add & view rating">
                            <td>{renderRating(destination)}</td>
                            </Tooltip>
                            <td>
                                <IconButton onClick={(e) => handleUpdate(e, destination.id)} color="primary" aria-label="edit">
                                    <EditNoteIcon />
                                </IconButton>
                            </td>
                            <td>
                                <IconButton onClick={(e) => handleDelete(e, destination.id)} color="error" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DestinationTable;
