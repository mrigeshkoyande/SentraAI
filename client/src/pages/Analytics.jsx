import { useMemo } from 'react';
import {
  Users, ShieldAlert, CheckCircle, TrendingUp,
  BarChart2, RefreshCw
} from 'lucide-react';
import { generateVisitors, generateAlerts, UNITS, HEATMAP_DATA } from '../data/mockData';
import './Analytics.css';

// ===== Sub-components =====

function StatCard({ label, value, delta, deltaUp, icon: Icon, color }) {
  return (
    <div className={`analytics-stat-card ${color}`}>
      <div className="stat-card-top">
        <div className={`stat-card-icon ${color}`}>
          <Icon size={18} />
        </div>
        {delta && (
          <span className={`stat-card-delta ${deltaUp ? 'up' : 'down'}`}>
            {deltaUp ? '↑' : '↓'} {delta}
          </span>
        )}
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
    </div>
  );
}

function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.count));
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const todayIdx = new Date().getDay(); // 0=Sun, 1=Mon...
  const todayLabel = days[(todayIdx + 6) % 7]; // convert to Mon-based

  return (
    <div className="bar-chart">
      {data.map((d, i) => {
        const heightPct = max > 0 ? (d.count / max) * 100 : 0;
        const isToday = d.day === todayLabel;
        return (
          <div key={d.day} className="bar-group">
            <div className="bar-wrapper">
              <div
                className={`chart-bar ${isToday ? 'today' : 'past'}`}
                style={{ height: `${Math.max(heightPct, 4)}%` }}
                title={`${d.day}: ${d.count} visitors`}
              />
            </div>
            <div className="bar-value">{d.count}</div>
            <div className="bar-label">{d.day}</div>
          </div>
        );
      })}
    </div>
  );
}

