# Notification System Design

## Overview

This project is a simple notification system built using Python and React.  
It fetches notifications from the given API and displays important notifications first.

---

# Stage 1

In Stage 1, notifications are fetched using the API and sorted based on priority and timestamp.

Priority order used:

- Placement → Highest priority
- Result → Medium priority
- Event → Lowest priority

If two notifications have the same type, the latest notification is shown first.

The top 10 notifications are displayed.

---

# Stage 2

In Stage 2, a React frontend was created to display notifications in a user-friendly way.

Features implemented:
- View notifications
- Filter by notification type
- Pagination
- Responsive design

Each notification card shows:
- ID
- Type
- Message
- Timestamp

---

# API Used

```text
GET /evaluation-service/notifications
```

Authorization is handled using a Bearer Token.

---

# Logging

A reusable logging middleware was created for logging API activities and errors.

Supported log levels:
- info
- warn
- error
- debug

---

# Conclusion

This system successfully fetches, sorts, and displays notifications using both backend and frontend implementations.
