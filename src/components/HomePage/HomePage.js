import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Chatbot from '../Chatbot/Chatbot';
import profileImage from '../../assets/profile.jpg';

const infoSections = [
  {
    id: 'team',
    title: 'Our Team',
    members: [
      { name: 'Vamsi', role: 'Project Lead & AI Developer', profess: 'Student', year: '2022 - 2026', bio: 'Vamsi leads the project and developed the core deep learning model. His work involved training and fine-tuning the CNN for high-accuracy classification of brain MRI scans.', imgSrc: profileImage },
      { name: 'R. Anil Kumar', role: 'Frontend Developer', profess: 'Student', year: '2022 - 2026', bio: 'Anil designed and built the user-friendly interface. He focused on creating a seamless experience for users to upload their MRI scans and view the analysis results clearly.', imgSrc: profileImage },
      { name: 'T. Sai Kumar', role: 'Backend Developer', profess: 'Student', year: '2022 - 2026', bio: 'Sai Kumar architected the backend infrastructure, creating the Flask API that serves the TensorFlow model and manages secure image processing.', imgSrc: 'https://i.pravatar.cc/150?img=25' },
      { name: 'A. Harsha', role: 'Data & Research', profess: 'Student', year: '2022 - 2026', bio: 'Harsha was responsible for sourcing, cleaning, and augmenting the brain MRI dataset. His meticulous data preparation was crucial for the model\'s performance and reliability.', imgSrc: 'https://i.pravatar.cc/150?img=12' },
      { name: 'D. Raju', role: 'UI/UX & Testing', profess: 'Student', year: '2022 - 2026', bio: 'Raju focused on the user experience and conducted rigorous testing to ensure the platform is intuitive, accessible, and bug-free, bridging the gap between a technical tool and a usable product.', imgSrc: 'https://i.pravatar.cc/150?img=32' },
        ],
  },
  { 
    id: 'quotes',
    title: 'From the Research',
    quotes: [
      {
        logoText: 'Stanford Medicine',
        text: "Tools like this are invaluable for preliminary screening. The ability to get a rapid, AI-driven analysis empowers clinicians to prioritize cases and can significantly accelerate the diagnostic pathway for patients.",
        authorAvatar: 'https://i.pravatar.cc/150?img=47',
        authorName: 'Dr. Evelyn Reed',
        authorTitle: 'Chief of Neuroradiology, Stanford Hospital',
      },
      {
        logoText: 'MIT CSAIL',
        text: "The architecture of this CNN model demonstrates a sophisticated approach to medical image classification. It's a powerful example of how targeted deep learning can solve complex, real-world problems in healthcare.",
        authorAvatar: 'https://i.pravatar.cc/150?img=53',
        authorName: 'Dr. Ben Carter',
        authorTitle: 'Professor of AI in Medicine, MIT',
      },
      {
        logoText: 'Radiology Today',
        text: 'Automated systems for tumor classification can significantly reduce the workload on radiologists and improve diagnostic consistency across institutions.',
        authorAvatar: 'https://i.pravatar.cc/150?img=5',
        authorName: 'Dr. Alex Ray',
        authorTitle: 'Lead Radiologist, Health Inc.',
      },
      {
        logoText: 'Johns Hopkins University',
        text: "As a learning tool for medical students, this platform is exceptional. It provides instant feedback on MRI interpretation, helping to build diagnostic confidence in a controlled, educational environment.",
        authorAvatar: 'https://i.pravatar.cc/150?img=31',
        authorName: 'Sarah Jenkins',
        authorTitle: 'MD Candidate, Johns Hopkins School of Medicine',
      },
      {
        logoText: 'National Brain Tumor Society',
        text: "Accessible and rapid screening technologies are critical in the fight against brain tumors. Innovations that shorten the time to diagnosis give patients the best possible chance for a positive outcome.",
        authorAvatar: 'https://i.pravatar.cc/150?img=14',
        authorName: 'David Chen',
        authorTitle: 'Director of Patient Advocacy, NBTS',
      },
    ],

  },
  {
    id: 'faq',
    title: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'How accurate is the tumor detection model?',
        answer: 'Our model achieves high accuracy in classifying brain MRI scans, but it is not a substitute for professional medical advice. Accuracy may vary based on image quality and other factors. Always consult with a qualified radiologist or oncologist for diagnosis.',
      },
      {
        question: 'What kind of MRI images can I upload?',
        answer: 'The model is trained on T1-weighted contrast-enhanced MRI images. For best results, please use images in .jpg, .jpeg, or .png format.',
      },
      {
        question: 'Can this platform be used to diagnose a brain tumor?',
        answer: 'No. This platform is intended for preliminary analysis and educational purposes only. A definitive diagnosis can only be made by a trained medical professional, incorporating a comprehensive review of medical history, imaging, and potentially biopsy results.',
      },
      {
        question: 'What do I do if the platform indicates a potential tumor?',
        answer: 'If the platform indicates a potential tumor, it is crucial to promptly schedule a consultation with a qualified radiologist or oncologist for further evaluation and appropriate medical intervention.',
      },
      {
        question: 'Is my personal and medical data secure?',
        answer: 'We take user privacy very seriously. All uploaded images are processed securely and are not stored or used for any purpose other than providing you with the analysis. The connection is encrypted to protect your data.',
      },
       {
        question: 'Can I use this platform for research purposes?',
        answer: 'The platform is available for educational and research use. Please cite our work appropriately and reach out to us for collaboration opportunities or access to our datasets.',
      },
    ],
  },
];

