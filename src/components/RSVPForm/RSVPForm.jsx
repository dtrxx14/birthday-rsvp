import React, { useState } from "react";
import ChoiceStep from "./ChoiceStep";
import AttendingStep from "./AttendingStep";
import VideoStep from "./VideoStep";
import { updateNamesArray } from "./helpers";
import { successAlert, errorAlert } from "../../utils/alert";

export default function RSVPForm() {
  const [step, setStep] = useState("choice");
  const [formData, setFormData] = useState({
    email: "",
    adults: 1,
    adultNames: [""],
    hasChildren: false,
    children: 0,
    childrenNames: [],
    videoFile: null,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleAdults = (delta) => setFormData(prev => ({ ...prev, adults: Math.max(1, Math.min(2, prev.adults + delta)), adultNames: updateNamesArray(Math.max(1, Math.min(2, prev.adults + delta)), prev.adultNames) }));
  const handleChildren = (delta) => setFormData(prev => ({ ...prev, children: Math.max(0, Math.min(2, prev.children + delta)), childrenNames: updateNamesArray(Math.max(0, Math.min(2, prev.children + delta)), prev.childrenNames) }));

  const handleChange = (e, index, type) => {
    const { name, value, checked, files } = e.target;
    if (name === "hasChildren") {
      setFormData(prev => ({ ...prev, hasChildren: checked, children: checked ? prev.children || 1 : 0, childrenNames: checked ? updateNamesArray(1, []) : [] }));
      return;
    }
    if (type === "adult") return setFormData(prev => ({ ...prev, adultNames: [...prev.adultNames.slice(0, index), value, ...prev.adultNames.slice(index+1)] }));
    if (type === "child") return setFormData(prev => ({ ...prev, childrenNames: [...prev.childrenNames.slice(0, index), value, ...prev.childrenNames.slice(index+1)] }));
    if (name === "videoFile") return setFormData(prev => ({ ...prev, videoFile: files[0] }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const removeFile = () => { setFormData(prev => ({ ...prev, videoFile: null })); setUploadProgress(0); };
  const resetForm = () => { setStep("choice"); setFormData({ email: "", adults:1, adultNames:[""], hasChildren:false, children:0, childrenNames:[], videoFile:null }); setUploadProgress(0); setUploading(false); };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === "video") {
      if (!formData.email || !formData.videoFile) {
        errorAlert("Incomplete Form","Please provide email and select a video file.");
        return;
      }

      setUploading(true);

      const base64Video = await fileToBase64(formData.videoFile);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email: formData.email,
        name: formData.name || formData.email,
        fileName: formData.videoFile.name,
        mimeType: formData.videoFile.type,
        videoBase64: base64Video
      });

      try {
          await fetch(
            "https://script.google.com/macros/s/AKfycbymRUqfpvcd_4PLXrpMowKxMeyciCQV_1mtwjJ2GPq_660b2NKV08-KIFGbvyo97pgc/exec",
            {
              method: "POST",
              headers: myHeaders,
              body: raw,
              mode: "no-cors",
            }
          );

          setUploadProgress(100);
          successAlert("Video Greeting Sent","Thank you for sending your video greeting and even you can't attend, we appreciate your effort to celebrate with us! 🎉"); 
          resetForm();
        } catch (err) {
          console.error(err);
          errorAlert("Upload Failed","Please try again or check your internet connection.");
        }
        
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "email": formData.email,
        "adults": formData.adults,
        "adultNames": formData.adultNames,
        "hasChildren": formData.hasChildren,
        "children": formData.children,
        "childrenNames": formData.childrenNames
      });
     
        try {
          await fetch(
            "https://script.google.com/macros/s/AKfycbyfDDx8jhvuECMaiy-ZA-wU-U4apouErTjNbLXOZQVfZKJH3ZnRxtRu3xPHxN2pdizFiA/exec",
            {
              method: "POST",
              headers: myHeaders,
              body: raw,
              mode: "no-cors",
            }
          );

          successAlert("RSVP Submitted!","Thank you for confirming your attendance 🎉");
          resetForm();

        } catch (err) {
          console.error(err);
          errorAlert("Submission Failed","Please try again or check your internet connection.");
        }
    }
  };

  return (
    <section className="px-4 bg-success min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-5xl md:text-6xl font-chalk text-center text-rsvpBg mb-4 px-4">RSVP</h2>
        <p className="text-center text-2xl md:text-3xl text-rsvpBg mb-8 px-4">We can't wait to celebrate with you!</p>

        {step === "choice" && <ChoiceStep setStep={setStep} />}
        {step === "attending" && <AttendingStep formData={formData} setFormData={setFormData} handleChange={handleChange} handleSubmit={handleSubmit} handleAdults={handleAdults} handleChildren={handleChildren} resetForm={resetForm} />}
        {step === "video" && <VideoStep formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} uploadProgress={uploadProgress} uploading={uploading} removeFile={removeFile} resetForm={resetForm} />}
      </div>
    </section>
  );
}