function DonutChart({ low, medium, high }) {
  const total = low + medium + high;
  const safeTotal = total || 1;

  // SVG donut segments
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const cx = 70;
  const cy = 70;
  const r = radius;

  const segments = [
    { value: low, color: '#34d399', label: 'Low Risk' },
    { value: medium, color: '#fbbf24', label: 'Medium Risk' },
    { value: high, color: '#f87171', label: 'High Risk' },
  ];

  let offset = 0;
  const paths = segments.map((seg) => {
    const pct = seg.value / safeTotal;
    const dash = pct * circumference;
    const gap = circumference - dash;
    const el = (
      <circle
        key={seg.label}
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={seg.color}
        strokeWidth="14"
        strokeDasharray={`${dash} ${gap}`}
        strokeDashoffset={-offset}
        strokeLinecap="round"
        style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px`, transition: 'stroke-dasharray 0.6s ease' }}
      />
    );
    offset += dash;
    return el;
  });

  const approvalRate = total > 0 ? Math.round((low / total) * 100) : 0;

  return (
    <div className="donut-chart-wrapper">
      <div className="donut-svg-container">
        <svg width="140" height="140" viewBox="0 0 140 140">
          {/* Background track */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="14"
          />
          {paths}
        </svg>
        <div className="donut-center-text">
          <div className="donut-center-value">{approvalRate}%</div>
          <div className="donut-center-label">Low Risk</div>
        </div>
      </div>
      <div className="donut-legend">
        {segments.map(seg => (
          <div key={seg.label} className="donut-legend-item">
            <div className="donut-legend-left">
              <div className="donut-legend-dot" style={{ background: seg.color }} />
              <span className="donut-legend-label">{seg.label}</span>
            </div>
            <span className="donut-legend-count">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Heatmap() {
  const HOURS = [6, 9, 12, 15, 18, 21];
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Generate stable heatmap data
  const heat = useMemo(() => {
    return DAYS.map(day =>
      Array.from({ length: 24 }, (_, h) => {
        const seed = (day.charCodeAt(0) + h * 13) % 47;
        // Peak hours 8-10, 14-16
        let base = 0;
        if (h >= 8 && h <= 10) base = 3;
        else if (h >= 14 && h <= 16) base = 2;
        else if (h >= 6 && h < 8) base = 1;
        else if (h >= 17 && h <= 19) base = 2;
        const level = Math.min(4, base + (seed % 3));
        return { hour: h, level };
      })
    );
  }, []);

  return (
    <div className="heatmap-grid">
      {/* Hour labels — only show selected hours */}
      <div className="heatmap-hours">
        {Array.from({ length: 24 }, (_, h) => (
          <div
            key={h}
            className="heatmap-hour-label"
            style={{ opacity: HOURS.includes(h) ? 1 : 0 }}
          >
            {h === 0 ? '12a' : h < 12 ? `${h}a` : h === 12 ? '12p' : `${h - 12}p`}
          </div>
        ))}
      </div>
      {heat.map((dayData, di) => (
        <div key={DAYS[di]} className="heatmap-row">
          <div className="heatmap-day-label">{DAYS[di]}</div>
          <div className="heatmap-cells">
            {dayData.map((cell, hi) => (
              <div
                key={hi}
                className={`heatmap-cell level-${cell.level}`}
                title={`${DAYS[di]} ${cell.hour}:00 — Level ${cell.level}`}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="heatmap-legend">
        <span className="heatmap-legend-label">Less</span>
        <div className="heatmap-legend-scale">
          {[0, 1, 2, 3, 4].map(l => (
            <div
              key={l}
              className="heatmap-legend-cell"
              style={{
                background: `rgba(139, 92, 246, ${l === 0 ? 0.06 : l * 0.2 + 0.1})`
              }}
            />
          ))}
        </div>
        <span className="heatmap-legend-label">More</span>
      </div>
    </div>
  );
}

function TopUnits({ visitors }) {
  const unitCounts = useMemo(() => {
    const counts = {};
    visitors.forEach(v => {
      counts[v.unit] = (counts[v.unit] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7);
  }, [visitors]);

  const max = unitCounts[0]?.[1] || 1;

  return (
    <div className="top-units-list">
      {unitCounts.map(([unit, count], i) => (
        <div key={unit} className="top-unit-row">
          <div className="top-unit-rank">#{i + 1}</div>
          <div className="top-unit-bar-wrapper">
            <div className="top-unit-info">
              <span className="top-unit-name">{unit}</span>
              <span className="top-unit-count">{count} visits</span>
            </div>
            <div className="top-unit-progress">
              <div
                className="top-unit-fill"
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ===== Main Component =====
export default function Analytics() {
  const visitors = useMemo(() => generateVisitors(120), []);
  const alerts = useMemo(() => generateAlerts(30), []);

  // Compute stats
  const totalVisitors = visitors.length;
  const approvedCount = visitors.filter(v => v.status === 'approved').length;
  const deniedCount = visitors.filter(v => v.status === 'denied').length;
  const approvalRate = Math.round((approvedCount / totalVisitors) * 100);
  const activeAlerts = alerts.filter(a => !a.resolved).length;
  const avgTrust = Math.round(visitors.reduce((s, v) => s + v.trustScore, 0) / totalVisitors);

  const riskDist = {
    low: visitors.filter(v => v.trustLevel === 'Low').length,
    medium: visitors.filter(v => v.trustLevel === 'Medium').length,
    high: visitors.filter(v => v.trustLevel === 'High').length,
  };

  const weeklyData = [
    { day: 'Mon', count: 45 }, { day: 'Tue', count: 62 }, { day: 'Wed', count: 38 },
    { day: 'Thu', count: 71 }, { day: 'Fri', count: 55 }, { day: 'Sat', count: 28 },
    { day: 'Sun', count: 19 },
  ];

  return (
    <div className="analytics-page">
      {/* Summary Stats */}
      <div className="analytics-summary">
        <StatCard
          label="Total Visitors (Last 30d)"
          value={totalVisitors.toLocaleString()}
          delta="12.5%"
          deltaUp
          icon={Users}
          color="purple"
        />
        <StatCard
          label="Approval Rate"
          value={`${approvalRate}%`}
          delta="3.2%"
          deltaUp
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          label="Active Alerts"
          value={activeAlerts}
          delta="2"
          deltaUp={false}
          icon={ShieldAlert}
          color="red"
        />
        <StatCard
          label="Avg. Trust Score"
          value={avgTrust}
          delta="1.4"
          deltaUp
          icon={TrendingUp}
          color="cyan"
        />
      </div>

      {/* Charts Row */}
      <div className="analytics-charts-row">
        {/* Weekly Bar Chart */}
        <div className="analytics-chart-card">
          <div className="chart-card-header">
            <h3>
              <BarChart2 size={16} />
              Weekly Visitor Volume
            </h3>
            <div className="chart-live-badge">
              <div className="chart-live-dot" />
              Live
            </div>
          </div>
          <BarChart data={weeklyData} />
        </div>

        {/* Risk Donut */}
        <div className="analytics-chart-card">
          <div className="chart-card-header">
            <h3>Risk Distribution</h3>
          </div>
          <DonutChart
            low={riskDist.low}
            medium={riskDist.medium}
            high={riskDist.high}
          />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="analytics-bottom-row">
        {/* Activity Heatmap */}
        <div className="analytics-chart-card">
          <div className="chart-card-header">
            <h3>Traffic Heatmap — Hour × Day</h3>
          </div>
          <Heatmap />
        </div>

        {/* Top Units */}
        <div className="analytics-chart-card">
          <div className="chart-card-header">
            <h3>Top Visited Units</h3>
          </div>
          <TopUnits visitors={visitors} />
        </div>
      </div>
    </div>
  );
}
