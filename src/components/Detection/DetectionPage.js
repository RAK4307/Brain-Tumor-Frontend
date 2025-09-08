import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Chatbot from '../Chatbot/Chatbot'; // Import the Chatbot
import { useAuth } from '../../context/AuthContext';
import './DetectionPage.css';

function DetectionPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const { token, isLoggedIn } = useAuth();

    // Helper to convert Base64 string back to a File object
    const dataURLtoFile = (dataurl, filename) => {
        if (!dataurl) return null;
        const arr = dataurl.split(',');
        if (arr.length < 2) return null;
        const mimeMatch = arr[0].match(/:(.*?);/);
        if (!mimeMatch) return null;
        const mime = mimeMatch[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    // Function to clear the stored data
    const clearStoredData = () => {
        localStorage.removeItem('detectionImage');
        localStorage.removeItem('detectionImageName');
        localStorage.removeItem('detectionResult');
        setSelectedFile(null);
        setPreview(null);
        setResult(null);
    };

    // Clear stored data on logout
    useEffect(() => {
        if (!isLoggedIn) {
            clearStoredData();
        }
    }, [isLoggedIn]);
    // On initial mount or login, load state from localStorage
    useEffect(() => {
        // Only load persisted state if the user is logged in
        if (isLoggedIn) {
            const storedImage = localStorage.getItem('detectionImage');
            const storedResult = localStorage.getItem('detectionResult');
            const storedImageName = localStorage.getItem('detectionImageName');

            if (storedImage && storedImageName) {
                setPreview(storedImage);
                const file = dataURLtoFile(storedImage, storedImageName);
                setSelectedFile(file);
            }

            if (storedResult) {
                setResult(JSON.parse(storedResult));
            }
        }
    }, [isLoggedIn]); // Rerun this if login status changes

    const processFile = (file) => {
        if (file) {
            setSelectedFile(file);
            setResult(null); // Clear previous result from state

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setPreview(base64String);
                // Only persist to localStorage if logged in
                if (isLoggedIn) {
                    localStorage.removeItem('detectionResult'); // And from storage
                    localStorage.setItem('detectionImage', base64String);
                    localStorage.setItem('detectionImageName', file.name);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        processFile(file);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Necessary to allow drop.
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            processFile(files[0]);
        }
    };

    const handleUpload = async () => {
        // Check for login status before proceeding with analysis
        if (!isLoggedIn) {
            // You could show a message/modal here before redirecting
            navigate('/login');
            return;
        }

        if (!selectedFile) {
            alert("Please select an image file first.");
            return;
        }

        setIsLoading(true);
        setResult(null);
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/predict`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // Add the JWT for authentication
                },
            });
            setResult(response.data);
            if (isLoggedIn) {
                localStorage.setItem('detectionResult', JSON.stringify(response.data)); // Store current result
            }

            // Save to database history via our new API endpoint
            try {
                await axios.post(`${process.env.REACT_APP_API_URL}/history`, {
                    image: preview, // The base64 preview is already in state
                    result: response.data,
                }, { headers: { 'Authorization': `Bearer ${token}` } });
                console.log("Analysis saved to history.");
            } catch (historyError) {
                console.error("Could not save to history:", historyError);
            }
        } catch (error) {
            console.error("Error during prediction:", error);
            const errorResult = { error: "An error occurred. Please check the console and ensure the backend server is running." };
            setResult(errorResult);
            if (isLoggedIn) {
                localStorage.setItem('detectionResult', JSON.stringify(errorResult)); // Store error
            }
        } finally {
            setIsLoading(false);
        } 
    };
 
    const handleReset = () => {
        clearStoredData();
        // To clear the file input visually
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    const formatConfidence = (confidence) => {
        return `${(confidence * 100).toFixed(2)}%`;
    };

    return (
        <div className="detection-page">
            <div className="detection-container">
                <div className="detection-header">
                    <h1>Upload MRI Scan for Analysis</h1>
                    <p>Upload a brain MRI image to get a classification from our deep learning model.</p>
                </div>

                <div
                    className="uploader-container"
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <label htmlFor="file-upload" className={`file-input-label ${isDragging ? 'dragging-over' : ''}`}>
                        <div className="upload-icon">🖼️</div>
                        <p>{selectedFile ? selectedFile.name : 'Drag & drop an image here, or click to select'}</p>
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="action-buttons">
                    <button
                        onClick={handleUpload}
                        className="analyze-button"
                        disabled={!selectedFile || isLoading}
                    >
                        {isLoading ? 'Analyzing...' : 'Analyze Image'}
                    </button>
                    {(selectedFile || result) && (
                        <button onClick={handleReset} className="reset-button" disabled={isLoading}>
                            Reset
                        </button>
                    )}
                </div>

                {isLoading && <div className="loader"></div>}

                {result && !isLoading && (
                    <div className="result-area">
                        <h2>Analysis Result</h2>
                        {result.error ? (
                            <p className="error-message">{result.error}</p>
                        ) : (
                            <>
                                <div className="result-images-container">
                                    <div className="result-image-card">
                                        <h3>Original Scan</h3>
                                        <img src={preview} alt="Original Scan Preview" className="result-image" />
                                    </div>
                                    <div className="result-image-card">
                                        <h3>Detected Tumor</h3>
                                        <img
                                            src={result.processed_image_url || preview}
                                            alt="Processed Scan Preview"
                                            className="result-image"
                                        />
                                    </div>
                                </div>
                                <div className="result-summary">
                                    <div className="summary-item">
                                        <span className="summary-title">Prediction:</span>
                                        <span className={`summary-value prediction-label ${result.prediction.toLowerCase().includes('tumor') ? 'tumor' : 'no-tumor'}`}>
                                            {result.prediction}
                                        </span>
                                    </div>
                                    <div className="summary-item">
                                        <span className="summary-title">Confidence:</span>
                                        <span className="summary-value">{formatConfidence(result.confidence)}</span>
                                    </div>
                                    {result.prediction.toLowerCase().includes('tumor') && result.size_metrics && (
                                        <div className="summary-item">
                                            <span className="summary-title">Estimated Size:</span>
                                            <span className="summary-value">{result.size_metrics}</span>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                )}
                <Chatbot /> {/* Add this line to show the chatbot */}
            </div>
        </div>
    );
}

export default DetectionPage;