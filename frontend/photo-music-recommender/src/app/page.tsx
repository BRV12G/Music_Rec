
"use client";
// app/page.tsx

import { useState } from "react";

const Home = () => {
  const [image, setImage] = useState<File | null>(null);
  const [language, setLanguage] = useState<string>("en");
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("photo", image);
    formData.append("language", language);

    try {
      const response = await fetch("/api/upload-photo", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        alert("Error: " + data.error);
        return;
      }

      setRecommendations(data.recommendations);
    } catch (error) {
      console.error("Error submitting the form: ", error);
      alert("An error occurred while fetching recommendations.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex justify-center items-center p-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Music Recommendation Based on Photo</h1>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="mb-4">
            <label htmlFor="photo" className="block text-gray-700 font-semibold">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full mt-2 border-2 border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="language" className="block text-gray-700 font-semibold">Choose Song Language</label>
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              className="w-full mt-2 border-2 border-gray-300 p-2 rounded-md"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              {/* Add more languages as needed */}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Recommended Songs:</h2>
          {recommendations.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {recommendations.map((song, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
                  <div>
                    <p className="font-semibold text-gray-800">{song.title}</p>
                    <p className="text-gray-600">{song.artist}</p>
                  </div>
                  <img src={song.albumArt} alt={`${song.title} album`} className="w-12 h-12 rounded-full" />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mt-4">No recommendations yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
