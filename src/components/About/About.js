import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import './About.css';
import { barChartData, pieChartData } from './data/chartData';
import { doctorsData } from './data/doctorsData';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const About = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>Understanding Brain Tumors</h1>
      </header>

      <div className="about-content">
        <section className="about-section video-section">
          <div className="about-video-section">
            <video
              src={require('../../assets/Videos/Brain-tumor.mp4')}
              controls
              poster={require('../../assets/home.jpg')}              
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <section className="about-section data-section">
          <div className="data-section-content">
            <h2>Statistical Data</h2>
            <p className="data-intro">
              Data-driven insights are crucial for understanding the full scope and impact of brain tumors. The following visualizations provide a high-level overview of incidence rates and general treatment outcomes, contextualizing the global and national health challenge posed by this condition. These figures underscore the urgent need for continued research, advanced diagnostics, and accessible treatment.
            </p>
            <div className="stats-grid">
              <div className="stats-row">
                <div className="stats-text">
                  <h3>Annual Incidence Rates</h3>
                  <p>
                    Brain tumors represent a significant global health challenge. Annually, hundreds of thousands of new cases are diagnosed worldwide. In India, the incidence is also substantial, making it a critical area for healthcare focus. The bar chart illustrates the estimated number of new cases reported annually, comparing the figures for India with the global total. This data highlights the scale of the issue and the need for widespread access to advanced diagnostic tools.
                  </p>
                </div>
                <div className="chart-wrapper">
                  <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                  <h4>Annual Cases (India vs. World)</h4>
                </div>
              </div>
              <div className="stats-row stats-row--reverse">
                <div className="stats-text">
                  <h3>Prognosis and Treatment Outcomes</h3>
                  <p>
                    The prognosis for brain tumor patients has been steadily improving due to advancements in surgery, radiation therapy, and chemotherapy. However, outcomes vary significantly based on the tumor's type, grade, and location. The pie chart provides a general overview of treatment success rates, categorizing outcomes into "Successfully Treated" and "Non-Curable/Fatal." This visualization underscores the ongoing battle against the disease and the importance of continued research into more effective treatments.
                  </p>
                </div>
                <div className="chart-wrapper">
                  <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                  <h4>General Curing Percentage</h4>
                </div>
              </div>
            </div>
            <p className="data-source">
              *Data is approximate and based on reports from the World Health Organization (WHO) and the National Cancer Registry Programme, India. Percentages can vary based on tumor type and treatment.
            </p>
          </div>
        </section>

        <section className="about-section doctors-section">
          <div className="doctors-section-content">
            <h2>Top Doctors & Researchers</h2>
            <p className="doctors-intro">
              Meet some of the leading figures in neuro-oncology and neurosurgery. These professionals are at the forefront of brain tumor research and treatment, pioneering new techniques and improving patient outcomes worldwide.
            </p>
            <div className="doctors-grid">
              {doctorsData.map((doctor, index) => (
                <div key={index} className="doctor-card">
                  <img src={doctor.imgSrc} alt={`Portrait of ${doctor.name}`} className="doctor-avatar" />
                  <h3>{doctor.name}</h3>
                  <p className="doctor-specialization">{doctor.specialization}</p>
                  <p className="doctor-description">{doctor.description}</p>
                  <p className="doctor-location">{doctor.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;