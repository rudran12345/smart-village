# Cloud-Based AI Digital Twin for Smart Village Resource Monitoring

An enterprise-grade, full-stack, cloud-deployable Digital Twin and AI decision-support platform designed to monitor, simulate, and optimize rural resources including water storage, agricultural fields, microgrid electricity, weather trends, environmental indicators, and civic infrastructure.

---

## 1. System Architecture

```
                                  [ VILLAGE CITIZENS & ADMINISTRATORS ]
                                                    │
                                                    ▼
                               ┌─────────────────────────────────────────┐
                               │       Modern Responsive Frontend        │
                               │   (React + Vite + Tailwind CSS / Netlify)│
                               └────────────────────┬────────────────────┘
                                                    │ REST API Requests
                                                    ▼
                               ┌─────────────────────────────────────────┐
                               │        High-Performance Backend         │
                               │      (Python FastAPI + Uvicorn / Render) │
                               └─────────┬─────────────────────┬─────────┘
                                         │                     │
                     ORM Queries / DDL   │                     │ Telemetry & Parameters
                                         ▼                     ▼
               ┌───────────────────────────────┐     ┌───────────────────────────────────┐
               │     PostgreSQL Database       │     │       Modular AI Engine           │
               │   (Cloud PostgreSQL / Render) │     │  · Time-Series Trend Extrapolator │
               │   · 13 Normalized Tables      │     │  · Multi-Factor Risk Classifier   │
               │   · Telemetry Logs & Assets   │     │  · What-If Simulation Sandbox     │
               └───────────────────────────────┘     │  · Decision-Support Recommender   │
                                                     └─────────────────┬─────────────────┘
                                                                       │
                                            Projections / Mitigations  │
                                                                       ▼
                                                     [ DIGITAL TWIN 2D TOPOLOGY ]
                                                     · Water Tanks & Deep Aquifers
                                                     · Precision Paddy & Millet Fields
                                                     · Solar Microgrid & Transformers
                                                     · Agro-Meteorological Station
                                                     · Civic School, Clinic, Roads
```

---

## 2. Complete Folder Structure

```
smart-village/
├── index.html                    # Root HTML entry point
├── package.json                  # Frontend dependencies and build scripts
├── vite.config.ts                # Vite configuration with Tailwind CSS plugin
├── tsconfig.json                 # TypeScript compiler configuration
├── netlify.toml                  # Netlify deployment configuration
├── Procfile                      # Render process file for Uvicorn
├── render.yaml                   # Render Blueprint (Infrastructure-as-Code)
├── README.md                     # Comprehensive documentation & deployment guide
│
├── src/                          # Frontend Application (React 19 + TypeScript)
│   ├── main.tsx                  # React DOM mount entry
│   ├── App.tsx                   # Main layout controller and module switcher
│   ├── index.css                 # Global Tailwind styles and typography
│   ├── types/
│   │   └── index.ts              # Data contracts and schema interfaces
│   ├── services/
│   │   ├── apiClient.ts          # Unified API Client (Remote Render / Local fallback)
│   │   ├── aiEngine.ts           # Client-side resilience simulation algorithms
│   │   └── villageData.ts        # Realistic baseline demo data fixtures
│   └── components/
│       ├── layout/
│       │   ├── Header.tsx        # Top navigation adhering to 3-zone Top Bar Contract
│       │   └── Sidebar.tsx       # Sidebar navigation for all 14 modules
│       ├── common/
│       │   └── Charts.tsx        # SVG sparkline area charts & metric gauges
│       ├── digitaltwin/
│       │   └── DigitalTwinMap.tsx# Interactive 2D Digital Twin spatial viewer
│       ├── dashboard/
│       │   └── OverviewDashboard.tsx # Village resilience overview & KPI cards
│       └── modules/
│           ├── WaterModule.tsx          # Reservoir, groundwater & pipe metrics
│           ├── AgricultureModule.tsx    # Crop NDVI, soil moisture & NPK analysis
│           ├── ElectricityModule.tsx    # Solar, battery & transformer peak load
│           ├── WeatherModule.tsx        # Microclimate, heat index & rainfall
│           ├── EnvironmentModule.tsx    # AQI, PM2.5, CO2 & soil salinity
│           ├── InfrastructureModule.tsx # Civic buildings, roads & sluice gates
│           ├── HistoricalAnalysis.tsx   # Multi-metric time-series curves
│           ├── PredictionsModule.tsx    # Multi-horizon AI predictions
│           ├── RiskDetectionModule.tsx  # Normal / Warning / Critical triage
│           ├── SimulationSandbox.tsx    # Interactive What-If stress modeler
│           ├── AlertsModule.tsx         # Active emergency notices & dispatch
│           ├── RecommendationsModule.tsx# Actionable mitigation playbooks
│           └── CloudDeploymentGuide.tsx # In-app API tester & deployment console
│
└── backend/                      # Production Backend (Python FastAPI + PostgreSQL)
    ├── main.py                   # FastAPI server, lifespan, CORS & router mount
    ├── requirements.txt          # Python pip dependencies
    ├── .env.example              # Environment variables template
    ├── database/
    │   ├── database.py           # SQLAlchemy engine & session factory
    │   ├── models.py             # 13 SQLAlchemy ORM tables
    │   └── init_db.py            # Automatic schema creation & data seeder
    ├── models/
    │   └── schemas.py            # Pydantic request and response schemas
    ├── routes/
    │   ├── dashboard.py          # GET /api/dashboard
    │   ├── resources.py          # GET /api/resources, POST /api/resources
    │   ├── water.py              # GET /api/water
    │   ├── agriculture.py        # GET /api/agriculture, GET /api/crops
    │   ├── electricity.py        # GET /api/electricity
    │   ├── weather.py            # GET /api/weather
    │   ├── environment.py        # GET /api/environment
    │   ├── infrastructure.py     # GET /api/infrastructure
    │   ├── historical.py         # GET /api/historical/{resource}
    │   ├── predictions.py        # GET /api/predictions/{resource}
    │   ├── risks.py              # GET /api/risks
    │   ├── alerts.py             # GET /api/alerts
    │   ├── recommendations.py    # GET /api/recommendations
    │   └── simulation.py         # POST /api/simulation
    └── ai/
        ├── prediction_engine.py  # Time-series trend extrapolation service
        ├── risk_analyzer.py      # Automated threshold risk evaluator
        ├── simulation_engine.py  # What-if scenario mass-balance simulator
        └── recommender.py        # Algorithmic mitigation generator
```

