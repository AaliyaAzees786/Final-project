import React, { useState, useEffect } from 'react';
import './Admin.css';
import axios from 'axios';

const Viewbooks = () => {
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: '', status: 'available' });

    useEffect(()=>{
      axios.get('http://localhost:3000').then((res)=>{
      setUsers(res.data)
    })
    },[])
    useEffect(() => {
        // Fetch users and books from API
        fetchUsers();
        fetchBooks();
    }, []);

    const fetchUsers = async () => {
        // Fetch users from the backend
        const response = await fetch('/user');
        const data = await response.json();
        setUsers(data);
    };

    const fetchBooks = async () => {
        // Fetch books from the backend
        const response = await fetch('/books');
        const data = await response.json();
        setBooks(data);
    };

    const handleAddOrUpdateBook = async (e) => {
        e.preventDefault();
        // Add or update book in the backend
        await fetch('books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBook),
        });
        setNewBook({ title: '', status: 'available' });
        fetchBooks();
    };

    return (
        <div className="viewbooks-container">
            <header>
                <h1>Admin Dashboard</h1>
                <nav>
                    <ul>
                        <li><a href="#manage-users">Manage Users</a></li>
                        <li><a href="#manage-books">Manage Books</a></li>
                    </ul>
                </nav>
            </header>

            <section id="manage-users">
                <h2>Manage Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                    <button onClick={() => handleBlockUser(user.id)}>Block</button>
                                    <button onClick={() => handleNotifyUser(user.id)}>Notify</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section id="manage-books">
                <h2>Manage Books</h2>
                <form onSubmit={handleAddOrUpdateBook}>
                    <label htmlFor="book-title">Book Title:</label>
                    <input
                        type="text"
                        id="book-title"
                        value={newBook.title}
                        onChange={e => setNewBook({ ...newBook, title: e.target.value })}
                    />
                    <label htmlFor="book-status">Status:</label>
                    <select
                        id="book-status"
                        value={newBook.status}
                        onChange={e => setNewBook({ ...newBook, status: e.target.value })}
                    >
                        <option value="available">Available</option>
                        <option value="rented">Rented</option>
                    </select>
                    <button type="submit">Add/Update Book</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Book ID</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.status}</td>
                                <td>
                                    <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Viewbooks;
