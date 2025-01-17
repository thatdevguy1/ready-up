# Ready Up

https://readyup-rooms.herokuapp.com/

Ready Up is a lightweight and interactive app designed to help groups track readiness during exercises, events, or other collaborative activities. The app is built using modern web technologies like React, Express, Socket.IO, and MaterialUI. It operates without a database, making it simple and efficient for real-time communication without any data persistence.

## Features

- **Real-time Readiness Tracking**: Instantly see who is ready to move on with the help of Socket.IO for real-time communication.
- **User-Friendly Interface**: Built with MaterialUI to provide a clean and responsive design.
- **Lightweight Architecture**: No database dependency; data is managed in memory for simplicity and speed.
- **Customizable**: Easily adaptable for various use cases such as workshops, team exercises, or events.

## Tech Stack

- **Frontend**: React with MaterialUI for the user interface.
- **Backend**: Express.js for handling API routes and server logic.
- **Real-Time Communication**: Socket.IO for enabling live updates across clients.

## Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher) or yarn

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ready-up.git
   cd ready-up
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the server:

   ```bash
   npm start
   ```

4. Start the client:

   ```bash
   npm run start-react
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

1. Access the app in your browser.
2. Participants can join the session by entering their names.
3. Click the "Ready" button to indicate readiness.
4. The real-time interface updates instantly to show who is ready.

## Project Structure

```
ready-up/
|
│── src/
│   ├── components/  # Reusable React components
│   ├── App.js       # Main app entry point
│   └── index.js     # React DOM rendering
│── public/          # Static assets
├── backend/              # Express backend
│   ├── controllers       # User and Room controllers
│   ├── models            # User Models
│   ├── routes            # User and Room routes
│   └── socket            # Socket.IO logic
├── package.json         # Project metadata and scripts
├── README.md            # Project documentation
└── ...
```

## Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request with your enhancements.

### To-Do List

- [ ] Add customizable themes.
- [ ] Implement user roles (e.g., admin to reset readiness).
- [ ] Add persistance of user and room data for reconnects.

---

Feel free to use this app to keep your events organized and on track!