function HomePage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const quotesData = infoSections.find(s => s.id === 'quotes');

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotesData.quotes.length);
  };

  const handlePrevQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex - 1 + quotesData.quotes.length) % quotesData.quotes.length);
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="hero-content">
          <h1>Advanced Brain Tumor Detection with AI</h1>
          <p className="subtitle">Leveraging deep learning to provide fast and accurate preliminary analysis of MRI scans.</p>
          <Link to="/detection" className="cta-button">Analyze My Scan &rarr;</Link>
        </div>
      </header>
      <main>
        <section className="how-it-works-section">
          <div className="how-it-works-layout">
            <div className="how-it-works-description">
              <h2>How It Works</h2>
              <p>Our platform simplifies the process of getting a preliminary analysis of brain MRI scans. It's a straightforward process designed for ease of use and quick results:</p>
              <ul>
                <li><strong>1. Upload Image:</strong> Securely upload your brain MRI scan. Our system accepts common formats like JPG, PNG, and JPEG.</li>
                <li><strong>2. AI Analysis:</strong> Our advanced model processes the image to identify and classify potential anomalies based on a vast dataset.</li>
                <li><strong>3. View Results:</strong> Receive a clear, preliminary report with the classification and a confidence score in seconds.</li>
              </ul>
              <p>Watch the video to see it in action or read our documentation for more technical details.</p>
            </div>
            <div className="how-it-works-video">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder video
                title="How it works video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
          </div>
          <div className="how-it-works-footer">
            <p>For a detailed guide on our model and platform usage, check out our documentation.</p>
            <a href="/documentation" className="documentation-link">View Documentation</a>
          </div>
        </section>
        {infoSections.map((section) => (
          <section key={section.id} className={`${section.id}-section`}>
            <h2>{section.title}</h2>
            {section.id === 'team' && (
              <div className="team-members">
                {section.members.map((member, index) => (
                  <div key={member.name} className="team-member-card">
                    <img src={member.imgSrc} alt={`Portrait of ${member.name}`} className="team-member-img" />
                    <p>{member.profess}</p>
                    <p>{member.year}</p>
                    <div className="team-member-info">
                      <h3>{member.name}</h3>
                      <h4>{member.role}</h4>
                      <p>{member.bio}</p>                      
                    </div>
                  </div>
                ))}
              </div>
            )}
            {section.id === 'quotes' && (
              <div className="testimonial-container">
                <button className="nav-arrow left-arrow" onClick={handlePrevQuote} aria-label="Previous testimonial">&larr;</button>
                <div className="testimonial-slider">
                  <div className="testimonial-track" style={{ transform: `translateX(-${currentQuoteIndex * 100}%)` }}>
                    {quotesData.quotes.map((quote, index) => (
                      <div className="testimonial-card" key={index}>
                        <div className="testimonial-logo">
                          <span>&#128279;</span> {quote.logoText}
                        </div>
                        <blockquote className="testimonial-text">
                          “{quote.text}”
                        </blockquote>
                        <div className="testimonial-author">
                          <img
                            src={quote.authorAvatar}
                            alt={`Avatar of ${quote.authorName}`}
                            className="author-avatar"
                          />
                          <div className="author-details">
                            <p className="author-name">{quote.authorName}</p>
                            <p className="author-title">{quote.authorTitle}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="nav-arrow right-arrow" onClick={handleNextQuote} aria-label="Next testimonial">&rarr;</button>
              </div>
            )}
            {section.id === 'faq' && (
              <div className="faq-container">
                {section.faqs.map((faq, index) => (
                  <div key={faq.question} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                    <h3 className="faq-question" onClick={() => toggleFaq(index)}>
                      {faq.question}
                      <span className="faq-icon" />
                    </h3>
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </main>
      <Chatbot />
    </div>
  );
}

export default HomePage;