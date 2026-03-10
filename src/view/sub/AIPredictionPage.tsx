import { useRef, useState } from "react";
import { ArrowUploadRegular, SendRegular, ArrowResetRegular } from "@fluentui/react-icons";

const AIPredictionPage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState({
    title: "No prediction yet",
    description: "Upload an image and click send to see the AI prediction result.",
    recommendation: "Recommendations will appear here after prediction.",
  });

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
  };

  const handleSend = () => {
    // replace this with your API call
    setPrediction({
      title: "Leaf Disease Detected : WCLWD_Flaccidity",
      description:
        "The uploaded image appears to show signs of early fungal infection on the leaf surface, with visible discoloration and patching.",
      recommendation:
        "Isolate the affected plant, reduce overhead watering, and apply a suitable fungicide. Monitor nearby plants for similar symptoms.",
    });
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPrediction({
      title: "No prediction yet",
      description: "Upload an image and click send to see the AI prediction result.",
      recommendation: "Recommendations will appear here after prediction.",
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            AI Prediction
          </h1>
          <p className="mt-1 text-sm md:text-base text-gray-500">
            Upload an image and get AI-based prediction details with recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Section */}
          <div className="rounded-2xl bg-white p-4 md:p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Upload Image
            </h2>

            <div
              onClick={handleChooseImage}
              className="flex h-[280px] md:h-[360px] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-green-600 bg-gray-50 transition hover:bg-green-50"
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <ArrowUploadRegular fontSize={48} />
                  <p className="mt-3 text-sm md:text-base">
                    Click to upload image
                  </p>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleSend}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-3 font-medium text-white transition hover:bg-green-800"
              >
                <SendRegular fontSize={18} />
                Send
              </button>

              <button
                onClick={handleReset}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <ArrowResetRegular fontSize={18} />
                New
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="rounded-2xl bg-white p-4 md:p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Prediction Details
            </h2>

            <div className="space-y-5">
              <div className="rounded-xl bg-green-50 p-4">
                <p className="mb-1 text-sm font-medium text-green-700">Title</p>
                <h3 className="text-lg font-bold text-gray-800">
                  {prediction.title}
                </h3>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="mb-1 text-sm font-medium text-gray-600">
                  Description
                </p>
                <p className="text-sm leading-6 text-gray-700">
                  {prediction.description}
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="mb-1 text-sm font-medium text-emerald-700">
                  Recommendation
                </p>
                <p className="text-sm leading-6 text-gray-700">
                  {prediction.recommendation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPredictionPage;