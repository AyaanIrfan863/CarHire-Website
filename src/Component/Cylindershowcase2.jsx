import { useEffect, useRef, useState } from "react";
import "./Cylindershowcase2.css";

const cars = [
  {
    name: "BMW M4",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Mercedes AMG",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Audi R8",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Porsche 911",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Lamborghini",
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Ferrari",
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=900&q=80",
  },
];

function Cylindershowcase2() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startX = useRef(0);
  const currentRotation = useRef(0);
  const animationRef = useRef(null);

  // Automatic rotation
  useEffect(() => {
    if (isDragging) return;

    const animate = () => {
      currentRotation.current -= 0.15;
      setRotation(currentRotation.current);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [isDragging]);

  // Mouse / touch start
  const handleStart = (e) => {
    setIsDragging(true);

    const x =
      e.type === "touchstart"
        ? e.touches[0].clientX
        : e.clientX;

    startX.current = x;
  };

  // Mouse / touch move
  const handleMove = (e) => {
    if (!isDragging) return;

    const x =
      e.type === "touchmove"
        ? e.touches[0].clientX
        : e.clientX;

    const difference = x - startX.current;

    currentRotation.current += difference * 0.5;

    setRotation(currentRotation.current);

    startX.current = x;
  };

  // Mouse / touch end
  const handleEnd = () => {
    setIsDragging(false);
  };

  return (
    <section className="cylinder-section">

      <div className="cylinder-heading">
        <span>PREMIUM COLLECTION</span>
        <h1>OUR <strong>MODELS</strong></h1>
        <p>Explore our premium car collection</p>
      </div>

      <div
        className="cylinder-scene"
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >

        <div
          className="cylinder"
          style={{
            transform: `rotateY(${rotation}deg)`,
          }}
        >

          {cars.map((car, index) => {

            const angle = index * 60;

            return (
              <div
                className="car-card"
                key={car.name}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(330px)`,
                }}
              >

                <div className="car-image">
                  <img
                    src={car.image}
                    alt={car.name}
                    draggable="false"
                  />
                </div>

                <div className="car-info">
                  <span>01 / 06</span>
                  <h2>{car.name}</h2>
                  <button>VIEW MODEL →</button>
                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* <div className="drag-text">
        ← DRAG TO EXPLORE →
      </div> */}

    </section>
  );
}

export default Cylindershowcase2;