import React, { useState } from "react";
import Link from 'next/link';

const HeroSection = () => {
  const [isTyped, setIsTyped] = useState(false);

  return (
    <section className="py-lg-18 py-10 bg-auto bg-light hero-graphics">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-7 col-md-12">
            <div className="py-8 py-lg-0 text-center">
              <h1 className="display-2 fw-bold mb-3 text-primary">
                <span className="text-dark px-3 px-md-0">Athena</span>
              </h1>
              <p className="mb-8 h3 text-dark">
                Writer's block is a thing of the past. Now building blog articles should not be a hassle. Athena is here to help you build your blog articles in a matter of seconds.
              </p>
           
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
