import React from 'react'

const Indicator = (props) => {
  return (
    <div className="vlf-indicator">
      <svg width="350" height="320" className="vlf-center">
        <defs>
          <radialGradient id="RadialGradient2" cx="0.50" cy="0.50" r="0.50">
            <stop offset="80%" stopColor="black" />
            <stop offset="100%" stopColor="darkblue" />
          </radialGradient>
        </defs>
        <g>
          <text x="30" y="10" fill="#ffffff" alignmentBaseline="middle" textAnchor="midde">Signal</text>
          <rect className="vlf-rect" rx="3" x="60" y={28 + 15 * 0} width="120" height="10" fill={props.value > 90 ? '#ff0000' : 'darkblue'} />
          <rect className="vlf-rect" rx="3" x="40" y={28 + 15 * 1} width="120" height="10" fill={props.value > 85 ? '#ff0000' : 'darkblue'} />
          <rect className="vlf-rect" rx="3" x="25" y={28 + 15 * 2} width="120" height="10" fill={props.value > 80 ? '#ff0000' : 'darkblue'} />
          <rect className="vlf-rect" rx="3" x="15" y={28 + 15 * 3} width="120" height="10" fill={props.value > 75 ? '#ff0000' : 'darkblue'} />
          <rect className="vlf-rect" rx="3" x="10" y={28 + 15 * 4} width="120" height="10" fill={props.value > 70 ? '#ff0000' : 'darkblue'} />
          <rect className="vlf-rect" rx="3" x="10" y={28 + 15 * 5} width="120" height="10" fill={props.value > 65 ? '#ff0000' : 'darkblue'} />
          <rect className="vlf-rect" rx="3" x="10" y={28 + 15 * 6} width="120" height="10" fill={props.value > 60 ? '#ff2200' : 'darkblue'} />
          <rect className="vlf-rect" rx="3" x="10" y={28 + 15 * 7} width="120" height="10" fill={props.value > 55 ? '#ff4800' : 'darkblue'} />
          <rect className="vlf-rect" rx="3" x="10" y={28 + 15 * 8} width="120" height="10" fill={props.value > 50 ? '#ff6f00' : 'darkblue'} />
          <rect className="vlf-rect" rx="3" x="10" y={28 + 15 * 9} width="120" height="10" fill={props.value > 45 ? '#ff8c00' : 'darkblue'} />
          <rect className="vlf-rect" rx="3" x="10" y={28 + 15 * 10} width="120" height="10" fill={props.value > 40 ? '#ffb700' : 'darkblue'} />
          <rect className="vlf-rect" rx="3" x="10" y={28 + 15 * 11} width="120" height="10" fill={props.value > 35 ? '#ffdd00' : 'darkblue'} />
          <rect className="vlf-rect" rx="3" x="10" y={28 + 15 * 12} width="120" height="10" fill={props.value > 30 ? '#ffff00' : 'darkblue'} />
          <rect className="vlf-rect" rx="3" x="10" y={28 + 15 * 13} width="120" height="10" fill={props.value > 25 ? '#ddff00' : 'darkblue'} />
          <rect className="vlf-rect" rx="3" x="15" y={28 + 15 * 14} width="120" height="10" fill={props.value > 20 ? '#b3ff00' : 'darkblue'} />
          <rect className="vlf-rect" rx="3" x="25" y={28 + 15 * 15} width="120" height="10" fill={props.value > 15 ? '#84ff00' : 'darkblue'} />
          <rect className="vlf-rect" rx="3" x="40" y={28 + 15 * 16} width="120" height="10" fill={props.value > 10 ? '#48ff00' : 'darkblue'} />
          <rect className="vlf-rect" rx="3" x="60" y={28 + 15 * 17} width="120" height="10" fill={props.value > 5 ? '#26ff00' : 'darkblue'} />
        </g>

        <g>
          <text x="265" y="10" fill="#ffffff" alignmentBaseline="middle" textAnchor="midde">Disc.</text>
          <rect className="vlf-rect" rx="3" x="170" y={28 + 15 * 0} width="120" height="10" fill={props.value > 50 ? '#ff0000' : '#00ffff'} />
          <rect className="vlf-rect" rx="3" x="190" y={28 + 15 * 1} width="120" height="10" fill={props.value > 50 ? '#ff0000' : '#00ffff'} />
          <rect className="vlf-rect" rx="3" x="205" y={28 + 15 * 2} width="120" height="10" fill={props.value > 50 ? '#ff0000' : '#00ffff'} />
          <rect className="vlf-rect" rx="3" x="215" y={28 + 15 * 3} width="120" height="10" fill={props.value > 50 ? '#ff0000' : '#00ffff'} />
          <rect className="vlf-rect" rx="3" x="220" y={28 + 15 * 4} width="120" height="10" fill={props.value > 50 ? '#ff0000' : '#00ffff'} />
          <rect className="vlf-rect" rx="3" x="220" y={28 + 15 * 5} width="120" height="10" fill={props.value > 50 ? '#ff0000' : '#00ffff'} />
          <rect className="vlf-rect" rx="3" x="220" y={28 + 15 * 6} width="120" height="10" fill={props.value > 50 ? '#ff0000' : '#00ffff'} />
          <rect className="vlf-rect" rx="3" x="220" y={28 + 15 * 7} width="120" height="10" fill={props.value > 50 ? '#ff0000' : '#00ffff'} />
          <rect className="vlf-rect" rx="3" x="220" y={28 + 15 * 8} width="120" height="10" fill={props.value > 50 ? '#ff0000' : '#00ffff'} />
          <rect className="vlf-rect" rx="3" x="220" y={28 + 15 * 9} width="120" height="10" fill={props.value > 50 ? '#ff0000' : '#00ffff'} />
          <rect className="vlf-rect" rx="3" x="220" y={28 + 15 * 10} width="120" height="10" fill={props.value > 50 ? '#ff0000' : '#00ffff'} />
          <rect className="vlf-rect" rx="3" x="220" y={28 + 15 * 11} width="120" height="10" fill={props.value > 50 ? '#ff0000' : '#00ffff'} />
          <rect className="vlf-rect" rx="3" x="220" y={28 + 15 * 12} width="120" height="10" fill={props.value > 50 ? '#ff0000' : '#00ffff'} />
          <rect className="vlf-rect" rx="3" x="220" y={28 + 15 * 13} width="120" height="10" fill={props.value > 50 ? '#ff0000' : '#00ffff'} />
          <rect className="vlf-rect" rx="3" x="210" y={28 + 15 * 14} width="120" height="10" fill={props.value > 50 ? '#ff0000' : '#00ffff'} />
          <rect className="vlf-rect" rx="3" x="205" y={28 + 15 * 15} width="120" height="10" fill={props.value > 50 ? '#ff0000' : '#00ffff'} />
          <rect className="vlf-rect" rx="3" x="190" y={28 + 15 * 16} width="120" height="10" fill={props.value > 50 ? '#ff0000' : '#00ffff'} />
          <rect className="vlf-rect" rx="3" x="170" y={28 + 15 * 17} width="120" height="10" fill={props.value > 50 ? '#ff0000' : '#00ffff'} />
        </g>


        <circle className="vlf-circle" cx="175" cy="160" r={150 - props.value / 6} fill="url(#RadialGradient2)" />
        <text x="175" y="80" fontSize="22" fill="#cacaca" textAnchor="middle" alignmentBaseline="middle">Target ID</text>
        <text x="175" y="260" fontSize="20" fill="#cacaca" textAnchor="middle" alignmentBaseline="middle">GB: --</text>

        <text x="175" y="185"
          alignmentBaseline="middle"
          textAnchor="middle"
          fontSize="160"
          fontWeight="bold"
          fill="rgb(7, 222, 250)"
          fontFamily="Courier"
          stroke="#ffffff"
          strokeWidth="4"
        >
          22
            </text>


      </svg>
    </div>
  )
}

export default Indicator