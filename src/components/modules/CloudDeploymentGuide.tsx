/**
 * Cloud Deployment & REST API Console
 * Provides live backend connectivity testing, endpoint inspection, and step-by-step deployment guide.
 */

import React, { useState } from 'react';
import {
  Server,
  Cloud,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Terminal,
  Database,
  Layers,
  Code2,
  Globe,
} from 'lucide-react';
import { api } from '../../services/apiClient';

interface CloudDeploymentGuideProps {
  onConnectionChange: (isOnline: boolean) => void;
}

export const CloudDeploymentGuide: React.FC<CloudDeploymentGuideProps> = ({
  onConnectionChange,
}) => {
  const [apiUrl, setApiUrl] = useState<string>(api.getBaseUrl());
  const [isRemoteEnabled, setIsRemoteEnabled] = useState<boolean>(api.isRemoteMode());
  const [healthStatus, setHealthStatus] = useState<'idle' | 'checking' | 'online' | 'offline'>('idle');
  const [latency, setLatency] = useState<number | null>(null);
  const [healthDetails, setHealthDetails] = useState<any>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Active testing tab
  const [activeTab, setActiveTab] = useState<'console' | 'deployment' | 'database'>('console');
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('/health');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTestingEndpoint, setIsTestingEndpoint] = useState<boolean>(false);

  const handleTestHealth = async () => {
    setHealthStatus('checking');
    api.setBaseUrl(apiUrl, isRemoteEnabled);
    const res = await api.checkHealth();
    setHealthStatus(res.status);
    setLatency(res.latencyMs);
    setHealthDetails(res.details || null);
    onConnectionChange(res.status === 'online');
  };

  const handleToggleRemote = (enabled: boolean) => {
    setIsRemoteEnabled(enabled);
    api.setRemoteMode(enabled);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRunEndpointTest = async () => {
    setIsTestingEndpoint(true);
    try {
      if (selectedEndpoint === '/health') {
        const res = await api.checkHealth();
        setTestResult(JSON.stringify(res, null, 2));
      } else if (selectedEndpoint === '/api/dashboard') {
        const res = await api.getDashboard();
        setTestResult(JSON.stringify(res, null, 2));
      } else if (selectedEndpoint === '/api/water') {
        const res = await api.getWater();
        setTestResult(JSON.stringify(res, null, 2));
      } else if (selectedEndpoint === '/api/simulation') {
        const res = await api.runSimulation({
          waterLevelDeltaPct: -20,
          electricityUsageMultiplier: 1.2,
          rainfallMm: 0,
          temperatureC: 37,
          soilMoistureDeltaPct: -15,
        });
        setTestResult(JSON.stringify(res, null, 2));
      } else if (selectedEndpoint === '/api/predictions/all') {
        const res = await api.getPredictions('all');
        setTestResult(JSON.stringify(res, null, 2));
      } else {
        const res = await api.getResources();
        setTestResult(JSON.stringify(res.slice(0, 3), null, 2));
      }
    } catch (err: any) {
      setTestResult(`Error executing request: ${err.message}`);
    } finally {
      setIsTestingEndpoint(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
            <Server className="w-4 h-4" />
            <span>Cloud REST API & Full-Stack Deployment Suite</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Render (FastAPI) + Netlify (Frontend) + PostgreSQL</h2>
          <p className="text-xs text-slate-400 mt-1">
            Connect to a live deployed backend or inspect the complete deployment configuration for GitHub, Render, and Netlify.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('console')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'console' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            API Live Console
          </button>
          <button
            onClick={() => setActiveTab('deployment')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'deployment' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            10-Step Deployment Guide
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'database' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            PostgreSQL Schema
          </button>
        </div>
      </div>

      {activeTab === 'console' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Backend Connection Box */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800">
              Live FastAPI Backend Connector
            </h3>

            <div className="space-y-2">
              <label className="text-xs text-slate-300 font-medium">Backend REST API Base URL</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="https://your-app.onrender.com or http://localhost:8000"
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-sky-500"
                />
                <button
                  onClick={handleTestHealth}
                  disabled={healthStatus === 'checking'}
                  className="px-3.5 py-2 text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white rounded-lg transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${healthStatus === 'checking' ? 'animate-spin' : ''}`} />
                  <span>Test /health</span>
                </button>
              </div>
            </div>

            {/* Remote vs Client-side Mode Toggle */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white block">Active API Mode</span>
                  <span className="text-[11px] text-slate-400">
                    {isRemoteEnabled
                      ? 'Querying remote backend URL via fetch'
                      : 'Using embedded high-performance Digital Twin engine'}
                  </span>
                </div>
                <button
                  onClick={() => handleToggleRemote(!isRemoteEnabled)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    isRemoteEnabled
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {isRemoteEnabled ? 'Remote Mode ON' : 'Standalone Mode'}
                </button>
              </div>
            </div>

            {/* Health Status Result */}
            {healthStatus !== 'idle' && (
              <div
                className={`p-3.5 rounded-xl border text-xs ${
                  healthStatus === 'online'
                    ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-200'
                    : healthStatus === 'checking'
                    ? 'bg-slate-950 border-slate-800 text-slate-400'
                    : 'bg-amber-950/30 border-amber-800/40 text-amber-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {healthStatus === 'online' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                    )}
                    <span className="font-bold">
                      {healthStatus === 'online'
                        ? 'FastAPI Server Online'
                        : healthStatus === 'checking'
                        ? 'Pinging /health endpoint...'
                        : 'Remote Server Unreachable'}
                    </span>
                  </div>
                  {latency !== null && (
                    <span className="font-mono text-[11px]">{latency} ms</span>
                  )}
                </div>

                {healthStatus === 'offline' && (
                  <p className="mt-2 text-[11px] text-slate-300 leading-relaxed">
                    Note: If you have not yet deployed the Python backend to Render, the application seamlessly uses its built-in Digital Twin simulation engine so that every chart, map, prediction, and sandbox feature functions with zero downtime!
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right: Interactive Endpoint Inspector */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Interactive API Request Inspector
              </h3>
              <span className="text-xs text-slate-400">FastAPI OpenAPI Schema Compliant</span>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedEndpoint}
                onChange={(e) => setSelectedEndpoint(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-sky-500"
              >
                <option value="/health">GET /health</option>
                <option value="/api/dashboard">GET /api/dashboard</option>
                <option value="/api/resources">GET /api/resources</option>
                <option value="/api/water">GET /api/water</option>
                <option value="/api/predictions/all">GET /api/predictions/all</option>
                <option value="/api/simulation">POST /api/simulation (What-If)</option>
              </select>

              <button
                onClick={handleRunEndpointTest}
                disabled={isTestingEndpoint}
                className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shrink-0"
              >
                {isTestingEndpoint ? 'Executing...' : 'Send Request'}
              </button>
            </div>

            {/* Response Payload Viewer */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span>Response Payload (JSON)</span>
                {testResult && (
                  <button
                    onClick={() => handleCopy(testResult, 'json')}
                    className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    {copiedKey === 'json' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'json' ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-[340px] leading-relaxed">
                {testResult || `// Select an endpoint above and click "Send Request" to preview live API JSON response.\n// Sample: GET /health\n{\n  "status": "online",\n  "system": "Smart Village AI Digital Twin",\n  "version": "1.0.0",\n  "database": "PostgreSQL connected"\n}`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'deployment' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                Complete 10-Step Production Deployment Playbook
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Target: GitHub → Render (FastAPI + PostgreSQL) → Netlify (Vite React Frontend)
              </p>
            </div>
          </div>

          <div className="space-y-5 text-xs text-slate-300">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">STEP 1 — Run Locally</span>
                <span className="text-[11px] text-sky-400 font-mono">Terminal Commands</span>
              </div>
              <p className="text-slate-400">Launch the Python FastAPI backend and Vite frontend on your local development machine:</p>
              <pre className="p-3 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto">
{`# 1. Start Python FastAPI Backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000

# 2. In a new terminal, run Frontend
npm install
npm run dev`}
              </pre>
            </div>

            {/* Step 2 & 3 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">STEP 2 & 3 — Create GitHub Repo & Push</span>
                <span className="text-[11px] text-emerald-400 font-mono">Git Commands</span>
              </div>
              <pre className="p-3 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto">
{`git init
git add .
git commit -m "Initial commit: Smart Village AI Digital Twin full-stack project"
git branch -M main
git remote add origin https://github.com/<your-username>/smart-village-digital-twin.git
git push -u origin main`}
              </pre>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-white text-sm block">STEP 4 — Create PostgreSQL Database</span>
              <p className="text-slate-400">
                On Render.com (or Neon / Supabase):
              </p>
              <ol className="list-decimal list-inside space-y-1 text-slate-300">
                <li>Log in to <strong className="text-white">Render Dashboard</strong> → Click <strong className="text-white">New +</strong> → <strong className="text-white">PostgreSQL</strong>.</li>
                <li>Set Name: <code className="text-sky-300 font-mono">smart-village-db</code>, Database: <code className="text-sky-300 font-mono">smart_village</code>, Region: nearest region.</li>
                <li>Copy the <strong className="text-white">Internal Database URL</strong> (for Render backend) or <strong className="text-white">External Database URL</strong>.</li>
              </ol>
            </div>

            {/* Step 5 & 6 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-white text-sm block">STEP 5 & 6 — Deploy Backend on Render</span>
              <p className="text-slate-400">
                Deploy the FastAPI service on Render:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-slate-300">
                <li>Click <strong className="text-white">New +</strong> → <strong className="text-white">Web Service</strong> → Connect your GitHub repo.</li>
                <li>Root Directory: <code className="text-sky-300 font-mono">backend</code>.</li>
                <li>Environment: <code className="text-sky-300 font-mono">Python 3</code>.</li>
                <li>Build Command: <code className="text-sky-300 font-mono">pip install -r requirements.txt</code>.</li>
                <li>Start Command: <code className="text-sky-300 font-mono">uvicorn main:app --host 0.0.0.0 --port $PORT</code>.</li>
                <li>Add Environment Variables:
                  <ul className="list-disc list-inside pl-4 mt-1 space-y-1 font-mono text-[11px] text-emerald-400">
                    <li>DATABASE_URL = &lt;Your PostgreSQL URL&gt;</li>
                    <li>CORS_ORIGINS = *</li>
                    <li>PYTHONUNBUFFERED = 1</li>
                  </ul>
                </li>
                <li>Click <strong className="text-white">Create Web Service</strong>.</li>
              </ol>
            </div>

            {/* Step 7 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-white text-sm block">STEP 7 — Test Backend /health</span>
              <p className="text-slate-400">
                Once Render deployment finishes, visit your backend URL:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-[11px] text-sky-300">
                curl https://&lt;your-render-subdomain&gt;.onrender.com/health
              </div>
              <p className="text-emerald-400 text-[11px]">
                Expected output: <code className="font-mono">{"{\"status\":\"online\",\"system\":\"Smart Village AI Digital Twin\"}"}</code>
              </p>
            </div>

            {/* Step 8 & 9 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-white text-sm block">STEP 8 & 9 — Deploy Frontend on Netlify</span>
              <ol className="list-decimal list-inside space-y-1 text-slate-300">
                <li>Log in to <strong className="text-white">Netlify.com</strong> → Click <strong className="text-white">Add new site</strong> → <strong className="text-white">Import an existing project</strong>.</li>
                <li>Select GitHub and choose your repository.</li>
                <li>Build settings:
                  <ul className="list-disc list-inside pl-4 mt-1 space-y-1 font-mono text-[11px] text-sky-300">
                    <li>Build command: npm run build</li>
                    <li>Publish directory: dist</li>
                  </ul>
                </li>
                <li>Under <strong className="text-white">Environment variables</strong>, add:
                  <div className="font-mono text-emerald-400 mt-1 pl-4">
                    VITE_API_URL = https://&lt;your-render-subdomain&gt;.onrender.com
                  </div>
                </li>
                <li>Click <strong className="text-white">Deploy Site</strong>.</li>
              </ol>
            </div>

            {/* Step 10 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-white text-sm block">STEP 10 — Test Complete Smart Village Application</span>
              <p className="text-slate-400">
                Open your deployed Netlify URL. The frontend will automatically connect to your Render backend, query PostgreSQL tables, run time-series AI predictions, and render the live Digital Twin map!
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'database' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                PostgreSQL Schema Definition (SQLAlchemy DDL)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Tables: village_resources, water_data, agriculture_data, crop_data, electricity_data, weather_data, environmental_data, infrastructure_data, historical_data, predictions, risks, alerts, recommendations
              </p>
            </div>
            <button
              onClick={() => handleCopy(POSTGRES_DDL, 'ddl')}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-1.5 border border-slate-700"
            >
              {copiedKey === 'ddl' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'ddl' ? 'Copied' : 'Copy SQL'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-sky-300 overflow-x-auto max-h-[450px] leading-relaxed">
            {POSTGRES_DDL}
          </pre>
        </div>
      )}
    </div>
  );
};

const POSTGRES_DDL = `-- ==========================================================
-- Smart Village AI Digital Twin: PostgreSQL Schema
-- ==========================================================

CREATE TABLE IF NOT EXISTS village_resources (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'Normal',
    value FLOAT NOT NULL,
    unit VARCHAR(32) NOT NULL,
    min_nominal FLOAT NOT NULL,
    max_nominal FLOAT NOT NULL,
    zone VARCHAR(128) NOT NULL,
    coord_x INT NOT NULL,
    coord_y INT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS water_data (
    id SERIAL PRIMARY KEY,
    reservoir_level_pct FLOAT NOT NULL,
    groundwater_depth_m FLOAT NOT NULL,
    daily_consumption_kld FLOAT NOT NULL,
    water_quality_tds INT NOT NULL,
    supply_status VARCHAR(64) NOT NULL,
    pumps_operating INT NOT NULL,
    total_pumps INT NOT NULL,
    pipe_pressure_bar FLOAT NOT NULL,
    leak_risk VARCHAR(32) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS agriculture_data (
    id SERIAL PRIMARY KEY,
    field_id VARCHAR(64) NOT NULL,
    crop_name VARCHAR(128) NOT NULL,
    soil_moisture_pct FLOAT NOT NULL,
    nitrogen_ppm FLOAT NOT NULL,
    phosphorus_ppm FLOAT NOT NULL,
    potassium_ppm FLOAT NOT NULL,
    health_index_ndvi FLOAT NOT NULL,
    irrigation_status VARCHAR(64) NOT NULL,
    pest_risk VARCHAR(32) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS crop_data (
    id SERIAL PRIMARY KEY,
    field_id VARCHAR(64) NOT NULL,
    crop_type VARCHAR(128) NOT NULL,
    growth_stage VARCHAR(64) NOT NULL,
    area_hectares FLOAT NOT NULL,
    projected_yield_tons FLOAT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS electricity_data (
    id SERIAL PRIMARY KEY,
    grid_demand_kw FLOAT NOT NULL,
    solar_generation_kw FLOAT NOT NULL,
    battery_storage_pct FLOAT NOT NULL,
    transformer_load_pct FLOAT NOT NULL,
    frequency_hz FLOAT NOT NULL,
    voltage_v FLOAT NOT NULL,
    blackout_risk VARCHAR(32) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS weather_data (
    id SERIAL PRIMARY KEY,
    temperature_c FLOAT NOT NULL,
    rainfall_mm FLOAT NOT NULL,
    humidity_pct FLOAT NOT NULL,
    wind_speed_kmh FLOAT NOT NULL,
    uv_index INT NOT NULL,
    pressure_hpa FLOAT NOT NULL,
    condition VARCHAR(64) NOT NULL,
    forecast_summary TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS environmental_data (
    id SERIAL PRIMARY KEY,
    aqi INT NOT NULL,
    pm25 FLOAT NOT NULL,
    co2_ppm INT NOT NULL,
    ambient_noise_db FLOAT NOT NULL,
    soil_salinity_dsm FLOAT NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS infrastructure_data (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(64) NOT NULL,
    health_score_pct INT NOT NULL,
    operational_status VARCHAR(64) NOT NULL,
    risk_level VARCHAR(32) NOT NULL,
    last_inspected DATE NOT NULL,
    criticality VARCHAR(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS historical_data (
    id SERIAL PRIMARY KEY,
    timestamp_label VARCHAR(32) NOT NULL,
    water_level_pct FLOAT NOT NULL,
    electricity_kw FLOAT NOT NULL,
    soil_moisture_pct FLOAT NOT NULL,
    temperature_c FLOAT NOT NULL,
    rainfall_mm FLOAT NOT NULL,
    aqi INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS predictions (
    id VARCHAR(64) PRIMARY KEY,
    category VARCHAR(64) NOT NULL,
    resource_name VARCHAR(255) NOT NULL,
    current_value VARCHAR(128) NOT NULL,
    predicted_value VARCHAR(128) NOT NULL,
    prediction_period VARCHAR(64) NOT NULL,
    risk_level VARCHAR(32) NOT NULL,
    confidence_score INT NOT NULL,
    trend VARCHAR(32) NOT NULL,
    explanation TEXT NOT NULL,
    recommendation TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS risks (
    id VARCHAR(64) PRIMARY KEY,
    category VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    severity VARCHAR(32) NOT NULL,
    reason TEXT NOT NULL,
    impact_area VARCHAR(255) NOT NULL,
    affected_population INT NOT NULL,
    remedy_hint TEXT NOT NULL,
    detected_at VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS alerts (
    id VARCHAR(64) PRIMARY KEY,
    category VARCHAR(64) NOT NULL,
    severity VARCHAR(32) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    timestamp_label VARCHAR(64) NOT NULL,
    acknowledged BOOLEAN DEFAULT FALSE,
    action_required TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS recommendations (
    id VARCHAR(64) PRIMARY KEY,
    category VARCHAR(64) NOT NULL,
    priority VARCHAR(32) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    expected_benefit TEXT NOT NULL,
    resource_target VARCHAR(255) NOT NULL,
    steps_json JSONB NOT NULL
);
`;
