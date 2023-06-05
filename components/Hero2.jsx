import React from "react";
import Image from "next/image";

const Hero2 = () => {
  return (
    <section>
      <div className="banner-secbanner__section">
        <div className="z-container">
          <div className="home-banner__flexcnt" id="hpScheduleMeeting">
            <div className="home-banner__flexitemleft">
              <h1 className="banner-main__heading">
                <span>Save time</span> with intelligent content creation
              </h1>
              <div className="wordCarousel">
                <div>
                  <ul className="flip5">
                    <li>SEO Optimized Copy Ready</li>
                    <li>Tailored Content Generation</li>
                    <li>Transform thoughts to content</li>
                    <li>AI-Powered Creativity</li>
                    <li>Personalized Narratives</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="home-banner__flexitemright img-maxwidth--540">
          
              <Image
                src="/hero-img.png"
                className="banner__image"
                width={500}
                height={500}
                alt="banner image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero2;
