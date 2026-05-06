import React, { useEffect, useState } from "react";
import "./App.css";

function App() {

    const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzbmFwZHJhZ28yNkBnbWFpbC5jb20iLCJleHAiOjE3NzgwNjI2ODUsImlhdCI6MTc3ODA2MTc4NSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjA4ZjJjNzRhLTgzNGQtNGU4ZS1hOWJlLWY0NTRlNDQ0YmFjNCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFtcnV0aGFsdXJpIHl1dmFkZWVwIiwic3ViIjoiMDI4YTI1YjgtM2NjNS00MzYzLWIzYjgtNjcxODQ0ZWIzZGIxIn0sImVtYWlsIjoic25hcGRyYWdvMjZAZ21haWwuY29tIiwibmFtZSI6ImFtcnV0aGFsdXJpIHl1dmFkZWVwIiwicm9sbE5vIjoibXkuZW4uaTVtY2EyMjAyNiIsImFjY2Vzc0NvZGUiOiJQVEJNbVEiLCJjbGllbnRJRCI6IjAyOGEyNWI4LTNjYzUtNDM2My1iM2I4LTY3MTg0NGViM2RiMSIsImNsaWVudFNlY3JldCI6IlRFbWVkdWtacmJXR1FVeFMifQ.pRj-m-QeHbdlKy5sL9sq6XrSFKk3AcWhhGM1KEXtZ9Q";

    const [notifications, setNotifications] = useState([]);
    const [type, setType] = useState("");
    const [page, setPage] = useState(1);

    const limit = 10;
    useEffect(() => {

        async function fetchNotifications() {

            try {

                let url =
                    `http://20.207.122.201/evaluation-service/notifications?page=${page}&limit=${limit}`;

                if (type !== "") {
                    url += `&notification_type=${type}`;
                }

                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`
                    }
                });

                const data = await response.json();

                console.log(data);

                setNotifications(
                    data.data?.notifications ||
                    data.notifications ||
                    []
                );

            } catch (error) {

                console.log(error);

            }
        }

        fetchNotifications();

    }, [page, type]);

    return (

        <div className="container">
            <h1>Notification Dashboard</h1>
            <div className="filters">
                <select
                    onChange={(e) => setType(e.target.value)}>
                    <option value="">All</option>
                    <option value="Event">Event</option>
                    <option value="Result">Result</option>
                    <option value="Placement">Placement</option>
                </select>
            </div>
            <div className="notification-list">
                {
                    notifications.map((n, index) => (
                        <div
                            key={index}
                            className="card"
                        >
                            <h3>{n.Message}</h3>
                            <p>
                                <strong>ID:</strong> {n.ID}
                            </p>
                            <p>
                                <strong>Type:</strong> {n.Type}
                            </p>
                            <p>
                                <strong>Timestamp:</strong> {n.Timestamp}
                            </p>
                        </div>

                    ))
                }

            </div>

            <div className="buttons">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span>Page {page}</span>
                <button
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default App;