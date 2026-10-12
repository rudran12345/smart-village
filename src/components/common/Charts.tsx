/**
 * Lightweight responsive SVG charts for time-series and metrics
 */

import React from 'react';

interface AreaChartProps {
  data: { label: string; value: number }[];
  color?: string;
  fillColor?: string;
  height?: number;
  unit?: string;
  min?: number;
  max?: number;
}

export const SparklineAreaChart: React.FC<AreaChartProps> = ({
  data,
  color = '#10B981', // emerald-500
  fillColor = 'rgba(16, 185, 129, 0.15)',
  height = 140,
  unit = '',
  min,
  max,
}) => {
  if (!data || data.length === 0) return <div className="text-xs text-slate-500 py-4">No data available</div>;

  const values = data.map((d) => d.value);
  const dataMin = min !== undefined ? min : Math.min(...values) * 0.9;
  const dataMax = max !== undefined ? max : Math.max(...values) * 1.05;
  const range = dataMax - dataMin || 1;

  const width = 500;
  const paddingX = 20;
  const paddingY = 15;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * chartWidth;
    const y = height - paddingY - ((d.value - dataMin) / range) * chartHeight;
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        {/* Horizontal gridlines */}
        <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
        <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
        <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="rgba(255,255,255,0.08)" />

        {/* Filled Area */}
        <path d={areaD} fill={fillColor} />

        {/* Trend Line */}
        <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points */}
        {points.map((p, idx) => (
          <g key={idx} className="group">
            <circle
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill="#0F172A"
              stroke={color}
              strokeWidth="2"
              className="transition-transform group-hover:scale-150 cursor-pointer"
            />
          </g>
        ))}
      </svg>

      {/* Axis Labels */}
      <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1 px-2">
        <span>{data[0]?.label}</span>
        <span>{data[Math.floor(data.length / 2)]?.label}</span>
        <span>{data[data.length - 1]?.label} ({data[data.length - 1]?.value}{unit})</span>
      </div>
    </div>
  );
};

interface MetricGaugeProps {
  value: number; // 0 - 100
  title: string;
  subtitle: string;
  status: 'Normal' | 'Warning' | 'Critical';
  unit?: string;
}

export const MetricGauge: React.FC<MetricGaugeProps> = ({
  value,
  title,
  subtitle,
  status,
  unit = '%',
}) => {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const colorMap = {
    Normal: '#10B981', // emerald
    Warning: '#F59E0B', // amber
    Critical: '#EF4444', // red
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
      <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={colorMap[status]}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-bold font-mono tracking-tight text-white">
            {value}
            <span className="text-xs font-normal text-slate-400">{unit}</span>
          </span>
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">{title}</p>
        <p className="text-sm font-semibold text-slate-200 mt-0.5">{subtitle}</p>
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: colorMap[status] }}
          />
          <span className="text-slate-400 capitalize">{status} Range</span>
        </div>
      </div>
    </div>
  );
};
