import {useEffect, useState} from 'react'

import './App.css'

// assuming the socket server is running on localhost:8080
const ws = new WebSocket('ws://localhost:8080');

function App() {
    const [logData, setLogData] = useState('');

    useEffect(() => {
        // Listen for messages from the server
        ws.onmessage = (event) => {
            setLogData(event.data);
        };
    }, []);


    return (
        <div className="App">
            <h1>Log Monitor</h1>
            <pre>{logData}</pre>
        </div>
    )
}

export default App
