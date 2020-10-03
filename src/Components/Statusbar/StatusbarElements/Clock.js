import React from 'react';
import LiveClock from 'react-live-clock';
function Clock() {
  return (
    <div style={{ color: '#fff', fontSize: 28, fontFamily: 'FasterOne' }}>
      {
        <LiveClock format={'HH:mm'} ticking={true} />
      }
    </div>
  );
}

export default Clock