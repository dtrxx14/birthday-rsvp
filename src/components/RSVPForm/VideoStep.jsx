import { useRef, useState } from "react";

export default function VideoStep({
  formData,
  setFormData,
  handleSubmit,
  uploadProgress,
  uploading,
  resetForm,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCounter.current += 1;
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) setIsDragging(false);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData((prev) => ({ ...prev, videoFile: e.dataTransfer.files[0] }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, videoFile: e.target.files[0] }));
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, videoFile: null }));
    if (fileInputRef.current) fileInputRef.current.value = ""; // allow re-select
  };

  return (
    <div className="relative">
      

      <form
        onSubmit={handleSubmit}
        className="bg-white text-rsvpText p-8 rounded-2xl shadow-lg mb-8 relative z-10"
      >
        {/* Floating Rosita2 above modal */}
        <img
            src="/assets/images/characters/Rosita1.png"
            alt="Rosita1"
            className="absolute -top-[140px] left-0 w-[240px] h-40 z-0 pointer-events-none"
        />
        {/* Header */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-secondary">Upload Your Video</h2>
            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-gray-500 hover:text-secondary transition"
            >
              Change response
            </button>
          </div>
          <p className="text-gray-400 text-xs">If you are unable to attend the event, we would still love to include you. Please send us a short video greeting to be included in our celebration.</p>
        </div>

        <div className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-secondary">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-secondary outline-none"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-secondary">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-secondary outline-none"
            />
          </div>

          {/* Drop Zone */}
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-md border-2 border-dashed transition-all duration-200 ${
              isDragging ? "bg-secondary/20 border-gray-400" : "bg-white border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="p-6 min-h-[200px] flex flex-col items-center justify-center text-center pointer-events-none">
              <img
                src="/assets/images/upload-video.png"
                alt="Upload Video"
                className="h-12 mb-4 animate-bounce"
              />
              <h4 className="text-base font-semibold text-slate-600">
                <span className="text-secondary">Choose a file</span> or drag it here
              </h4>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Selected File */}
          {formData.videoFile && (
            <div className="bg-gray-100 p-4 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs text-slate-600 font-semibold">
                  {formData.videoFile.name} • {(formData.videoFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-slate-500 hover:text-red-500"
                >
                  ✕
                </button>
              </div>

              <div className="bg-gray-300 rounded-full h-2">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>

              <p className="text-xs text-slate-500 mt-2">{uploadProgress}% done</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-secondary text-white py-3 rounded-xl font-semibold hover:bg-orange-500 transition disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Submit Video"}
          </button>
        </div>
      </form>
    </div>
  );
}
