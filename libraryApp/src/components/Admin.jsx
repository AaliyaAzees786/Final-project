import React, { useState, useEffect } from 'react';
import './Admin.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Viewbooks = () => {
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: '', status: 'available' });

    useEffect(() => {
        // Fetch users and books from the API
        fetchUsers();
        fetchBooks();
    }, []);

    const fetchUsers = async () => {
        try {
            // Fetch users from the backend
            const response = await axios.get('http://localhost:3000/user');
            const data = response.data;

            // Log data to check structure
            console.log('Fetched Users:', data);

            // Filter out users with the role 'admin'
            const nonAdminUsers = data.filter(user => user.Role.toLowerCase() !== 'admin');

            // Set the state with non-admin users only
            setUsers(nonAdminUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchBooks = async () => {
        try {
            // Fetch books from the backend
            const response = await axios.get('http://localhost:3000/book');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleAddOrUpdateBook = async (e) => {
        e.preventDefault();
        // Add or update book in the backend
        try {
            await axios.post('http://localhost:3000/books', newBook);
            setNewBook({ title: '', status: 'available' });
            fetchBooks();
        } catch (error) {
            console.error('Error adding or updating book:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            // Send a delete request to the backend
            await axios.delete(`http://localhost:3000/user/${id}`);
            // Update the users state by filtering out the deleted user
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    

    const handleBlockUser = async (id) => {
        try {
            // Update user status to 'blocked' in the backend
            await axios.put(`http://localhost:3000/user/${id}`, { status: 'blocked' });
            // Update the users state to reflect the change
            setUsers(users.map(user => 
                user.id === id ? { ...user, status: 'blocked' } : user
            ));
        } catch (error) {
            console.error('Error blocking user:', error);
        }
    };
    

    const handleNotifyUser = async (id) => {
        try {
            // Notify user by sending a message or email via the backend
            await axios.post(`http://localhost:3000/notify`, { userId: id, message: 'You have a new notification!' });
            console.log('Notification sent to user:', id);
        } catch (error) {
            console.error('Error notifying user:', error);
        }
    };
    

    const handleDeleteBook = async (id) => {
        try {
            // Send a delete request to the backend
            await axios.delete(`http://localhost:3000/book/${id}`);
            // Update the books state by filtering out the deleted book
            setBooks(books.filter(book => book.id !== id));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
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
                                <td>{user.Username}</td>
                                <td>{user.EmailId}</td>
                                <td>
                                    <button id="button_1" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                    <button id="button_1" onClick={() => handleBlockUser(user.id)}>Block</button>
                                    <button id="button_1" onClick={() => handleNotifyUser(user.id)}>Notify</button>
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
                    <button type="submit">Update Book</button>
                    <Link to="/addbook"><button type="button">Add Book</button></Link>
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
