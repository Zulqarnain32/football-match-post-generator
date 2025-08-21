import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";

function FootballPostGenerator() {
  const [teamLogo, setTeamLogo] = useState(null);
  const [opponentLogo, setOpponentLogo] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [stadium, setStadium] = useState("");
  const [bgColor, setBgColor] = useState("#065f46"); // default green background
  const [textColor, setTextColor] = useState("#ffffff"); // default white text

  const postRef = useRef(null);

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadPoster = () => {
    if (postRef.current === null) return;

    htmlToImage.toPng(postRef.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "football-match-poster.png";
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">
        ⚽ Football Match Post Generator
      </h1>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, setTeamLogo)}
          className="p-2 border rounded bg-gray-800 text-sm sm:text-base"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, setOpponentLogo)}
          className="p-2 border rounded bg-gray-800 text-sm sm:text-base"
        />
        <input
          type="text"
          placeholder="Match Date (24 August 2025)"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded bg-gray-800 text-sm sm:text-base"
        />
        <input
          type="text"
          placeholder="Match Time (4:30 PM)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 border rounded bg-gray-800 text-sm sm:text-base"
        />
        <input
          type="text"
          placeholder="Stadium Name (e.g. Dolphin Ground, Lahore)"
          value={stadium}
          onChange={(e) => setStadium(e.target.value)}
          className="p-2 border rounded bg-gray-800 text-sm sm:text-base col-span-1 md:col-span-2"
        />

        {/* New: Background color picker */}
        <div className="flex items-center gap-2">
          <label className="text-sm">Background:</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-12 h-8 cursor-pointer"
          />
        </div>

        {/* New: Text color picker */}
        <div className="flex items-center gap-2">
          <label className="text-sm">Text Color:</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-12 h-8 cursor-pointer"
          />
        </div>
      </div>

      {/* Preview */}
      <div
        ref={postRef}
        className="relative rounded-xl p-4 sm:p-6 w-full max-w-lg sm:max-w-3xl shadow-xl"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <div className="flex justify-between items-center">
          {teamLogo && (
            <img
              src={teamLogo}
              alt="Team Logo"
              className="w-20 h-20 sm:w-32 sm:h-32 object-contain"
            />
          )}
          <span className="text-2xl sm:text-3xl font-bold">VS</span>
          {opponentLogo && (
            <img
              src={opponentLogo}
              alt="Opponent Logo"
              className="w-20 h-20 sm:w-32 sm:h-32 object-contain"
            />
          )}
        </div>

        <div className="text-center mt-4 sm:mt-6">
          <p className="text-lg sm:text-xl font-semibold">{date}</p>
          <p className="text-base sm:text-lg">{time}</p>
          <p className="text-base sm:text-lg mt-2">{stadium}</p>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadPoster}
        className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg shadow-lg text-sm sm:text-base"
      >
        Download Poster
      </button>
    </div>
  );
}

export default FootballPostGenerator;
