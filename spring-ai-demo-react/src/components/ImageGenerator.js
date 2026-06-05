import React, { useState } from "react";
import { Download, LoaderCircle } from "lucide-react";

function ImageGenerator() {

    const [prompt, setPrompt] = useState("");
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(false);

    const generateImage = async () => {

        if (!prompt.trim()) return;

        try {

            setLoading(true);

            const response = await fetch(
                `http://localhost:8080/generate?prompt=${prompt}`
            );

            const blob = await response.blob();

            const imageUrl = URL.createObjectURL(blob);

            setImageUrls([imageUrl]);

        } catch (error) {

            console.error("Error generating image :", error);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="tab-content">

            <h2>Generate Image</h2>

            <div className="input-section">

                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter image prompt"
                />

                <button
                    onClick={generateImage}
                    disabled={loading}
                    className="generate-btn"
                >

                    {loading ? (
                        <>
                            <LoaderCircle className="spin-icon" size={18} />
                            Generating...
                        </>
                    ) : (
                        "Generate Image"
                    )}

                </button>

            </div>

            <div className="image-container">

                {loading ? (

                    <div className="loading-box">

                        <LoaderCircle
                            className="spin-icon"
                            size={40}
                        />

                        <p>Generating Image...</p>

                    </div>

                ) : imageUrls.length > 0 ? (

                    <div className="image-wrapper">

                        <img
                            src={imageUrls[0]}
                            alt="Generated"
                            className="generated-image"
                        />

                        <a
                            href={imageUrls[0]}
                            download="generated-image.png"
                            className="download-btn"
                        >
                            <Download size={18} />
                        </a>

                    </div>

                ) : (

                    <div className="empty-image-slot">
                        No Image Generated
                    </div>

                )}

            </div>

        </div>
    );
}

export default ImageGenerator;