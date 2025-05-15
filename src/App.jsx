import { useState } from "react";

function App() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPrediction(null);
    }
  };

  const handlePredict = () => {
    const fakeResult = "A";
    setPrediction(fakeResult);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Letter Recognition</h1>

        <label className="block mb-4 cursor-pointer">
          <span className="text-sm text-gray-500">Upload a letter image</span>
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
          disabled={!image}
          className={`w-full py-2 rounded-lg text-white font-medium transition-all ${
            image
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Predict Letter
        </button>

        {prediction && (
          <div className="mt-6 text-2xl font-bold text-green-600 animate-bounce">
            Predicted: {prediction}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
