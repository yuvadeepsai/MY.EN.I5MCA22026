import requests
from datetime import datetime

TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzbmFwZHJhZ28yNkBnbWFpbC5jb20iLCJleHAiOjE3NzgwNjI2ODUsImlhdCI6MTc3ODA2MTc4NSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjA4ZjJjNzRhLTgzNGQtNGU4ZS1hOWJlLWY0NTRlNDQ0YmFjNCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFtcnV0aGFsdXJpIHl1dmFkZWVwIiwic3ViIjoiMDI4YTI1YjgtM2NjNS00MzYzLWIzYjgtNjcxODQ0ZWIzZGIxIn0sImVtYWlsIjoic25hcGRyYWdvMjZAZ21haWwuY29tIiwibmFtZSI6ImFtcnV0aGFsdXJpIHl1dmFkZWVwIiwicm9sbE5vIjoibXkuZW4uaTVtY2EyMjAyNiIsImFjY2Vzc0NvZGUiOiJQVEJNbVEiLCJjbGllbnRJRCI6IjAyOGEyNWI4LTNjYzUtNDM2My1iM2I4LTY3MTg0NGViM2RiMSIsImNsaWVudFNlY3JldCI6IlRFbWVkdWtacmJXR1FVeFMifQ.pRj-m-QeHbdlKy5sL9sq6XrSFKk3AcWhhGM1KEXtZ9Q"
URL = "http://20.207.122.201/evaluation-service/notifications"

headers = {
    "Authorization": f"Bearer {TOKEN}"
}
priority = {
    "Placement": 3,
    "Result": 2,
    "Event": 1
}
try:
    response = requests.get(URL, headers=headers)
    data = response.json()
    notifications = data["notifications"]
    sorted_N = sorted(
        notifications,
        key=lambda x: (
            -priority.get(x["Type"], 0),

            -datetime.strptime(
                x["Timestamp"],
                "%Y-%m-%d %H:%M:%S"
            ).timestamp()
        )
    )
    top10 = sorted_N[:10]
    print("\nTop 10 Notifications\n")
    for i, n in enumerate(top10, 1):
        print(f"{i}. {n['Message']}")
        print("Type      :", n["Type"])
        print("Timestamp :", n["Timestamp"])
        print()
except Exception as e:
    print("Error:", e)