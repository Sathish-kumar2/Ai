import React, { useState } from "react";
import { LoaderCircle } from "lucide-react";

function ChatComponent() {

    const [prompt, setPrompt] = useState("");
    const [chatResponse, setChatResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const askAI = async () => {

        if (!prompt.trim()) return;

        try {

            setLoading(true);

            const response = await fetch(
                `http://localhost:8080/chat?prompt=${prompt}`
            );

            const data = await response.text();

            setChatResponse(data);

        } catch (error) {

            console.error("Error generating response : ", error);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="card-container">

            <h2>Talk to AI</h2>

            <div className="input-section">

                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ask anything..."
                />

                <button
                    onClick={askAI}
                    disabled={loading}
                    className="generate-btn"
                >

                    {loading ? (
                        <>
                            <LoaderCircle
                                size={18}
                                className="spin-icon"
                            />
                            Thinking...
                        </>
                    ) : (
                        "Ask AI"
                    )}

                </button>

            </div>

            <div className="output-box">

                {loading ? (

                    <div className="loading-content">

                        <LoaderCircle
                            size={35}
                            className="spin-icon"
                        />

                        <p>Generating response...</p>

                    </div>

                ) : (

                    <p>{chatResponse || "AI response will appear here..."}</p>

                )}

            </div>

        </div>
    );
}

export default ChatComponent;