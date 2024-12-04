const { response } = require("express");
document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm'); // Assuming you have a form with ID 'userForm'
    const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0]; // Table body reference

    // Function to fetch and display users
    function fetchUsers() {
        fetch('/users') // Assuming your backend endpoint is `/users`
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                return response.json();
            })
            .then(users => {
                usersTable.innerHTML = ''; // Clear the table before adding rows
                users.forEach(user => {
                    const row = usersTable.insertRow(); // Create a new row for each user
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                    `;
                });
            })
            .catch(error => console.error('Error:', error));
    }

    userForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({name, email})
        })
            .then(response => response.json())
            .then(user => {
                userForm.reset();
                fetchUsers();
            })
            .catch(error => console.error('Error:', error));
    });

    fetchUsers();

});