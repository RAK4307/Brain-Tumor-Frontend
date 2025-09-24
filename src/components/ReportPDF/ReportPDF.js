import React from 'react';
import './ReportPDF.css';
import logo from '../../assets/login.png'; // Using your existing logo

const ReportPDF = React.forwardRef(({ reportData }, ref) => {
    if (!reportData) return null;

    const formatConfidence = (confidence) => {
        if (typeof confidence !== 'number') return 'N/A';
        return `${(confidence * 100).toFixed(2)}%`;
    };

    const isTumor = reportData.prediction.toLowerCase().includes('tumor');
    const analysisDate = reportData.date ? new Date(reportData.date).toLocaleString() : new Date().toLocaleString();

    return (
        // This container is not visible on the page, only for PDF generation
        <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
            <div ref={ref} className="pdf-container">
                <div className="pdf-header">
                    <img src={logo} alt="DeepNeuroVision Logo" className="pdf-logo" />
                    <h1>Analysis Report</h1>
                </div>
                <div className="pdf-section">
                    <h2>Scan Details</h2>
                    <div className="pdf-details-grid">
                        <div><strong>Analyzed On:</strong> {analysisDate}</div>
                        {/* You can add more patient details here if you collect them */}
                    </div>
                </div>
                <div className="pdf-section">
                    <h2>Analysis Results</h2>
                    <div className="pdf-summary-grid">
                        <div className="pdf-summary-item">
                            <span className="pdf-summary-title">Prediction:</span>
                            <span className={`pdf-summary-value ${isTumor ? 'tumor' : 'no-tumor'}`}>{reportData.prediction}</span>
                        </div>
                        <div className="pdf-summary-item">
                            <span className="pdf-summary-title">Confidence:</span>
                            <span className="pdf-summary-value">{formatConfidence(reportData.confidence)}</span>
                        </div>
                        {isTumor && reportData.size_metrics && (
                            <div className="pdf-summary-item">
                                <span className="pdf-summary-title">Estimated Size:</span>
                                <span className="pdf-summary-value">{reportData.size_metrics}</span>
                            </div>
                        )}
                        {isTumor && reportData.stage && (
                            <div className="pdf-summary-item">
                                <span className="pdf-summary-title">Stage:</span>
                                <span className="pdf-summary-value">{reportData.stage}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="pdf-footer">
                    <p>DeepNeuroVision &copy; {new Date().getFullYear()}. For research and educational use only.</p>
                    <p>This is not a medical diagnosis. Consult a qualified healthcare professional.</p>
                </div>
            </div>
        </div>
    );
});

export default ReportPDF;
