import React, { useState, useEffect } from 'react';

export default function TicketForm({ dispatch, editingTicket }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('1');

    useEffect(() => {

        if(editingTicket)
        {
            setTitle(editingTicket.title);
            setDescription(editingTicket.description);
            setPriority(editingTicket.priority);
        }
        else
        {
            clearForm();
        }

    }, [editingTicket])
    // The effect will start when we have an editing ticket

    const priorityLabels = {
        1: 'Low',
        2: 'Medium',
        3: 'High'
    };

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setPriority('1');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // creating a Ticket Object after form submission
        const ticketData = {
            // if we are editing a ticket, use its 'id'.
            // else, generate a new id
            id: editingTicket ? editingTicket.id : new Date().toISOString(),
            title,
            description,
            priority
        };

        dispatch({
            type: editingTicket ? "UPDATE_TICKET" : "ADD_TICKET",
            payload: ticketData
        });

        clearForm();
    };

    const handleCancelEdit = () => {
        dispatch({type: "CLEAR_EDITING_TICKET"})
        clearForm();
    }

    return (
        <form onSubmit={handleSubmit} className='ticket-form'>
            <div>
                <label>Title</label>
                <input 
                    type='text' 
                    value={title} 
                    className='form-input' 
                    onChange={e => setTitle(e.target.value)}
                ></input>
            </div>

            <div>
                <label>Description</label>
                <textarea 
                    type='text' 
                    value={description} 
                    className='form-input' 
                    onChange={e => setDescription(e.target.value)}
                ></textarea>
            </div>

            <fieldset className='priority-fieldset'>
                <legend>Priority</legend>

                {
                    Object.entries(priorityLabels).map(([value, label]) => (
                        // we return a "label" for each priority choice
                        <label key={value} className='priority-label'>
                            <input 
                                type='radio' 
                                value={value} 
                                checked={priority === value}
                                className='priority-input'
                                onChange={e => setPriority(e.target.value)}
                            ></input>

                            {label}
                        </label>
                    ))
                }
            </fieldset>

            <button 
                type='Submit' 
                className='button'>
            Submit
            </button>

            {editingTicket && (
                <button 
                    className='button'
                    onClick={handleCancelEdit}>
                Cancel Edit
                </button>
            )}
        </form>
    );
}