---

## 3. Database Design (PostgreSQL)

The database schema consists of 13 normalized relational tables:

1. **`village_resources`**: Master catalog of spatial telemetry nodes (`id`, `name`, `category`, `status`, `value`, `unit`, `min_nominal`, `max_nominal`, `zone`, `coord_x`, `coord_y`, `description`, `updated_at`).
2. **`water_data`**: Hydrological parameters (`reservoir_level_pct`, `groundwater_depth_m`, `daily_consumption_kld`, `water_quality_tds`, `supply_status`, `pumps_operating`, `total_pumps`, `pipe_pressure_bar`, `leak_risk`).
3. **`agriculture_data`**: Field-level soil telemetry (`field_id`, `crop_name`, `soil_moisture_pct`, `nitrogen_ppm`, `phosphorus_ppm`, `potassium_ppm`, `health_index_ndvi`, `irrigation_status`, `pest_risk`).
4. **`crop_data`**: Crop agronomy (`crop_type`, `growth_stage`, `area_hectares`, `projected_yield_tons`).
5. **`electricity_data`**: Power microgrid (`grid_demand_kw`, `solar_generation_kw`, `battery_storage_pct`, `transformer_load_pct`, `frequency_hz`, `voltage_v`, `blackout_risk`).
6. **`weather_data`**: Meteorological readings (`temperature_c`, `rainfall_mm`, `humidity_pct`, `wind_speed_kmh`, `uv_index`, `pressure_hpa`, `condition`, `forecast_summary`).
7. **`environmental_data`**: Ecological sensors (`aqi`, `pm25`, `co2_ppm`, `ambient_noise_db`, `soil_salinity_dsm`).
8. **`infrastructure_data`**: Civic assets (`name`, `type`, `health_score_pct`, `operational_status`, `risk_level`, `last_inspected`, `criticality`).
9. **`historical_data`**: Time-stamped historical log (`timestamp_label`, `water_level_pct`, `electricity_kw`, `soil_moisture_pct`, `temperature_c`, `rainfall_mm`, `aqi`).
10. **`predictions`**: AI forecasts (`category`, `resource_name`, `current_value`, `predicted_value`, `prediction_period`, `risk_level`, `confidence_score`, `trend`, `explanation`, `recommendation`).
11. **`risks`**: Detected threat registry (`category`, `title`, `severity`, `reason`, `impact_area`, `affected_population`, `remedy_hint`).
12. **`alerts`**: Urgent dispatch queue (`category`, `severity`, `title`, `message`, `acknowledged`, `action_required`).
13. **`recommendations`**: Strategic mitigation protocols (`category`, `priority`, `title`, `description`, `expected_benefit`, `steps_json`).

