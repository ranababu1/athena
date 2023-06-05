import React from "react";
import Image from "next/image";

const Hero2 = ({heading, subheading, listItems}) => {
  return (
    <section>
      <div className="banner-secbanner__section">
        <div className="z-container">
          <div className="home-banner__flexcnt" id="hpScheduleMeeting">
            <div className="home-banner__flexitemleft">
              <h1 className="banner-main__heading">
                <span>{heading}</span> {subheading}
              </h1>
              <div className="wordCarousel">
                <div>
                  <ul className="flip5">
                    {listItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
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
