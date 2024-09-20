import React from "react";
import Header from "./Header";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <main className="text-center mt-12">
        <h2 className="text-5xl font-bold">"Build amazing things"</h2>
        <h2 className="text-2xl text-gray-600 mt-4">
          Take your JavaScript development up a notch
        </h2>
        <p className="mt-5 text-gray-700 font-serif text-xl mb-10">
          Get started today for free, or step up to npm Pro to enjoy a premium
          JavaScript development experience, with features like private
          packages.
        </p>
        <i className="ri-hand-heart-fill text-8xl"></i>
      </main>
    </div>
  );
};

export default LandingPage;