---

## 4. API Endpoints List

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Server and database health check |
| `GET` | `/api/dashboard` | Overall village health, composite indices & summary metrics |
| `GET` | `/api/resources` | List all monitored village spatial nodes |
| `POST`| `/api/resources` | Provision a new village sensor node |
| `GET` | `/api/water` | Ultrasonic reservoir, borewell depth & TDS water telemetry |
| `GET` | `/api/agriculture` | Field soil moisture, NPK fertility & irrigation status |
| `GET` | `/api/crops` | Crop vegetative growth, NDVI and yield projections |
| `GET` | `/api/electricity` | Transformer load, solar output & blackout probability |
| `GET` | `/api/weather` | Microclimate telemetry, heat index & rain forecast |
| `GET` | `/api/environment` | Ambient AQI, PM2.5, carbon levels & soil salinity |
| `GET` | `/api/infrastructure` | Health scores and inspection status for civic assets |
| `GET` | `/api/historical/{resource}` | Hourly time-series data points for charts |
| `GET` | `/api/predictions/{resource}` | AI forecasts, confidence scores & root-cause explanations |
| `GET` | `/api/risks` | Automated vulnerability detection with population impact |
| `GET` | `/api/alerts` | Urgent village warning notices and required actions |
| `GET` | `/api/recommendations` | Prioritized multi-step dispatch playbooks |
| `POST`| `/api/simulation` | What-If scenario engine calculating resilience outcomes |

---

## 5. AI Module Design

The AI module is decoupled into four modular Python classes inside `backend/ai/`:

1. **`PredictionEngine` (`prediction_engine.py`)**: Computes linear trend slopes ($\beta$), confidence bounds, and moving averages on time-series telemetry. Designed with standard scikit-learn compatible interfaces for drop-in replacement with trained ML models (e.g. LSTM, ARIMA, XGBoost).
2. **`RiskAnalyzer` (`risk_analyzer.py`)**: Multi-variable rule-based heuristic classifier identifying safe, warning, and critical thresholds across water buffers ($<30\%$), transformer thermal derating ($>88\%$), and foliar drought ($NDVI < 0.55$).
3. **`SimulationEngine` (`simulation_engine.py`)**: Multi-variable physical mass-balance model that takes input deltas (water %, electricity multiplier, rain mm, temperature °C, soil moisture delta) and dynamically computes:
   - Water Stress Index ($5\% - 98\%$)
   - Blackout Risk Probability ($4\% - 99\%$)
   - Crop Harvest Loss / Gain ($\pm\%$)
   - Overall Village Resilience Score ($0\% - 100\%$)
4. **`RecommenderEngine` (`recommender.py`)**: Decision-support rule synthesizer that generates prioritized, actionable, step-by-step mitigation checklists for village administrators.

---

## 6. Digital Twin Design

The village Digital Twin is rendered as an interactive, topological 2D spatial landscape:
- **Hydrological Domain**: Primary drinking reservoir with animated volume and depth markers, feeder canal sluice gate, and deep aquifer borewell cluster #3.
- **Agricultural Domain**: Sector boundaries with crop-specific styling (Basmati Rice, Pearl Millet, Chickpeas, Hybrid Tomato) displaying live soil moisture and NDVI spectral markers.
- **Microgrid Domain**: Decentralized photovoltaic solar array, step-down distribution transformer #1, and power transmission lines to the civic center.
- **Meteorological & Environmental Pods**: Ridge-top anemometer weather tower and village square AQI sensor pod.
- **Civic Infrastructure**: Community Secondary School, Primary Health Clinic (with critical vaccine solar backup), cold storage unit, and inter-village roadway culverts.
- **Interactive Inspection**: Clicking any spatial node triggers an analytical drawer displaying current sensor readings, safe threshold ranges, AI diagnostic explanations, and recommended mitigations.

---

## 7. Exact 10-Step Production Deployment Guide

### STEP 1 — Run Locally
```bash
# 1. Clone or extract the project repository
cd smart-village

# 2. Start the Python FastAPI backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000

# 3. In a separate terminal, start the frontend
npm install
npm run dev
```
Open `http://localhost:3000` to view the frontend connected to `http://localhost:8000`.

---

