import { useState } from "react";
import axios from "axios";
import classToSinhala from "./classToSinhala";

function App() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPrediction(null);
    }
  };

  const handlePredict = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    try {
      setLoading(true);
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/predict/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const preds = response.data.predictions;
      if (preds && preds.length > 0) {
        const topPrediction = preds[0].name || preds[0].class || "Unknown";
        const sinhalaLetter = classToSinhala[className] || className;
        setPrediction(sinhalaLetter);
      } else {
        setPrediction("No letter detected");
      }
    } catch (error) {
      console.error("Prediction failed:", error);
      setPrediction("Error predicting letter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/background.jpg')] bg-center bg-cover flex items-center justify-center p-4">
      <div className="rounded-2xl shadow-2xl p-8 w-full max-w-md text-center backdrop-blur-2xl">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Sinhala Handwritten Letter Recognition</h1>

        <label className="block mb-4 cursor-pointer">
          <span className="text-sm text-gray-900">Upload a letter image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 w-full text-sm text-gray-600 bg-gray-100 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </label>

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-40 h-40 object-contain border rounded-lg mx-auto mb-4 shadow"
          />
        )}

        <button
          onClick={handlePredict}
          disabled={!image || loading}
          className={`w-full py-2 rounded-lg text-white font-medium transition-all ${
            image && !loading
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? "Predicting..." : "Predict Letter"}
        </button>

        {prediction && (
          <div className="mt-6 text-3xl font-bold text-green-600 animate-bounce">
            Predicted: {prediction}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
