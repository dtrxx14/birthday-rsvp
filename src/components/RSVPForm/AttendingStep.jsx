import React from "react";

export default function AttendingStep({
  formData,
  setFormData,
  handleChange,
  handleSubmit,
  handleAdults,
  handleChildren,
  resetForm,
}) {
  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg mb-8">
      <button
        type="button"
        onClick={resetForm}
        className="text-sm text-gray-500 flex justify-end w-full hover:text-secondary transition"
      >
        Change response
      </button>

      <div className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm text-secondary mb-1">Email *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        {/* Adults */}
        <div>
          <label className="block text-sm text-secondary">Adults</label>
          <p className="text-xs text-gray-400 mb-2">Include yourself • Max 2</p>
          <div className="inline-flex w-full border rounded-lg overflow-hidden">
            <button type="button" onClick={() => handleAdults(-1)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300">−</button>
            <div className="flex-1 text-center py-2">{formData.adults}</div>
            <button type="button" onClick={() => handleAdults(1)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300">+</button>
          </div>
        </div>

        {/* Adult Names */}
        {formData.adultNames.map((_, i) => (
          <div key={i}>
            <label className="block text-sm text-secondary mb-1">{i === 0 ? "Your Name *" : `Adult ${i + 1} Name`}</label>
            <input
              type="text"
              required={i === 0}
              value={formData.adultNames[i]}
              onChange={(e) => handleChange(e, i, "adult")}
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        ))}

        {/* Children */}
        <div className="flex items-center justify-between mb-4">
          <p className="mr-4 text-sm text-secondary">Bringing child / children?</p>
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              name="hasChildren"
              checked={formData.hasChildren}
              className="sr-only peer"
              onChange={handleChange}
            />
            <div className="w-11 h-6 flex items-center bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        {formData.hasChildren && (
          <>
            <div>
              <label className="block text-secondary">Children</label>
              <p className="text-xs text-gray-400 mb-2">Max 2</p>
              <div className="inline-flex w-full border rounded-lg overflow-hidden">
                <button type="button" onClick={() => handleChildren(-1)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300">−</button>
                <div className="flex-1 text-center py-2">{formData.children}</div>
                <button type="button" onClick={() => handleChildren(1)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300">+</button>
              </div>
            </div>

            {formData.childrenNames.map((_, i) => (
              <div key={i}>
                <label className="block text-secondary mb-1">Child {i + 1} Name</label>
                <input
                  type="text"
                  value={formData.childrenNames[i]}
                  onChange={(e) => handleChange(e, i, "child")}
                  className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            ))}
          </>
        )}

        <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl uppercase text-lg hover:bg-red-600 transition">Submit RSVP</button>
      </div>
    </form>
  );
}
