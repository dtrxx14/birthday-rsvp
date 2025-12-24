export default function VideoStep({ formData, setFormData, handleSubmit, uploadProgress, uploading, removeFile, resetForm }) {
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData((prev) => ({ ...prev, videoFile: e.dataTransfer.files[0] }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, videoFile: e.target.files[0] }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg mb-8">
        <div className="mb-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-secondary">Upload Your Video</h2>
                <button type="button" onClick={resetForm} className="text-sm text-gray-500 hover:text-secondary transition">Change response</button>
            </div>
            <p className="text-gray-400 text-xs">If you are unable to attend the event, we would still love to include you. Please send us a short video greeting to be included in our celebration.</p>
        </div>
        <div className="space-y-6">
            <div>
            <label className="block text-secondary">Email *</label>
            <input type="email" name="email" required value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-primary outline-none"/>
            </div>

            <div>
            <label className="block text-secondary">Name *</label>
            <input type="text" name="name" required value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-primary outline-none"/>
            </div>

            <div className="rounded-md border-2 border-gray-200 border-dashed" onDragOver={e => e.preventDefault()} onDrop={handleDrop}>
            <div className="p-4 min-h-[200px] flex flex-col items-center justify-center text-center cursor-pointer">
                <h4 className="text-base font-semibold text-slate-600">
                Drag & Drop or{" "}
                <label htmlFor="chooseFile" className="text-blue-600 cursor-pointer underline">Choose file</label> to upload
                </h4>
                <input type="file" id="chooseFile" className="hidden" accept="video/*" onChange={handleFileChange}/>
            </div>
            </div>

            {formData.videoFile && (
            <div className="space-y-4 mt-6">
                <div className="flex flex-col bg-gray-100 p-4 rounded-md">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-slate-500 font-semibold flex-1 flex items-center">
                    {formData.videoFile.name} <span className="ml-2">{(formData.videoFile.size / 1024 / 1024).toFixed(2)} mb</span>
                    </p>
                    <button type="button" onClick={removeFile} className="w-5 h-5 shrink-0 text-slate-500 hover:text-red-500">✕</button>
                </div>

                <div className="bg-gray-300 rounded-full w-full h-2">
                    <div className="h-full rounded-full bg-blue-600 relative" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                <p className="text-xs text-slate-500 font-semibold mt-2">{uploadProgress}% done</p>
                </div>
            </div>
            )}

            <button type="submit" disabled={uploading} className="w-full bg-secondary text-white py-3 rounded-xl font-semibold text-lg hover:bg-orange-500 transition disabled:opacity-50">
            {uploading ? "Uploading..." : "Submit Video"}
            </button>
        </div>
    </form>
  );
}
