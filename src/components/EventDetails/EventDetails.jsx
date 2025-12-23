import React from "react";

export default function EventDetails() {
  return (
    <section className="w-full bg-primary text-white overflow-hidden md:min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:justify-center md:min-h-screen">
        {/* Header */}
        <div className="py-12 text-center">
          <p className="text-lg md:text-2xl text-rsvpBg">
            Join us for a fun and colorful celebration of
          </p>
          <p className="text-4xl md:text-7xl font-chalk px-8 py-2 rounded bg-rsvpText/90 text-rsvpBg mt-2">
            <span className="text-primary">L</span>
            <span className="text-secondary">U</span>
            <span className="text-accent">K</span>
            <span className="text-success">E</span>
            <span className="text-rsvpText"> </span>
            <span className="text-softBlue">Z</span>
            <span className="text-primary">A</span>
            <span className="text-secondary">N</span>
            <span className="text-accent">J</span>
            <span className="text-success">I</span>
            <span className="text-softBlue">E</span>
            <span className="text-rsvpText"> </span>
            <span className="text-primary">C</span>
            <span className="text-secondary">E</span>
            <span className="text-accent">R</span>
            <span className="text-success">B</span>
            <span className="text-softBlue">I</span>
            <span className="text-primary">T</span>
            <span className="text-secondary">O</span>
            <span className="text-rsvpText"> </span>
            <span className="text-softBlue">Y</span>
            <span className="text-primary">A</span>
            <span className="text-secondary">M</span>
            <span className="text-accent">I</span>
            <span className="text-success">O</span>
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b-2 border-white">
          {/* LEFT — CARDS */}
          <div className="flex flex-col gap-8 mb-8">
            {/* Card 1 */}
            <div className="group relative rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition" />
              <img
                src="/assets/images/calendar.png"
                alt="Event Date"
                className="h-8 mb-4 animate-bounce"
              />
              <p className="text-sm text-slate-600 leading-relaxed">
                <span className="font-semibold">Date</span>
                <br />
                January 25th, 2026
                <br />
                <br />
                <span className="font-semibold">Time</span>
                <br />
                11:30 AM - 2:30 PM
              </p>
            </div>

            {/* Card 2 */}
            <a
              href="https://maps.app.goo.gl/yYWwP4JEwWF977vYA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="group relative rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-800/10 to-teal-800/10 opacity-0 group-hover:opacity-100 transition" />
                <img
                  src="/assets/images/pin.png"
                  alt="Event Location"
                  className="h-8 mb-4 animate-bounce"
                />
                <p className="text-sm text-slate-600 leading-relaxed">
                  <span className="font-semibold">Venue</span>
                  <br />
                  Kenny Rogers Roasters Imus Branch
                  <br />
                  <br />
                  <span className="font-semibold">Address</span>
                  <br />
                  Tanzang Luma II, Aguinaldo Hwy, Imus, Cavite
                </p>
                <button className="mt-6 inline-flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition">
                  Show in map →
                </button>
              </div>
            </a>
          </div>

          {/* RIGHT — ELMO (desktop only, sticky inside section) */}
          <div className="relative hidden md:block md:col-span-2 h-full">
  <img
    src="/assets/images/characters/Elmo.png"
    alt="Elmo"
    className="absolute bottom-0 left-1/2 -translate-x-1/2
               h-[95%] w-auto object-contain
               drop-shadow-[10px_0_0_#fff]
               drop-shadow-[-10px_0_0_#fff]
               drop-shadow-[0_10px_0_#fff]
               drop-shadow-[0_-10px_0_#fff]"
  />
</div>
        </div>
      </div>
    </section>
  );
}
