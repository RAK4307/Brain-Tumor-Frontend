import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './HistoryPage.css'; // Import the CSS file

const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isConfirmingClear, setIsConfirmingClear] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null); // For single item deletion
    const [selectedReport, setSelectedReport] = useState(null); // For report modal
    const navigate = useNavigate();
    const { isLoggedIn, token } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        const fetchHistory = async (page) => {
            if (!token) {
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/history?page=${page}&limit=9`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setHistory(response.data.history || []);
                setCurrentPage(response.data.currentPage || 1);
                setTotalPages(response.data.totalPages || 0);
            } catch (err) {
                setError('Failed to fetch analysis history. Please try again later.');
                console.error('Error fetching history:', err);
                setHistory([]); // Clear history on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory(currentPage);
    }, [isLoggedIn, navigate, token, currentPage]);

    // Opens the confirmation dialog
    const handleClearHistory = () => {
        setIsConfirmingClear(true);
    };

    // Performs the actual deletion after confirmation
    const confirmClearHistory = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/history`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setHistory([]);
            setCurrentPage(1);
            setTotalPages(0);
        } catch (err) {
            alert('Failed to clear history. Please try again.');
            console.error('Error clearing history:', err);
        } finally {
            setIsConfirmingClear(false);
        }
    };

    // Opens the confirmation dialog for a single item
    const handleDeleteItem = (id) => {
        setItemToDelete(id);
    };

    // Performs the actual deletion of a single item
    const confirmDeleteItem = async () => {
        if (!itemToDelete) return;

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/history/${itemToDelete}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            // Remove the item from the local state to update the UI
            setHistory(prevHistory => prevHistory.filter(item => item._id !== itemToDelete));
        } catch (err) {
            alert('Failed to delete item. Please try again.');
            console.error('Error deleting item:', err);
        } finally {
            setItemToDelete(null); // Close the dialog
        }
    };

    // Sets the report to be viewed in the modal
    const handleViewReport = (item) => {
        setSelectedReport(item);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
            setCurrentPage(newPage);
        }
    };

    const formatConfidence = (confidence) => {
        return `${(confidence * 100).toFixed(2)}%`;
    };

    if (isLoading) {
        return <div className="history-page"><div className="loader"></div></div>;
    }

    if (error) {
        return <div className="history-page"><div className="no-history"><p>{error}</p></div></div>;
    }

    return (
        <div className="history-page">
            {/* Confirmation Dialog for clearing all history */}
            {isConfirmingClear && (
                <div className="confirmation-dialog-overlay">
                    <div className="confirmation-dialog">
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to clear your entire analysis history? This action cannot be undone.</p>
                        <div className="dialog-buttons">
                            <button onClick={() => setIsConfirmingClear(false)} className="dialog-cancel-button">
                                Cancel
                            </button>
                            <button onClick={confirmClearHistory} className="dialog-delete-button">
                                Delete
                            </button>
                        </div>
                    </div> 
                </div>
            )}

            {/* Confirmation Dialog for deleting a single item */}
            {itemToDelete && (
                <div className="confirmation-dialog-overlay">
                    <div className="confirmation-dialog">
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete this analysis? This action cannot be undone.</p>
                        <div className="dialog-buttons">
                            <button onClick={() => setItemToDelete(null)} className="dialog-cancel-button">
                                Cancel
                            </button>
                            <button onClick={confirmDeleteItem} className="dialog-delete-button">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Report Modal */}
            {selectedReport && (
                <div className="report-modal-overlay" onClick={() => setSelectedReport(null)}>
                    <div className="report-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setSelectedReport(null)} className="report-modal-close-button">&times;</button>
                        <div className="report-container">
                            <div className="report-images-container">
                                <div className="report-image-wrapper">
                                    <h3>Original Image</h3>
                                    <img src={selectedReport.image} alt="Original MRI Scan" className="history-item-img" />
                                </div>
                                <div className="report-image-wrapper">
                                    <h3>Resultant Image</h3>
                                    {/* NOTE: Assumes 'resultantImage' is saved in your history data. 
                                        Using original image as a fallback. */}
                                    <img src={selectedReport.resultantImage || selectedReport.image} alt="Resultant MRI Scan" className="history-item-img" />
                                </div>
                            </div>
                            {/* The report details are now below the images */}
                            <div className="history-item-report">
                                <h2>Analysis Report</h2>
                                <div className="history-card-details">
                                    <p className="prediction-title">Prediction:</p>
                                    <p className={`prediction-label ${selectedReport.prediction.toLowerCase().includes('tumor') ? 'tumor' : 'no-tumor'}`}>{selectedReport.prediction}</p>
                                    <p className="prediction-title">Confidence:</p>
                                    <div className="confidence-bar">
                                        <div className="confidence-fill" style={{ width: formatConfidence(selectedReport.confidence) }}>
                                            <span>{formatConfidence(selectedReport.confidence)}</span>
                                        </div>
                                    </div>
                                    <p><strong>Analyzed on:</strong> {new Date(selectedReport.date).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="history-header">
                <h1>Analysis History</h1>
                {history.length > 0 && (
                    <button onClick={handleClearHistory} className="clear-history-button">
                        Clear History
                    </button>
                )}
            </div>

            {history.length === 0 ? (
                <div className="no-history">
                    <p>You have no saved analysis results.</p>
                    <p>Go to the <a href="/detection">Detection Page</a> to analyze an image.</p>
                </div>
            ) : (
                <div className="history-list">
                    {history.map((item) => {
                        return (
                            <div key={item._id} className="history-item">
                                <div className="history-item-header">
                                    <div className="prediction-summary">
                                        <span className={`prediction-label-small ${item.prediction.toLowerCase().includes('tumor') ? 'tumor' : 'no-tumor'}`}>
                                            {item.prediction}
                                        </span>
                                    </div>
                                    <div className="date-summary">
                                        {new Date(item.date).toLocaleString()}
                                    </div>
                                    <div className="actions">
                                        <button onClick={(e) => { e.stopPropagation(); handleDeleteItem(item._id); }} className="delete-item-button" title="Delete this item">
                                            Delete
                                        </button>
                                        {/* Changed to a button for better semantics */}
                                        <button onClick={() => handleViewReport(item)} className="expand-arrow" title="View Report">
                                            &#9654;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {totalPages > 1 && !isLoading && (
                <div className="pagination-controls">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &laquo; Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next &raquo;
                    </button>
                </div>
            )}
        </div>
    );
};
 
export default HistoryPage;