### STEP 2 — Create GitHub Repository
1. Log into your [GitHub account](https://github.com).
2. Click **New Repository**.
3. Name it: `smart-village-digital-twin`.
4. Keep it Public or Private. Do not initialize with README (we already have one).
5. Click **Create Repository**.

---

### STEP 3 — Push Project to GitHub
In your project root directory, run:
```bash
git init
git add .
git commit -m "feat: complete Smart Village Cloud AI Digital Twin application"
git branch -M main
git remote add origin https://github.com/<your-github-username>/smart-village-digital-twin.git
git push -u origin main
```

---

### STEP 4 — Create PostgreSQL Database on Render
1. Log into [Render.com](https://render.com).
2. Click **New +** → **PostgreSQL**.
3. Configure the database:
   - **Name**: `smart-village-db`
   - **Database**: `smart_village`
   - **User**: `smart_village_user`
   - **Region**: Choose closest to you (e.g. Frankfurt, Oregon, Singapore).
   - **Plan**: Free
4. Click **Create Database**.
5. Once created, copy the **Internal Database URL** (for Render services) or **External Database URL**.

---

### STEP 5 — Deploy Backend on Render
1. On Render Dashboard, click **New +** → **Web Service**.
2. Connect your GitHub repository: `smart-village-digital-twin`.
3. Configure settings:
   - **Name**: `smart-village-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

---

### STEP 6 — Add Environment Variables on Render
Under **Environment Variables** in your Render Web Service, add:
- `DATABASE_URL` = Paste your PostgreSQL Connection String from Step 4.
- `CORS_ORIGINS` = `*`
- `PYTHONUNBUFFERED` = `1`
- `ENVIRONMENT` = `production`

Click **Save Changes** and wait for the deployment build to complete.

---

### STEP 7 — Test Backend `/health`
Once Render displays `Live`, open your browser or run:
```bash
curl https://smart-village-backend.onrender.com/health
```
Expected output:
```json
{
  "status": "online",
  "system": "Smart Village AI Digital Twin",
  "version": "1.0.0",
  "database": "PostgreSQL connected"
}
```

---

### STEP 8 — Deploy Frontend on Netlify
1. Log into [Netlify.com](https://www.netlify.com).
2. Click **Add new site** → **Import an existing project**.
3. Connect your GitHub repository: `smart-village-digital-twin`.
4. Configure Build Settings:
   - **Base directory**: Leave blank (root).
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Under **Environment variables**, click **Add a variable**:
   - Key: `VITE_API_URL`
   - Value: `https://smart-village-backend.onrender.com` (Your deployed Render backend URL).
6. Click **Deploy smart-village**.

---

### STEP 9 — Connect Frontend to Render Backend
1. Once Netlify finishes building, you will receive your site URL (e.g. `https://smart-village-twin.netlify.app`).
2. Open the URL.
3. Click the **Cloud API & Deploy** button in the top right header.
4. Verify that the Backend URL is set to your Render URL.
5. Click **Test /health**. The indicator will turn green: **FastAPI Server Online**.
6. Toggle **Remote Mode ON**. The frontend now queries your live PostgreSQL database on Render!

---

### STEP 10 — Test the Complete Application
1. **Dashboard Overview**: Check that live health gauges, sensor counts, and alert cards reflect the database.
2. **Digital Twin 2D Map**: Click each resource node (Reservoir, Paddy Field A, Tomato Hub, Substation) to view real-time diagnostics.
3. **What-If Simulation**: Adjust the sliders (Reservoir -30%, Electricity 1.4x, Rainfall 0mm) and click **Recalculate** to inspect the predicted drought/blackout stress curves.
4. **Alerts & Recommendations**: Acknowledge alerts and review prioritized multi-step dispatch playbooks.

---

## 8. Troubleshooting Common Deployment Issues

1. **CORS Error in Browser Console (`Access-Control-Allow-Origin`)**:
   - Ensure `CORS_ORIGINS=*` is set in your Render Web Service Environment Variables.
   - In `backend/main.py`, `CORSMiddleware` is already pre-configured to allow all origins.

2. **Render PostgreSQL URL prefix (`sqlalchemy.exc.NoSuchModuleError: postgres`)**:
   - Render supplies database URLs starting with `postgres://`. SQLAlchemy 2.0 requires `postgresql://`.
   - `backend/database/database.py` automatically detects and rewrites this prefix on startup.

3. **Render Free Tier Spin-Down (Cold Starts)**:
   - Free Render web services spin down after 15 minutes of inactivity. The initial `/health` ping may take ~30–45 seconds while the container boots.
   - The frontend's built-in Digital Twin simulation engine acts as a zero-latency fallback during cold starts so users never experience a broken UI.

4. **Netlify 404 on Page Refresh**:
   - Handled via `netlify.toml` which redirects `/*` to `/index.html` with HTTP 200.

---

## License
MIT License. Built for Smart Village Resource Monitoring and Rural Resilience Planning.
