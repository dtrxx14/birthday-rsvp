import React, { useState, useEffect, useRef } from "react";

export default function PhotoGallery() {
  const photos = Array.from(
    { length: 18 },
    (_, i) => `/assets/images/gallery/luke_${i + 1}.jpg`
  );

  const PHOTOS_PER_LOAD = 6;

  const [visibleCount, setVisibleCount] = useState(PHOTOS_PER_LOAD);
  const [activeIndex, setActiveIndex] = useState(null);
  const [showLightbox, setShowLightbox] = useState(false);

  // Track previous count
  const prevVisibleCount = useRef(visibleCount);

  const isOpen = activeIndex !== null;
  const visiblePhotos = photos.slice(0, visibleCount);

  const open = (index) => {
    setActiveIndex(index);
    setShowLightbox(true);
  };

  const close = () => {
    setShowLightbox(false);
    setTimeout(() => setActiveIndex(null), 300);
  };

  const prev = () =>
    setActiveIndex((i) => (i === 0 ? photos.length - 1 : i - 1));

  const next = () =>
    setActiveIndex((i) => (i === photos.length - 1 ? 0 : i + 1));

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    const handler = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  const loadMore = () => {
    prevVisibleCount.current = visibleCount;
    setVisibleCount((prev) => prev + PHOTOS_PER_LOAD);
  };

  return (
    <section className="w-full bg-softBlue text-white overflow-hidden">
      <div className="max-w-7xl mx-auto py-12">
        <h2 className="text-5xl md:text-6xl font-chalk text-center text-rsvpBg mb-4 px-4">
          PHOTO GALLERY
        </h2>
        <p className="text-center text-2xl md:text-3xl text-rsvpBg mb-8 px-4">
          Luke's special moments and growth <br /> captured in pictures
        </p>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4">
          {visiblePhotos.map((src, index) => {
            const isNew = index >= prevVisibleCount.current;

            return (
              <button
                key={index}
                onClick={() => open(index)}
                style={
                  isNew
                    ? { animationDelay: `${(index - prevVisibleCount.current) * 70}ms` }
                    : {}
                }
                className={`
                  bg-white rounded-lg shadow-md overflow-hidden focus:outline-none
                  ${isNew ? "opacity-0 animate-slideDown" : ""}
                `}
              >
                <img
                  src={src}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-[300px] object-cover hover:scale-105 transition"
                />
              </button>
            );
          })}
        </div>

        {/* SEE MORE BUTTON */}
        {visibleCount < photos.length && (
          <div className="flex justify-center mt-20">
            <button
              onClick={loadMore}
              className="
                px-8 py-3 rounded-full border-2 border-white
                text-white font-semibold tracking-wide
                hover:bg-white hover:text-warning transition
              "
            >
              See more
            </button>
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {activeIndex !== null && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black duration-300 ${
            showLightbox ? "opacity-100" : "opacity-0"
          }`}
          onClick={close}
        >
          <img
            src={photos[activeIndex]}
            alt=""
            className={`max-h-[90vh] max-w-[90vw] object-contain transition-transform duration-300 ${
              showLightbox ? "scale-100" : "scale-90"
            }`}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={close}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            ✕
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 md:left-10 text-white text-4xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-6 h-6"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>

          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 md:right-10 text-white text-4xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-6 h-6"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
