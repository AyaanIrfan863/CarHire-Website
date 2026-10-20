import { Link } from "react-router-dom";

import React, { useState, useEffect, useRef } from 'react';
import './Model.css';

const modelsData = [
  {
    id: 1,
    title: 'Porsche Cayman',
    category: 'Sport GT',
    desc: 'Mid-engine precision sports car with lightweight aerodynamic body and razor-sharp handling.',
    img: 'https://i.pinimg.com/736x/b6/43/a5/b643a597c4fe425f0675ca9af1d94f0d.jpg',
  },
  {
    id: 2,
    title: 'BMW M4 Competition',
    category: 'Track Edition',
    desc: 'Twin-turbocharged inline-6 engine built for pure track performance and high-speed stability.',
    img: 'https://i.pinimg.com/736x/c7/22/b7/c722b70cedb8637dbb83ca822c79a23b.jpg',
  },
  {
    id: 3,
    title: 'Suzuki Vitara',
    category: 'Urban Cruiser',
    desc: 'Smart AllGrip 4WD crossover SUV designed for smooth city driving and rough terrain agility.',
    img: 'https://i.pinimg.com/1200x/57/dc/8a/57dc8abb3b5c1f6899087c91528a3c2c.jpg',
  },
  {
    id: 4,
    title: 'Mercedes-Benz E-Class',
    category: 'Executive Sedan',
    desc: 'Premium luxury sedan featuring executive interior comfort and high-tech digital intelligence.',
    img: 'https://i.pinimg.com/1200x/75/aa/30/75aa30f2794446d23abc22e89d08dce7.jpg',
  },
];

const Model = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
          }
        });
      },
      { threshold: 0.15 } 
    );

    const boxes = contentRef.current?.querySelectorAll('.box');
    boxes?.forEach((box) => observer.observe(box));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="main">
      <div className="min">
        <h1>
          OUR <span>MODELS</span>
        </h1>
        <p>Find your <span> perfect ride</span></p>
      </div>

      <div className="btn">
  <Link to="/gallery">
    <button>View All</button>
  </Link>
</div>

      <div className="content" ref={contentRef}>
        {modelsData.map((item, index) => (
          <div
            className="box"
            key={item.id}
            style={{ '--delay': `${index * 0.15}s` }} // Har card alag delay ke sath aayega
            onClick={() => setSelectedModel(item)}
          >
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>

            <div className="card-overlay">
              <h4>{item.title}</h4>
              <span className="card-category">{item.category}</span>
              <p>{item.desc}</p>
              <span className="click-hint">Click for full details</span>
            </div>
          </div>
        ))}
      </div>

      {selectedModel && (
        <div className="modal-backdrop" onClick={() => setSelectedModel(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedModel(null)}
            >
              ✕
            </button>
            <img src={selectedModel.img} alt={selectedModel.title} />
            <h2>{selectedModel.title}</h2>
            <h4 style={{ color: '#e10600', margin: '5px 0 15px' }}>
              {selectedModel.category}
            </h4>
            <p>{selectedModel.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Model;