export default function ChoiceStep({ setStep }) {
  return (
    <div className="flex flex-col sm:flex-row gap-6">
      <button
        onClick={() => setStep("attending")}
        className="flex-1 uppercase bg-primary text-white py-6 rounded-xl text-xl font-semibold shadow hover:bg-red-600 transition"
      >
        I'll be there
      </button>
      <button
        onClick={() => setStep("video")}
        className="flex-1 uppercase bg-secondary text-white py-6 rounded-xl text-xl font-semibold shadow hover:bg-orange-500 transition"
      >
        Can't make it
      </button>
    </div>
  );
}
