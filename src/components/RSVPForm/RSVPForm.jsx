import React, { useState, useRef, useEffect } from "react";
import ChoiceStep from "./ChoiceStep";
import AttendingStep from "./AttendingStep";
import VideoStep from "./VideoStep";
import { updateNamesArray } from "./helpers";
import { successAlert, errorAlert } from "../../utils/alert";

export default function RSVPForm() {
  const [step, setStep] = useState("choice");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    adults: 1,
    adultNames: [""],
    hasChildren: false,
    children: 0,
    childrenNames: [],
    videoFile: null,
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // 🔥 REF FOR AUTO-SCROLL
  const formRef = useRef(null);

  // 🔥 AUTO CENTER FORM WHEN STEP CHANGES
  useEffect(() => {
    if (step !== "choice" && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [step]);

  const handleAdults = (delta) => {
    setFormData((prev) => {
      const newCount = Math.max(1, Math.min(3, prev.adults + delta));
      return {
        ...prev,
        adults: newCount,
        adultNames: updateNamesArray(newCount, prev.adultNames),
      };
    });
  };

  const handleChildren = (delta) => {
    setFormData((prev) => {
      const newCount = Math.max(1, Math.min(3, prev.children + delta));
      return {
        ...prev,
        children: newCount,
        childrenNames: updateNamesArray(newCount, prev.childrenNames),
      };
    });
  };

  const handleChange = (e, index, type) => {
    const { name, value, checked, files } = e.target;

    if (name === "hasChildren") {
      setFormData((prev) => ({
        ...prev,
        hasChildren: checked,
        children: checked ? 1 : 0,
        childrenNames: checked ? [""] : [],
      }));
      return;
    }

    if (type === "adult") {
      setFormData((prev) => {
        const updated = [...prev.adultNames];
        updated[index] = value;
        return { ...prev, adultNames: updated };
      });
      return;
    }

    if (type === "child") {
      setFormData((prev) => {
        const updated = [...prev.childrenNames];
        updated[index] = value;
        return { ...prev, childrenNames: updated };
      });
      return;
    }

    if (name === "videoFile") {
      setFormData((prev) => ({ ...prev, videoFile: files[0] }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, videoFile: null }));
    setUploadProgress(0);
  };

  const resetForm = () => {
    setStep("choice");
    setFormData({
      email: "",
      name: "",
      adults: 1,
      adultNames: [""],
      hasChildren: false,
      children: 0,
      childrenNames: [],
      videoFile: null,
    });
    setUploadProgress(0);
    setUploading(false);
  };

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
        errorAlert("Incomplete Form", "Please provide email and select a video file.");
        return;
      }

      setUploading(true);

      const base64Video = await fileToBase64(formData.videoFile);

      const payload = {
        email: formData.email,
        name: formData.name || formData.email,
        fileName: formData.videoFile.name,
        mimeType: formData.videoFile.type,
        videoBase64: base64Video,
      };

      setUploadProgress(100);

      try {
        await fetch(
          "https://script.google.com/macros/s/AKfycbymRUqfpvcd_4PLXrpMowKxMeyciCQV_1mtwjJ2GPq_660b2NKV08-KIFGbvyo97pgc/exec",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            mode: "no-cors",
          }
        );

        successAlert(
          "Video Greeting Sent",
          "Thank you for sending your video greeting 🎉"
        );
        resetForm();
      } catch {
        errorAlert("Upload Failed", "Please try again.");
      }
    } else {
      const payload = {
        email: formData.email,
        adults: formData.adults,
        adultNames: formData.adultNames,
        hasChildren: formData.hasChildren,
        children: formData.children,
        childrenNames: formData.childrenNames,
      };

      try {
        await fetch(
          "https://script.google.com/macros/s/AKfycbyfDDx8jhvuECMaiy-ZA-wU-U4apouErTjNbLXOZQVfZKJH3ZnRxtRu3xPHxN2pdizFiA/exec",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            mode: "no-cors",
          }
        );

        successAlert("RSVP Submitted!", "Thank you for confirming 🎉");
        resetForm();
      } catch {
        errorAlert("Submission Failed", "Please try again.");
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center w-full overflow-hidden bg-success text-white">
      {/* Moving background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="flex w-[200%] h-full">
          <img
            src="/assets/images/backgrounds/green-background.jpg"
            alt=""
            className="w-1/2 h-full object-cover opacity-20"
          />
        </div>
      </div>

  <div ref={formRef} className="w-full max-w-md relative z-10 mt-16">
    <h2 className="text-5xl md:text-6xl font-chalk text-center text-rsvpBg mb-4">
      RSVP
    </h2>
    <p className={`text-center text-2xl md:text-3xl text-rsvpBg ${step === "video" ? "mb-28" : "mb-10"}`}>
      We can't wait to celebrate with you!
    </p>

    {step === "choice" && <ChoiceStep setStep={setStep} />}
    {step === "attending" && (
      <AttendingStep
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleAdults={handleAdults}
        handleChildren={handleChildren}
        resetForm={resetForm}
      />
    )}
    {step === "video" && (
      <VideoStep
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        uploadProgress={uploadProgress}
        uploading={uploading}
        removeFile={removeFile}
        resetForm={resetForm}
      />
    )}
  </div>
</section>
  );
}
