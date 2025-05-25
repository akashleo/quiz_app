import React from 'react';
import './Dashboard.css';

const Achievements = ({ emojiMap }) => {
  return (
    <div className="achivement">
      <h3 className="achivement-name">Achievements</h3>
      <div className="achievements-grid">
        {Object.entries(emojiMap).map(([emoji, count]) => (
          <div className="emoji-card" key={emoji}>
            <div className="emoji-symbol">
              {String.fromCodePoint(emoji.replace("U+", "0x"))}
            </div>
            <div className="emoji-count">{count}</div>
            <div className="emoji-multiplier">times</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements; 