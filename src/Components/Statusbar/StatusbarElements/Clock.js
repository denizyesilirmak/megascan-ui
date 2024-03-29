import React from 'react';
import LiveClock from 'react-live-clock';
function Clock() {
  return (
    <div style={{ color: '#fff', fontSize: 30, fontFamily: 'Arial', fontWeight: 'bold' }}>
      {
        <LiveClock format={'HH:mm'} ticking={true} />
      }
    </div>
  );
}

export default Clock