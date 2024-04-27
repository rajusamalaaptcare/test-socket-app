import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null); // State to hold WebSocket instance
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (ws) {
            ws.onopen = () => {
                console.log('Connected to server');
                setIsConnected(true);
            };

            ws.onmessage = (event) => {
                const completeMessage = JSON.parse(event.data);
                setMessages([...completeMessage]); // Set messages array with only the latest message
            };

            ws.onclose = () => {
                console.log('Connection closed');
                setIsConnected(false);
            };
        }
    }, [ws]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!isConnected) {
            alert('You are not connected to the server');
        }
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(text);
        }
        setText('');
    };

    const toggleConnection = () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.close();
            setWs(null);
        } else {
            const newWs = new WebSocket('ws://localhost:8080');
            setWs(newWs);
        }
    };

    console.log(messages);

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text"
                />
                <button type="submit">Send</button>
            </form>
            <button onClick={toggleConnection}>
                {isConnected ? 'Disconnect' : 'Connect'}
            </button>
            <ul>
                {messages.slice().reverse().map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
