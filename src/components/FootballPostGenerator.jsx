import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";

function FootballPostGenerator() {
  const [teamLogo, setTeamLogo] = useState(null);
  const [opponentLogo, setOpponentLogo] = useState(null);
  const [date, setDate] = useState("24 September 2025 Sunday");
  const [time, setTime] = useState("4:30 PM");
  const [stadium, setStadium] = useState("Dolphin Ground,  Lahore");
  const [bgColor, setBgColor] = useState("#1e3a8a"); // default blue
  const [textColor, setTextColor] = useState("#ffffff"); // default white
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
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        ⚽ Football Match Post Generator
      </h1>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-6">
        <input type="file" accept="image/*"
          onChange={(e) => handleImageUpload(e, setTeamLogo)}
          className="p-2 border rounded bg-gray-800 text-sm sm:text-base" />
        <input type="file" accept="image/*"
          onChange={(e) => handleImageUpload(e, setOpponentLogo)}
          className="p-2 border rounded bg-gray-800 text-sm sm:text-base" />
        <input type="text" placeholder="Match Date" value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded bg-gray-800 text-sm sm:text-base" />
        <input type="text" placeholder="Match Time" value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 border rounded bg-gray-800 text-sm sm:text-base" />
        <input type="text" placeholder="Stadium Name" value={stadium}
          onChange={(e) => setStadium(e.target.value)}
          className="p-2 border rounded bg-gray-800 text-sm sm:text-base col-span-1 md:col-span-2" />

        {/* Color Pickers */}
        <div className="flex items-center gap-2">
          <label className="text-sm">Background:</label>
          <input type="color" value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-12 h-8 cursor-pointer" />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">Text:</label>
          <input type="color" value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-12 h-8 cursor-pointer" />
        </div>
      </div>

      {/* Poster Preview */}
      <div
        ref={postRef}
        className="relative rounded-2xl w-full max-w-lg sm:max-w-3xl shadow-2xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${bgColor}, #000000)`,
          color: textColor,
        }}
      >
        {/* Top Glow Shape */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center p-6 sm:p-10">
          {/* Logos with circles */}
          <div className="flex items-center justify-between w-full">
            {teamLogo && (
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-yellow-400 flex items-center justify-center bg-white shadow-lg">
                <img src={teamLogo} alt="Team Logo"
                  className="w-20 h-20 sm:w-28 sm:h-28 object-contain rounded-full" />
              </div>
            )}
            {/* VS Badge */}
            <div className="mx-4 sm:mx-8 bg-yellow-500 text-black font-bold rounded-full w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center text-xl sm:text-2xl shadow-lg">
              VS
            </div>
            {opponentLogo && (
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-yellow-400 flex items-center justify-center bg-white shadow-lg">
                <img src={opponentLogo} alt="Opponent Logo"
                  className="w-20 h-20 sm:w-28 sm:h-28 object-contain rounded-full" />
              </div>
            )}
          </div>

          {/* Match Info Banner */}
          <div className="mt-8 w-full text-center bg-black/60 rounded-xl py-4 px-6 backdrop-blur-md shadow-lg">
            <p className="text-lg sm:text-xl font-semibold">{date}</p>
            <p className="text-base sm:text-lg">{time}</p>
            <p className="text-base sm:text-lg mt-2">{stadium}</p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadPoster}
        className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg shadow-lg text-base sm:text-lg"
      >
        Download Poster
      </button>
    </div>
  );
}

export default FootballPostGenerator;
