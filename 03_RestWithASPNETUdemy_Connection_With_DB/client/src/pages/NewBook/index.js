import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImage from '../../assets/logo.svg';

export default function NewBook() {
    const [id, setId] = useState(null);
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [launchDate, setlaunchDate] = useState('');
    const [price, setPrice] = useState('');

    const { bookId } = useParams();

    const accessToken = localStorage.getItem('accessToken');
    const authorization = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if(bookId === '0') return;
        
        loadBook();
    }, bookId);

    async function loadBook() {
        try {
            const response = await api.get(`api/book/v1/${bookId}`, authorization);

            let adjustedDate = response.data.launchDate.split("T", 10)[0];
            setId(response.data.id);
            setTitle(response.data.title);
            setAuthor(response.data.author);
            setPrice(response.data.price);
            setlaunchDate(adjustedDate);
        } catch (error) {
            alert('Error recoveriong Book! Try again!');
            navigate('/books');
            
        }
    }
    
    async function saveOrUpdate(e) {
        e.preventDefault();

        const data = {
            title,
            author,
            launchDate,
            price
        };

        try {
            if(bookId === '0') {
                await api.post('api/Book/v1', data, authorization);
            } else {
                data.id = id;
                await api.put('api/Book/v1', data, authorization);
            }

        } catch (error) {
            alert('Error while recording Book! Try again!');
            console.log('Error while recording Book -', error)
        }

        navigate('/books');

    }

    return(
        <div className="new-book-container">
            <div className="content">
                <section className="form">
                    <img src={logoImage} alt="Erudio"/>
                    <h1>{bookId === '0'? 'Add New': 'Update'} Book</h1>
                    <p>Enter the book information and click on {bookId === '0'? `'Add'`: `'Update'`}</p>
                    <Link className="backlink" to="/books">
                        <FiArrowLeft size={16} color="#251fc5"/>
                        Back to Books
                    </Link>
                </section>

                <form onSubmit={saveOrUpdate}>
                    <input 
                        placeholder="Title" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input 
                        placeholder="Author" 
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                    />
                    <input 
                        type="date" 
                        value={launchDate}
                        onChange={e => setlaunchDate(e.target.value)}
                    />
                    <input 
                        placeholder="Price" 
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />

                    <button className="button" type="submit">{bookId === '0'? 'Add': 'Update'}Add</button>
                </form>
            </div>
        </div>
    );
}