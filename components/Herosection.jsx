import React from "react";
import Image from "next/image";

const Herosection = () => {
  return (
    <div className="bg-primary">
      <div className="container">
        <div className="row align-items-center no-gutters">
          <div className="col-xl-5 col-lg-6 col-md-12">
            <div className="py-5">
              <h1 className="text-white display-4 fw-bold">
                Presenting Athena...
              </h1>
              <p className="text-white-50 mb-4 lead pt-4">
                Writer's block is a thing of the past. <br />
                Athena enables you to build blog articles in a matter of
                seconds.
              </p>
            </div>
          </div>
          <div class=" col-xl-7 col-lg-6 col-md-12 text-lg-right text-center">
            <Image
              src="/hero-img.png"
              alt="hero image"
              width={500}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
