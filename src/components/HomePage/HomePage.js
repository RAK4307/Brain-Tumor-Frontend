import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Chatbot from '../Chatbot/Chatbot';
import profileImage1 from '../../assets/Team/Anil.jpg'; 
import profileImage2 from '../../assets/Team/Sai.jpg'; 
import profileImage3 from '../../assets/Team/Harsha.jpg';
import profileImage4 from '../../assets/Team/Raju.jpg';

import Alex from '../../assets/Research-imgs/alex.png'
import Ben from '../../assets/Research-imgs/ben.jpeg'
import Sarah from '../../assets/Research-imgs/sarah.jpeg'
import David from '../../assets/Research-imgs/David.jpeg'
import Evelyn from '../../assets/Research-imgs/evelyn.jpeg'

const infoSections = [
  {
    id: 'team',
    title: 'Our Team',
    members: [
      { name: 'Vamsi', role: 'Mentor & Project Guide', profess: 'Associate Professor, Department of Computer Science and Engineering, VLITS', year: '2022 - 2026', bio: 'As Mentor and Project Guide, Vamsi provides expert guidance and leadership throughout the project lifecycle. With deep expertise in computer science and engineering, he ensures the team follows best practices in AI and software development, and his mentorship is instrumental in achieving high-accuracy results for brain MRI classification.', imgSrc: profileImage1 },
      { name: 'R. Anil Kumar', role: 'Project Lead & Full Stack Developer', profess: 'Student', year: '2022 - 2026', bio: 'Anil Kumar leads the team as Project Lead and Full Stack Developer, overseeing both frontend and backend development. He specializes in building seamless user interfaces and robust server-side logic, ensuring users can easily upload MRI scans and receive clear, actionable analysis.', imgSrc: profileImage1 },
      { name: 'T. Sai Kumar', role: 'Documentation & Research Assistant', profess: 'Student', year: '2022 - 2026', bio: 'Sai Kumar excels in technical documentation and research, supporting the team with thorough literature reviews and clear project documentation. He also assists in backend development, helping to architect secure APIs and manage data flow for reliable model serving.', imgSrc: profileImage2 },
      { name: 'A. Harsha', role: 'ML Engineer', profess: 'Student', year: '2022 - 2026', bio: 'Harsha is the team’s Machine Learning Engineer, responsible for data sourcing, cleaning, and augmentation. His expertise in preparing medical imaging datasets and optimizing model training directly contributes to the project’s high performance and reliability.', imgSrc: profileImage3 },
      { name: 'D. Raju', role: 'UI/UX & Testing', profess: 'Student', year: '2022 - 2026', bio: 'Raju specializes in UI/UX design and testing, ensuring the platform is intuitive, accessible, and visually appealing. He conducts rigorous usability and functional testing, bridging the gap between technical innovation and a user-friendly product.', imgSrc: profileImage4 },
        ],
  },
  { 
    id: 'research-insights',
    title: 'From the Research',
    quotes: [
      {
        logoText: 'Stanford Medicine',
        text: "Tools like this are invaluable for preliminary screening. The ability to get a rapid, AI-driven analysis empowers clinicians to prioritize cases and can significantly accelerate the diagnostic pathway for patients.",
        authorAvatar: Evelyn,
        authorName: 'Dr. Evelyn Reed',
        authorTitle: 'Chief of Neuroradiology, Stanford Hospital',
      },
      {
        logoText: 'MIT CSAIL',
        text: "The architecture of this CNN model demonstrates a sophisticated approach to medical image classification. It's a powerful example of how targeted deep learning can solve complex, real-world problems in healthcare.",
        authorAvatar: Ben,
        authorName: 'Dr. Ben Carter',
        authorTitle: 'Professor of AI in Medicine, MIT',
      },
      {
        logoText: 'Radiology Today',
        text: 'Automated systems for tumor classification can significantly reduce the workload on radiologists and improve diagnostic consistency across institutions.',
        authorAvatar: Alex,
        authorName: 'Dr. Alex Ray',
        authorTitle: 'Lead Radiologist, Health Inc.',
      },
      {
        logoText: 'Johns Hopkins University',
        text: "As a learning tool for medical students, this platform is exceptional. It provides instant feedback on MRI interpretation, helping to build diagnostic confidence in a controlled, educational environment.",
        authorAvatar: Sarah,
        authorName: 'Sarah Jenkins',
        authorTitle: 'MD Candidate, Johns Hopkins School of Medicine',
      },
      {
        logoText: 'National Brain Tumor Society',
        text: "Accessible and rapid screening technologies are critical in the fight against brain tumors. Innovations that shorten the time to diagnosis give patients the best possible chance for a positive outcome.",
        authorAvatar: David,
        authorName: 'David Chen',
        authorTitle: 'Director of Patient Advocacy, NBTS',
      },
    ],
  },
  // {
  //   id: 'testimonials',
  //   title: 'What Our Users Say',
  //   cards: [
  //       {
  //           bgColor: 'pastel-green',
  //           videoThumbnail: 'https://i.pravatar.cc/150?img=31',
  //           title: 'Medical Student',
  //           description: '“As a learning tool for medical students, this platform is exceptional. It provides instant feedback on MRI interpretation, helping to build diagnostic confidence.”',
  //           authorName: 'Sarah Jenkins',
  //           authorTitle: 'MD Candidate, Johns Hopkins School of Medicine'
  //       },
  //       {
  //           bgColor: 'pastel-purple',
  //           videoThumbnail: 'https://i.pravatar.cc/150?img=14',
  //           title: 'Patient Advocacy',
  //           description: '“Accessible and rapid screening technologies are critical... Innovations that shorten the time to diagnosis give patients the best possible chance for a positive outcome.”',
  //           authorName: 'David Chen',
  //           authorTitle: 'Director of Patient Advocacy, NBTS'
  //       },
  //       {
  //           bgColor: 'pastel-blue',
  //           videoThumbnail: 'https://i.pravatar.cc/150?img=56',
  //           title: 'Radiology Resident',
  //           description: '“As a resident, being able to quickly check my interpretation against an AI has been invaluable. It\'s a great way to reinforce learning and catch subtle details.”',
  //           authorName: 'Dr. Maria Garcia',
  //           authorTitle: 'Radiology Resident, PGY-3'
  //       },
  //       {
  //           bgColor: 'pastel-lavender',
  //           videoThumbnail: 'https://i.pravatar.cc/150?img=25',
  //           title: 'Research Scientist',
  //           description: '“The platform\'s API integration allowed us to accelerate our research workflow, providing quick, reliable classifications for our large-scale imaging studies.”',
  //           authorName: 'Dr. Kenji Tanaka',
  //           authorTitle: 'Lead Researcher, NeuroAI Labs'
  //       }
  //   ]
  // },
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

  const quotesData = infoSections.find(s => s.id === 'research-insights');

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
            {section.id === 'research-insights' && (
              <div className="research-insights-container">
                <button className="nav-arrow left-arrow" onClick={handlePrevQuote} aria-label="Previous testimonial">&larr;</button>
                <div className="insights-slider">
                  <div className="insights-track" style={{ transform: `translateX(-${currentQuoteIndex * 100}%)` }}>
                    {quotesData.quotes.map((quote, index) => (
                      <div className="insight-card" key={index}>
                        <div className="insight-logo">
                          <span>&#128279;</span> {quote.logoText}
                        </div>
                        <blockquote className="insight-text">
                          “{quote.text}”
                        </blockquote>
                        <div className="insight-author">
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
            {/* {section.id === 'testimonials' && (
              <div className="testimonials-row">
                {section.cards.map((card, index) => (
                  <div className={`testimonial-card ${card.bgColor}`} key={index}>
                    <div className="testimonial-img-wrapper">
                      <img src={card.videoThumbnail} alt={card.title} className="testimonial-img" />
                      <div className="testimonial-video-bar">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 1.5V10.5L10 6L2.5 1.5Z" fill="#344054" stroke="#344054" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span>Play Video</span>
                      </div>
                    </div>
                    <h3 className="testimonial-title">{card.title}</h3>
                    <p className="testimonial-desc">{card.description}</p>
                    <div className="testimonial-author-details">
                        <p className="testimonial-author-name">{card.authorName}</p>
                        <p className="testimonial-author-title">{card.authorTitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            )} */}
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