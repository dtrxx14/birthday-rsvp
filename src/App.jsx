import React from "react";
import HeroBanner from "./components/HeroBanner/HeroBanner";
import PhotoGallery from "./components/PhotoGallery/PhotoGallery";
import EventDetails from "./components/EventDetails/EventDetails";
import RSVPForm from "./components/RSVPForm/RSVPForm";

function App() {
  return (
    <div className="font-sans h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {/* HeroBanner: full viewport */}
      <section className="snap-start h-screen">
        <HeroBanner />
      </section>

      {/* PhotoGallery: may be taller than viewport */}
      <section className="snap-start h-screen overflow-auto">
        <PhotoGallery />
      </section>

      {/* EventDetails: full viewport */}
      <section className="snap-start">
        <EventDetails />
      </section>

      {/* RSVPForm: full viewport */}
      <section className="snap-start">
        <RSVPForm />
      </section>
    </div>
  );
}

export default App;
