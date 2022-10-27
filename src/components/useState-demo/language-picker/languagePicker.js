import React, { useState } from "react";

const languages = [
  {
    name: "UK",
    flag: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/800px-Flag_of_the_United_Kingdom.svg.png",
  },
  {
    name: "India",
    flag: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/255px-Flag_of_India.svg.png",
  },
  {
    name: "South Korea",
    flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/255px-Flag_of_South_Korea.svg.png",
  },
  {
    name: "Mongolia",
    flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Mongolia.svg/640px-Flag_of_Mongolia.svg.png",
  },
];

const LanguagePicker = () => {
  const [showOtherFlags, setShowOtherFlags] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  return (
    <div>
      <div>
      <button onClick={() => setShowOtherFlags((curr) => !curr)}>
          <img src={selectedLanguage.flag} style={{width:200}} alt="country flag" />
        </button>
      </div>
      { showOtherFlags && (
      <div>
        {languages
        .filter((c) => c.name !== selectedLanguage.name)
        .sort((c1,c2) => (c1.name > c2.name ? 1 : -1))
        .map((c, cIdx) => (
          <button
            key={cIdx}
            onClick={() => {
              setSelectedLanguage(c);
              setShowOtherFlags(false);
            }}
          >
            <img src={c.flag} style={{width:60}} alt="country flag"></img>
            <span>{c.name}</span>
          </button>
        ))}
      </div>
      )}
    </div>
  );
};
export default LanguagePicker;
