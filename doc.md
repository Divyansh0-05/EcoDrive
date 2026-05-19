<p>🌿</p><p><strong>EcoDrive</strong></p><p><em>Eco-Friendly Driving Habits Platform</em></p><p>Complete Project Documentation &amp; Agent Build Guide</p><p>Laravel Backend  ·  React Frontend  ·  MySQL Database</p><table><tr><td><p><strong>📋 Document Purpose</strong></p><p>This document is the single source of truth for the EcoDrive platform. It contains the complete project vision, database schema, backend API architecture, frontend UI specs, and step-by-step agent prompts to build each layer of the system from scratch.</p></td></tr></table><table><thead><tr><th><p><strong>Detail</strong></p></th><th><p><strong>Info</strong></p></th></tr></thead><tbody><tr><td><p>Project Name</p></td><td><p>EcoDrive — Eco-Friendly Driving Platform</p></td></tr><tr><td><p>Stack</p></td><td><p>Laravel 11 (Backend) + React 18 + Vite (Frontend)</p></td></tr><tr><td><p>Database</p></td><td><p>MySQL 8.0</p></td></tr><tr><td><p>Version</p></td><td><p>1.0.0</p></td></tr><tr><td><p>Document Date</p></td><td><p>May 2025</p></td></tr><tr><td><p>Audience</p></td><td><p>Developers, AI Agents, Project Managers</p></td></tr></tbody></table><h1><strong>Table of Contents</strong></h1><p>1.  Project Overview &amp; Vision  ....  3</p><p>2.  System Architecture  ....  4</p><p>3.  Feature Specification  ....  5</p><p>4.  Database Design &amp; Schema  ....  7</p><p>5.  Laravel Backend — Setup &amp; Structure  ....  11</p><p>6.  API Endpoints Reference  ....  13</p><p>7.  React Frontend — Setup &amp; Structure  ....  17</p><p>8.  UI/UX Design System  ....  19</p><p>9.  Authentication &amp; Authorization  ....  21</p><p>10.  Agent Build Prompts — Step by Step  ....  22</p><p>11.  Environment &amp; Deployment  ....  34</p><p>12.  Testing Strategy  ....  36</p><table><tr><td><p><strong>SECTION 1 — PROJECT OVERVIEW &amp; VISION</strong></p></td></tr></table><h1><strong>1. Project Overview &amp; Vision</strong></h1><p>EcoDrive is a web platform that motivates drivers to adopt eco-friendly habits — reducing fuel consumption, CO₂ emissions, and urban pollution through gamification, data analytics, and community engagement. Think of it as a fitness tracker, but for your driving footprint.</p><h2><strong>1.1 Problem Statement</strong></h2><p>Road transport accounts for nearly 16% of global CO₂ emissions. Most drivers have little visibility into how their driving patterns affect the environment or their wallet. EcoDrive bridges this gap by making eco-driving measurable, rewarding, and social.</p><h2><strong>1.2 Core Value Proposition</strong></h2><ul><li>Track every trip's fuel efficiency, emission estimate, and eco-score</li><li>Earn badges and level up by hitting green driving milestones</li><li>Compete with friends and a global leaderboard</li><li>Receive AI-powered tips tailored to your driving patterns</li><li>Visualize long-term environmental impact with beautiful dashboards</li></ul><h2><strong>1.3 Target Users</strong></h2><table><thead><tr><th><p><strong>User Type</strong></p></th><th><p><strong>Description</strong></p></th></tr></thead><tbody><tr><td><p>🚗 Daily Commuter</p></td><td><p>Wants to save fuel costs and reduce personal carbon footprint</p></td></tr><tr><td><p>🏆 Eco Enthusiast</p></td><td><p>Motivated by leaderboards, badges, and environmental impact scores</p></td></tr><tr><td><p>🏢 Fleet Manager</p></td><td><p>Oversees a group of drivers; needs team analytics and reporting</p></td></tr><tr><td><p>📊 Data Analyst</p></td><td><p>Uses raw trip data exports for research or insurance models</p></td></tr></tbody></table><h2><strong>1.4 Success Metrics</strong></h2><ul><li>Average eco-score across platform users improves by 15% over 3 months</li><li>Users log at least 3 trips per week on average</li><li>60% of users engage with community features (challenges, leaderboard)</li><li>CO₂ saved collectively displayed on public dashboard</li></ul><table><tr><td><p><strong>SECTION 2 — SYSTEM ARCHITECTURE</strong></p></td></tr></table><h1><strong>2. System Architecture</strong></h1><h2><strong>2.1 High-Level Architecture</strong></h2><p>EcoDrive uses a decoupled SPA architecture: React handles all UI rendering and communicates with the Laravel backend exclusively through a RESTful JSON API secured by Laravel Sanctum token authentication.</p><table><tr><td><p><strong>Architecture Pattern</strong></p><p>Frontend (React SPA) ↔ Laravel REST API ↔ MySQL Database
The React app lives at /frontend and is served by Vite during development and by Nginx in production.
The Laravel API lives at /backend and is served by PHP-FPM + Nginx.</p></td></tr></table><h2><strong>2.2 Technology Stack</strong></h2><table><thead><tr><th><p><strong>Layer</strong></p></th><th><p><strong>Technology</strong></p></th><th><p><strong>Purpose</strong></p></th></tr></thead><tbody><tr><td><p>Frontend</p></td><td><p>React 18 + Vite</p></td><td><p>SPA UI, routing, state management</p></td></tr><tr><td><p>State Management</p></td><td><p>Zustand + React Query</p></td><td><p>Global state + server state caching</p></td></tr><tr><td><p>Styling</p></td><td><p>Tailwind CSS + shadcn/ui</p></td><td><p>Utility CSS + accessible components</p></td></tr><tr><td><p>Charts</p></td><td><p>Recharts</p></td><td><p>Trip analytics, emissions graphs</p></td></tr><tr><td><p>Backend</p></td><td><p>Laravel 11</p></td><td><p>REST API, business logic, queues</p></td></tr><tr><td><p>Authentication</p></td><td><p>Laravel Sanctum</p></td><td><p>Token-based SPA authentication</p></td></tr><tr><td><p>Database</p></td><td><p>MySQL 8.0</p></td><td><p>Primary relational data store</p></td></tr><tr><td><p>Cache</p></td><td><p>Redis</p></td><td><p>Leaderboard cache, rate limiting</p></td></tr><tr><td><p>File Storage</p></td><td><p>Laravel Storage + S3</p></td><td><p>Profile avatars, trip exports</p></td></tr><tr><td><p>Email</p></td><td><p>Laravel Mail + Mailgun</p></td><td><p>Notifications, weekly summaries</p></td></tr><tr><td><p>Job Queue</p></td><td><p>Laravel Queues + Redis</p></td><td><p>Async badge awarding, email</p></td></tr><tr><td><p>Deployment</p></td><td><p>Docker + Nginx + PHP-FPM</p></td><td><p>Containerized production deploy</p></td></tr></tbody></table><h2><strong>2.3 Project Folder Structure</strong></h2><h3><strong>Backend (Laravel)</strong></h3><p>ecodrive-backend/</p><p>├── app/</p><p>│   ├── Http/Controllers/Api/       ← All API controllers</p><p>│   ├── Http/Requests/              ← Form request validation</p><p>│   ├── Http/Resources/             ← API response transformers</p><p>│   ├── Models/                     ← Eloquent models</p><p>│   ├── Services/                   ← Business logic layer</p><p>│   ├── Jobs/                       ← Queued jobs</p><p>│   └── Policies/                   ← Authorization policies</p><p>├── database/</p><p>│   ├── migrations/                 ← All DB migrations</p><p>│   └── seeders/                    ← Demo data seeders</p><p>└── routes/api.php                  ← All API routes</p><h3><strong>Frontend (React)</strong></h3><p>ecodrive-frontend/</p><p>├── src/</p><p>│   ├── pages/                      ← Route-level page components</p><p>│   ├── components/                 ← Reusable UI components</p><p>│   ├── hooks/                      ← Custom React hooks</p><p>│   ├── store/                      ← Zustand state stores</p><p>│   ├── services/api.js             ← Axios API client</p><p>│   └── utils/                      ← Helpers, eco calculations</p><table><tr><td><p><strong>SECTION 3 — FEATURE SPECIFICATION</strong></p></td></tr></table><h1><strong>3. Feature Specification</strong></h1><h2><strong>3.1 Feature List by Module</strong></h2><table><thead><tr><th><p><strong>Module</strong></p></th><th><p><strong>Features</strong></p></th><th><p><strong>Priority</strong></p></th></tr></thead><tbody><tr><td><p>Auth</p></td><td><p>Register, Login, Email Verify, Password Reset, Logout</p></td><td><p>P0 — Must Have</p></td></tr><tr><td><p>User Profile</p></td><td><p>Edit profile, Avatar upload, Vehicle info, Preferences</p></td><td><p>P0 — Must Have</p></td></tr><tr><td><p>Trip Logging</p></td><td><p>Log trip, Edit/Delete trip, Attach vehicle, GPS notes</p></td><td><p>P0 — Must Have</p></td></tr><tr><td><p>Eco Scoring</p></td><td><p>Per-trip score, Weekly score, Score history chart</p></td><td><p>P0 — Must Have</p></td></tr><tr><td><p>Dashboard</p></td><td><p>Stats overview, Recent trips, Weekly chart, CO₂ saved</p></td><td><p>P0 — Must Have</p></td></tr><tr><td><p>Badges &amp; Gamification</p></td><td><p>Badge list, Badge unlock, XP system, Level progress</p></td><td><p>P1 — Should Have</p></td></tr><tr><td><p>Leaderboard</p></td><td><p>Global rank, Friends rank, Weekly/All-time tabs</p></td><td><p>P1 — Should Have</p></td></tr><tr><td><p>Challenges</p></td><td><p>Join challenge, Track progress, Challenge leaderboard</p></td><td><p>P1 — Should Have</p></td></tr><tr><td><p>Vehicles</p></td><td><p>Add/Edit/Delete vehicles, Set default vehicle</p></td><td><p>P1 — Should Have</p></td></tr><tr><td><p>Analytics</p></td><td><p>Monthly trends, Emissions breakdown, Fuel savings calc</p></td><td><p>P2 — Nice to Have</p></td></tr><tr><td><p>Notifications</p></td><td><p>In-app alerts, Email digests, Badge unlock notif</p></td><td><p>P2 — Nice to Have</p></td></tr><tr><td><p>Admin Panel</p></td><td><p>User management, Stats overview, Badge management</p></td><td><p>P2 — Nice to Have</p></td></tr></tbody></table><h2><strong>3.2 Eco Score Algorithm</strong></h2><table><tr><td><p><strong>How Eco Score is Calculated</strong></p><p>Eco Score (0–100) = weighted average of 5 driving factors:

  Speed Consistency Score  (25%) — penalizes frequent acceleration/braking
  Average Speed Score      (20%) — optimal range 40–80 km/h
  Engine Idle Score        (20%) — penalizes idling &gt; 2 min
  Fuel Efficiency Score    (25%) — actual vs vehicle baseline MPG/L per 100km
  Trip Distance Bonus      (10%) — longer consistent trips score higher

CO₂ Estimate = fuel_consumed_liters × 2.31 kg (petrol) or × 2.68 kg (diesel)</p></td></tr></table><table><tr><td><p><strong>SECTION 4 — DATABASE DESIGN &amp; SCHEMA</strong></p></td></tr></table><h1><strong>4. Database Design &amp; Schema</strong></h1><h2><strong>4.1 Entity Relationship Overview</strong></h2><p>The database has 12 core tables. The central entity is the trips table, which belongs to a user and a vehicle. All gamification, scoring, and analytics derive from trip data.</p><table><tr><td><p><strong>Core Relationships</strong></p><p>users → vehicles (one-to-many)
users → trips (one-to-many)
trips → vehicles (many-to-one)
users → badges (many-to-many via user_badges)
users → challenges (many-to-many via user_challenges)
challenges → badges (many-to-one)
users → eco_scores (one-to-many, weekly aggregates)</p></td></tr></table><h2><strong>4.2 Full Migration Scripts</strong></h2><h3><strong>Table: users</strong></h3><p>Schema::create('users', function (Blueprint $table) {</p><p>    $table-&gt;id();</p><p>    $table-&gt;string('name');</p><p>    $table-&gt;string('email')-&gt;unique();</p><p>    $table-&gt;timestamp('email_verified_at')-&gt;nullable();</p><p>    $table-&gt;string('password');</p><p>    $table-&gt;string('avatar')-&gt;nullable();</p><p>    $table-&gt;string('bio', 500)-&gt;nullable();</p><p>    $table-&gt;string('city')-&gt;nullable();</p><p>    $table-&gt;string('country', 2)-&gt;nullable()-&gt;default('IN');</p><p>    $table-&gt;integer('total_xp')-&gt;default(0);</p><p>    $table-&gt;integer('level')-&gt;default(1);</p><p>    $table-&gt;integer('global_rank')-&gt;nullable();</p><p>    $table-&gt;decimal('total_co2_saved', 10, 3)-&gt;default(0);</p><p>    $table-&gt;decimal('total_distance_km', 10, 2)-&gt;default(0);</p><p>    $table-&gt;integer('total_trips')-&gt;default(0);</p><p>    $table-&gt;boolean('is_admin')-&gt;default(false);</p><p>    $table-&gt;boolean('notifications_enabled')-&gt;default(true);</p><p>    $table-&gt;string('preferred_unit')-&gt;default('metric'); // metric/imperial</p><p>    $table-&gt;rememberToken();</p><p>    $table-&gt;timestamps();</p><p>    $table-&gt;softDeletes();</p><p>});</p><h3><strong>Table: vehicles</strong></h3><p>Schema::create('vehicles', function (Blueprint $table) {</p><p>    $table-&gt;id();</p><p>    $table-&gt;foreignId('user_id')-&gt;constrained()-&gt;cascadeOnDelete();</p><p>    $table-&gt;string('nickname', 100);</p><p>    $table-&gt;string('make', 100);</p><p>    $table-&gt;string('model', 100);</p><p>    $table-&gt;year('year');</p><p>    $table-&gt;enum('fuel_type', ['petrol','diesel','electric','hybrid','lpg']);</p><p>    $table-&gt;decimal('engine_size_cc', 6, 0)-&gt;nullable();</p><p>    $table-&gt;decimal('baseline_fuel_efficiency', 5, 2)-&gt;nullable(); // L/100km</p><p>    $table-&gt;string('color', 50)-&gt;nullable();</p><p>    $table-&gt;string('registration_plate', 30)-&gt;nullable();</p><p>    $table-&gt;boolean('is_default')-&gt;default(false);</p><p>    $table-&gt;timestamps();</p><p>    $table-&gt;softDeletes();</p><p>});</p><h3><strong>Table: trips</strong></h3><p>Schema::create('trips', function (Blueprint $table) {</p><p>    $table-&gt;id();</p><p>    $table-&gt;foreignId('user_id')-&gt;constrained()-&gt;cascadeOnDelete();</p><p>    $table-&gt;foreignId('vehicle_id')-&gt;nullable()-&gt;constrained()-&gt;nullOnDelete();</p><p>    $table-&gt;string('title', 200)-&gt;nullable();</p><p>    $table-&gt;text('notes')-&gt;nullable();</p><p>    $table-&gt;string('start_location', 255)-&gt;nullable();</p><p>    $table-&gt;string('end_location', 255)-&gt;nullable();</p><p>    $table-&gt;decimal('start_lat', 10, 7)-&gt;nullable();</p><p>    $table-&gt;decimal('start_lng', 10, 7)-&gt;nullable();</p><p>    $table-&gt;decimal('end_lat', 10, 7)-&gt;nullable();</p><p>    $table-&gt;decimal('end_lng', 10, 7)-&gt;nullable();</p><p>    $table-&gt;decimal('distance_km', 8, 2);</p><p>    $table-&gt;integer('duration_minutes');</p><p>    $table-&gt;decimal('fuel_consumed_liters', 6, 3)-&gt;nullable();</p><p>    $table-&gt;decimal('avg_speed_kmh', 5, 1)-&gt;nullable();</p><p>    $table-&gt;decimal('max_speed_kmh', 5, 1)-&gt;nullable();</p><p>    $table-&gt;integer('hard_braking_count')-&gt;default(0);</p><p>    $table-&gt;integer('hard_acceleration_count')-&gt;default(0);</p><p>    $table-&gt;integer('idle_time_seconds')-&gt;default(0);</p><p>    $table-&gt;decimal('eco_score', 4, 1)-&gt;nullable();</p><p>    $table-&gt;decimal('co2_emitted_kg', 6, 3)-&gt;nullable();</p><p>    $table-&gt;decimal('co2_saved_vs_avg_kg', 6, 3)-&gt;nullable();</p><p>    $table-&gt;integer('xp_earned')-&gt;default(0);</p><p>    $table-&gt;enum('trip_type', ['commute','leisure','work','school','other'])-&gt;default('other');</p><p>    $table-&gt;enum('weather', ['sunny','cloudy','rainy','foggy','snowy','windy'])-&gt;nullable();</p><p>    $table-&gt;timestamp('started_at');</p><p>    $table-&gt;timestamp('ended_at');</p><p>    $table-&gt;timestamps();</p><p>    $table-&gt;softDeletes();</p><p>    $table-&gt;index(['user_id', 'started_at']);</p><p>    $table-&gt;index('eco_score');</p><p>});</p><h3><strong>Table: badges</strong></h3><p>Schema::create('badges', function (Blueprint $table) {</p><p>    $table-&gt;id();</p><p>    $table-&gt;string('name', 100)-&gt;unique();</p><p>    $table-&gt;string('slug', 100)-&gt;unique();</p><p>    $table-&gt;text('description');</p><p>    $table-&gt;string('icon_emoji', 10)-&gt;default('🏅');</p><p>    $table-&gt;string('icon_url')-&gt;nullable();</p><p>    $table-&gt;enum('category', ['milestone','eco','speed','streak','community','special']);</p><p>    $table-&gt;enum('rarity', ['common','rare','epic','legendary'])-&gt;default('common');</p><p>    $table-&gt;integer('xp_reward')-&gt;default(50);</p><p>    $table-&gt;string('condition_type', 100); // e.g. 'total_trips','avg_eco_score'</p><p>    $table-&gt;decimal('condition_value', 10, 2); // e.g. 10, 90.0</p><p>    $table-&gt;boolean('is_active')-&gt;default(true);</p><p>    $table-&gt;timestamps();</p><p>});</p><h3><strong>Table: user_badges (pivot)</strong></h3><p>Schema::create('user_badges', function (Blueprint $table) {</p><p>    $table-&gt;id();</p><p>    $table-&gt;foreignId('user_id')-&gt;constrained()-&gt;cascadeOnDelete();</p><p>    $table-&gt;foreignId('badge_id')-&gt;constrained()-&gt;cascadeOnDelete();</p><p>    $table-&gt;timestamp('awarded_at')-&gt;useCurrent();</p><p>    $table-&gt;unique(['user_id', 'badge_id']);</p><p>});</p><h3><strong>Table: challenges</strong></h3><p>Schema::create('challenges', function (Blueprint $table) {</p><p>    $table-&gt;id();</p><p>    $table-&gt;string('title', 200);</p><p>    $table-&gt;text('description');</p><p>    $table-&gt;string('emoji', 10)-&gt;default('🏁');</p><p>    $table-&gt;enum('type', ['individual','group']);</p><p>    $table-&gt;string('goal_metric', 100); // e.g. 'total_distance_km'</p><p>    $table-&gt;decimal('goal_value', 10, 2);</p><p>    $table-&gt;integer('xp_reward')-&gt;default(100);</p><p>    $table-&gt;foreignId('badge_id')-&gt;nullable()-&gt;constrained()-&gt;nullOnDelete();</p><p>    $table-&gt;timestamp('starts_at');</p><p>    $table-&gt;timestamp('ends_at');</p><p>    $table-&gt;boolean('is_active')-&gt;default(true);</p><p>    $table-&gt;timestamps();</p><p>});</p><h3><strong>Table: user_challenges (pivot)</strong></h3><p>Schema::create('user_challenges', function (Blueprint $table) {</p><p>    $table-&gt;id();</p><p>    $table-&gt;foreignId('user_id')-&gt;constrained()-&gt;cascadeOnDelete();</p><p>    $table-&gt;foreignId('challenge_id')-&gt;constrained()-&gt;cascadeOnDelete();</p><p>    $table-&gt;decimal('progress', 10, 2)-&gt;default(0);</p><p>    $table-&gt;boolean('is_completed')-&gt;default(false);</p><p>    $table-&gt;timestamp('completed_at')-&gt;nullable();</p><p>    $table-&gt;timestamp('joined_at')-&gt;useCurrent();</p><p>    $table-&gt;unique(['user_id', 'challenge_id']);</p><p>});</p><h3><strong>Table: eco_scores (weekly aggregates)</strong></h3><p>Schema::create('eco_scores', function (Blueprint $table) {</p><p>    $table-&gt;id();</p><p>    $table-&gt;foreignId('user_id')-&gt;constrained()-&gt;cascadeOnDelete();</p><p>    $table-&gt;integer('year');</p><p>    $table-&gt;integer('week_number'); // ISO week 1–53</p><p>    $table-&gt;decimal('avg_eco_score', 5, 2)-&gt;default(0);</p><p>    $table-&gt;decimal('total_distance_km', 8, 2)-&gt;default(0);</p><p>    $table-&gt;decimal('total_co2_saved_kg', 8, 3)-&gt;default(0);</p><p>    $table-&gt;decimal('total_fuel_saved_liters', 8, 3)-&gt;default(0);</p><p>    $table-&gt;integer('total_trips')-&gt;default(0);</p><p>    $table-&gt;integer('xp_earned')-&gt;default(0);</p><p>    $table-&gt;timestamps();</p><p>    $table-&gt;unique(['user_id', 'year', 'week_number']);</p><p>});</p><h3><strong>Table: notifications</strong></h3><p>Schema::create('notifications', function (Blueprint $table) {</p><p>    $table-&gt;uuid('id')-&gt;primary();</p><p>    $table-&gt;string('type');</p><p>    $table-&gt;morphs('notifiable');</p><p>    $table-&gt;json('data');</p><p>    $table-&gt;timestamp('read_at')-&gt;nullable();</p><p>    $table-&gt;timestamps();</p><p>});</p><table><tr><td><p><strong>SECTION 5 — LARAVEL BACKEND SETUP &amp; STRUCTURE</strong></p></td></tr></table><h1><strong>5. Laravel Backend — Setup &amp; Structure</strong></h1><h2><strong>5.1 Initial Setup Commands</strong></h2><p># Create new Laravel 11 project</p><p>composer create-project laravel/laravel ecodrive-backend</p><p>cd ecodrive-backend</p><p># Install required packages</p><p>composer require laravel/sanctum</p><p>composer require spatie/laravel-permission</p><p>composer require intervention/image</p><p>composer require barryvdh/laravel-cors</p><p># Publish Sanctum config</p><p>php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"</p><p># Run migrations</p><p>php artisan migrate</p><p>php artisan db:seed</p><h2><strong>5.2 Environment Configuration (.env)</strong></h2><p>APP_NAME=EcoDrive</p><p>APP_ENV=local</p><p>APP_KEY=base64:...</p><p>APP_URL=http://localhost:8000</p><p>FRONTEND_URL=http://localhost:5173</p><p>SANCTUM_STATEFUL_DOMAINS=localhost:5173</p><p>SESSION_DOMAIN=localhost</p><p>DB_CONNECTION=mysql</p><p>DB_HOST=127.0.0.1</p><p>DB_PORT=3306</p><p>DB_DATABASE=ecodrive</p><p>DB_USERNAME=root</p><p>DB_PASSWORD=secret</p><p>CACHE_DRIVER=redis</p><p>QUEUE_CONNECTION=redis</p><p>REDIS_HOST=127.0.0.1</p><p>REDIS_PORT=6379</p><h2><strong>5.3 Key Models</strong></h2><h3><strong>User Model (app/Models/User.php) — Key Methods</strong></h3><p>// Relationships</p><p>public function vehicles(): HasMany { return $this-&gt;hasMany(Vehicle::class); }</p><p>public function trips(): HasMany { return $this-&gt;hasMany(Trip::class); }</p><p>public function badges(): BelongsToMany { return $this-&gt;belongsToMany(Badge::class, 'user_badges')-&gt;withPivot('awarded_at'); }</p><p>public function ecoScores(): HasMany { return $this-&gt;hasMany(EcoScore::class); }</p><p>// Computed attribute</p><p>public function getEcoLevelAttribute(): string {</p><p>    return match(true) {</p><p>        $this-&gt;level &gt;= 20 =&gt; 'Eco Master',</p><p>        $this-&gt;level &gt;= 10 =&gt; 'Green Driver',</p><p>        $this-&gt;level &gt;= 5  =&gt; 'Eco Learner',</p><p>        default            =&gt; 'Beginner',</p><p>    };</p><p>}</p><h2><strong>5.4 Service Layer Pattern</strong></h2><p>All business logic is extracted from controllers into Service classes. This keeps controllers thin and logic testable.</p><p>// app/Services/EcoScoreService.php</p><p>class EcoScoreService {</p><p>    public function calculate(array $tripData): float {</p><p>        $speedScore       = $this-&gt;calcSpeedScore($tripData['avg_speed_kmh']);</p><p>        $consistencyScore = $this-&gt;calcConsistencyScore($tripData['hard_braking_count'], $tripData['hard_acceleration_count']);</p><p>        $idleScore        = $this-&gt;calcIdleScore($tripData['idle_time_seconds'], $tripData['duration_minutes']);</p><p>        $fuelScore        = $this-&gt;calcFuelScore($tripData);</p><p>        $distanceBonus    = min(10, $tripData['distance_km'] / 5);</p><p>        return round(($speedScore*0.20) + ($consistencyScore*0.25) + ($idleScore*0.20) + ($fuelScore*0.25) + ($distanceBonus*0.10), 1);</p><p>    }</p><p>}</p><table><tr><td><p><strong>SECTION 6 — API ENDPOINTS REFERENCE</strong></p></td></tr></table><h1><strong>6. API Endpoints Reference</strong></h1><p>All endpoints are prefixed with /api/v1. Protected routes require Bearer token via Sanctum. All responses follow a consistent JSON structure.</p><table><tr><td><p><strong>Standard Response Format</strong></p><p>Success:  { "success": true, "data": {...}, "message": "..." }
Paginated: { "success": true, "data": [...], "meta": { "current_page": 1, "total": 50 } }
Error:    { "success": false, "error": "...", "errors": { "field": ["msg"] } }</p></td></tr></table><h2><strong>6.1 Authentication Endpoints</strong></h2><table><thead><tr><th><p><strong>Method + Route</strong></p></th><th><p><strong>Description</strong></p></th><th><p><strong>Auth Required</strong></p></th></tr></thead><tbody><tr><td><p>POST /auth/register</p></td><td><p>Register new user account</p></td><td><p>No</p></td></tr><tr><td><p>POST /auth/login</p></td><td><p>Login, returns Sanctum token</p></td><td><p>No</p></td></tr><tr><td><p>POST /auth/logout</p></td><td><p>Revoke current token</p></td><td><p>Yes</p></td></tr><tr><td><p>POST /auth/forgot-password</p></td><td><p>Send password reset email</p></td><td><p>No</p></td></tr><tr><td><p>POST /auth/reset-password</p></td><td><p>Reset password with token</p></td><td><p>No</p></td></tr><tr><td><p>GET /auth/me</p></td><td><p>Get current authenticated user</p></td><td><p>Yes</p></td></tr><tr><td><p>POST /auth/verify-email/{id}/{hash}</p></td><td><p>Verify email address</p></td><td><p>Yes</p></td></tr><tr><td><p>POST /auth/resend-verification</p></td><td><p>Resend email verification</p></td><td><p>Yes</p></td></tr></tbody></table><h2><strong>6.2 User &amp; Profile Endpoints</strong></h2><table><thead><tr><th><p><strong>Method + Route</strong></p></th><th><p><strong>Description</strong></p></th><th><p><strong>Auth Required</strong></p></th></tr></thead><tbody><tr><td><p>GET /users/{id}</p></td><td><p>Get public user profile</p></td><td><p>No</p></td></tr><tr><td><p>PUT /users/profile</p></td><td><p>Update own profile</p></td><td><p>Yes</p></td></tr><tr><td><p>POST /users/avatar</p></td><td><p>Upload avatar image</p></td><td><p>Yes</p></td></tr><tr><td><p>GET /users/stats</p></td><td><p>Get own stats summary</p></td><td><p>Yes</p></td></tr><tr><td><p>GET /users/badges</p></td><td><p>Get own badges</p></td><td><p>Yes</p></td></tr><tr><td><p>DELETE /users/account</p></td><td><p>Delete own account</p></td><td><p>Yes</p></td></tr></tbody></table><h2><strong>6.3 Vehicle Endpoints</strong></h2><table><thead><tr><th><p><strong>Method + Route</strong></p></th><th><p><strong>Description</strong></p></th><th><p><strong>Auth Required</strong></p></th></tr></thead><tbody><tr><td><p>GET /vehicles</p></td><td><p>List user's vehicles</p></td><td><p>Yes</p></td></tr><tr><td><p>POST /vehicles</p></td><td><p>Create new vehicle</p></td><td><p>Yes</p></td></tr><tr><td><p>GET /vehicles/{id}</p></td><td><p>Get vehicle detail</p></td><td><p>Yes</p></td></tr><tr><td><p>PUT /vehicles/{id}</p></td><td><p>Update vehicle</p></td><td><p>Yes</p></td></tr><tr><td><p>DELETE /vehicles/{id}</p></td><td><p>Delete vehicle</p></td><td><p>Yes</p></td></tr><tr><td><p>PATCH /vehicles/{id}/set-default</p></td><td><p>Set as default vehicle</p></td><td><p>Yes</p></td></tr></tbody></table><h2><strong>6.4 Trip Endpoints</strong></h2><table><thead><tr><th><p><strong>Method + Route</strong></p></th><th><p><strong>Description</strong></p></th><th><p><strong>Auth Required</strong></p></th></tr></thead><tbody><tr><td><p>GET /trips</p></td><td><p>List trips (paginated, filterable)</p></td><td><p>Yes</p></td></tr><tr><td><p>POST /trips</p></td><td><p>Log a new trip</p></td><td><p>Yes</p></td></tr><tr><td><p>GET /trips/{id}</p></td><td><p>Get trip detail</p></td><td><p>Yes</p></td></tr><tr><td><p>PUT /trips/{id}</p></td><td><p>Update trip</p></td><td><p>Yes</p></td></tr><tr><td><p>DELETE /trips/{id}</p></td><td><p>Delete trip</p></td><td><p>Yes</p></td></tr><tr><td><p>GET /trips/stats</p></td><td><p>Get trip statistics summary</p></td><td><p>Yes</p></td></tr><tr><td><p>GET /trips/recent</p></td><td><p>Get last 5 trips (dashboard widget)</p></td><td><p>Yes</p></td></tr></tbody></table><h3><strong>POST /trips — Request Body</strong></h3><p>{</p><p>  "vehicle_id": 1,</p><p>  "title": "Morning Commute",</p><p>  "distance_km": 12.4,</p><p>  "duration_minutes": 24,</p><p>  "fuel_consumed_liters": 1.12,</p><p>  "avg_speed_kmh": 48.5,</p><p>  "max_speed_kmh": 72.0,</p><p>  "hard_braking_count": 2,</p><p>  "hard_acceleration_count": 1,</p><p>  "idle_time_seconds": 90,</p><p>  "trip_type": "commute",</p><p>  "weather": "sunny",</p><p>  "started_at": "2025-05-18T08:00:00Z",</p><p>  "ended_at": "2025-05-18T08:24:00Z"</p><p>}</p><h2><strong>6.5 Gamification Endpoints</strong></h2><table><thead><tr><th><p><strong>Method + Route</strong></p></th><th><p><strong>Description</strong></p></th><th><p><strong>Auth Required</strong></p></th></tr></thead><tbody><tr><td><p>GET /badges</p></td><td><p>List all available badges</p></td><td><p>No</p></td></tr><tr><td><p>GET /leaderboard</p></td><td><p>Global leaderboard (paginated)</p></td><td><p>No</p></td></tr><tr><td><p>GET /leaderboard/weekly</p></td><td><p>Weekly leaderboard</p></td><td><p>No</p></td></tr><tr><td><p>GET /challenges</p></td><td><p>List active challenges</p></td><td><p>No</p></td></tr><tr><td><p>POST /challenges/{id}/join</p></td><td><p>Join a challenge</p></td><td><p>Yes</p></td></tr><tr><td><p>GET /challenges/{id}/progress</p></td><td><p>My challenge progress</p></td><td><p>Yes</p></td></tr><tr><td><p>GET /challenges/{id}/leaderboard</p></td><td><p>Challenge leaderboard</p></td><td><p>No</p></td></tr></tbody></table><h2><strong>6.6 Analytics Endpoints</strong></h2><table><thead><tr><th><p><strong>Method + Route</strong></p></th><th><p><strong>Description</strong></p></th><th><p><strong>Auth Required</strong></p></th></tr></thead><tbody><tr><td><p>GET /analytics/weekly</p></td><td><p>Weekly eco score history</p></td><td><p>Yes</p></td></tr><tr><td><p>GET /analytics/monthly</p></td><td><p>Monthly summary</p></td><td><p>Yes</p></td></tr><tr><td><p>GET /analytics/emissions</p></td><td><p>Emission breakdown chart data</p></td><td><p>Yes</p></td></tr><tr><td><p>GET /analytics/fuel-savings</p></td><td><p>Fuel &amp; money saved vs average</p></td><td><p>Yes</p></td></tr><tr><td><p>GET /analytics/co2-saved</p></td><td><p>Cumulative CO₂ saved over time</p></td><td><p>Yes</p></td></tr></tbody></table><table><tr><td><p><strong>SECTION 7 — REACT FRONTEND SETUP &amp; STRUCTURE</strong></p></td></tr></table><h1><strong>7. React Frontend — Setup &amp; Structure</strong></h1><h2><strong>7.1 Initial Setup</strong></h2><p># Create Vite + React project</p><p>npm create vite@latest ecodrive-frontend -- --template react</p><p>cd ecodrive-frontend</p><p># Install dependencies</p><p>npm install react-router-dom axios zustand @tanstack/react-query</p><p>npm install recharts date-fns clsx</p><p>npm install -D tailwindcss postcss autoprefixer</p><p>npx tailwindcss init -p</p><p># Install shadcn/ui</p><p>npx shadcn-ui@latest init</p><p>npx shadcn-ui@latest add button card badge input label toast</p><h2><strong>7.2 Pages &amp; Routes</strong></h2><table><thead><tr><th><p><strong>Route</strong></p></th><th><p><strong>Component / Description</strong></p></th></tr></thead><tbody><tr><td><p>/</p></td><td><p>LandingPage — Hero, features, stats, CTA</p></td></tr><tr><td><p>/login</p></td><td><p>LoginPage — Email + password form</p></td></tr><tr><td><p>/register</p></td><td><p>RegisterPage — Multi-step signup</p></td></tr><tr><td><p>/dashboard</p></td><td><p>DashboardPage — Stats, recent trips, weekly chart (Protected)</p></td></tr><tr><td><p>/trips</p></td><td><p>TripsPage — Trip list with filters (Protected)</p></td></tr><tr><td><p>/trips/new</p></td><td><p>NewTripPage — Log trip form (Protected)</p></td></tr><tr><td><p>/trips/:id</p></td><td><p>TripDetailPage — Trip detail view (Protected)</p></td></tr><tr><td><p>/vehicles</p></td><td><p>VehiclesPage — Vehicle management (Protected)</p></td></tr><tr><td><p>/leaderboard</p></td><td><p>LeaderboardPage — Global + weekly tabs (Protected)</p></td></tr><tr><td><p>/challenges</p></td><td><p>ChallengesPage — Active challenges (Protected)</p></td></tr><tr><td><p>/badges</p></td><td><p>BadgesPage — Badge collection (Protected)</p></td></tr><tr><td><p>/analytics</p></td><td><p>AnalyticsPage — Charts + insights (Protected)</p></td></tr><tr><td><p>/profile</p></td><td><p>ProfilePage — Edit profile + settings (Protected)</p></td></tr><tr><td><p>/profile/:id</p></td><td><p>PublicProfilePage — View other user's profile</p></td></tr></tbody></table><h2><strong>7.3 Axios API Client Setup</strong></h2><p>// src/services/api.js</p><p>import axios from 'axios';</p><p>const api = axios.create({</p><p>  baseURL: import.meta.env.VITE_API_URL + '/api/v1',</p><p>  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }</p><p>});</p><p>api.interceptors.request.use(config =&gt; {</p><p>  const token = localStorage.getItem('ecodrive_token');</p><p>  if (token) config.headers.Authorization = `Bearer ${token}`;</p><p>  return config;</p><p>});</p><p>api.interceptors.response.use(</p><p>  res =&gt; res,</p><p>  err =&gt; {</p><p>    if (err.response?.status === 401) {</p><p>      localStorage.removeItem('ecodrive_token');</p><p>      window.location.href = '/login';</p><p>    }</p><p>    return Promise.reject(err);</p><p>  }</p><p>);</p><p>export default api;</p><h2><strong>7.4 Zustand Auth Store</strong></h2><p>// src/store/authStore.js</p><p>import { create } from 'zustand';</p><p>import { persist } from 'zustand/middleware';</p><p>import api from '../services/api';</p><p>export const useAuthStore = create(persist((set) =&gt; ({</p><p>  user: null,</p><p>  token: null,</p><p>  isAuthenticated: false,</p><p>  login: async (email, password) =&gt; {</p><p>    const { data } = await api.post('/auth/login', { email, password });</p><p>    set({ user: data.data.user, token: data.data.token, isAuthenticated: true });</p><p>    localStorage.setItem('ecodrive_token', data.data.token);</p><p>  },</p><p>  logout: async () =&gt; {</p><p>    await api.post('/auth/logout');</p><p>    localStorage.removeItem('ecodrive_token');</p><p>    set({ user: null, token: null, isAuthenticated: false });</p><p>  },</p><p>}), { name: 'auth-storage' }));</p><table><tr><td><p><strong>SECTION 8 — UI/UX DESIGN SYSTEM</strong></p></td></tr></table><h1><strong>8. UI/UX Design System</strong></h1><h2><strong>8.1 Color Palette</strong></h2><table><thead><tr><th><p><strong>Token</strong></p></th><th><p><strong>Value &amp; Usage</strong></p></th></tr></thead><tbody><tr><td><p>--eco-primary</p></td><td><p>#2D7D46 — Primary green, buttons, links, headings</p></td></tr><tr><td><p>--eco-primary-dark</p></td><td><p>#1A4D2E — Dark green, hover states, sidebar</p></td></tr><tr><td><p>--eco-accent</p></td><td><p>#4CAF50 — Accent green, badges, highlights, charts</p></td></tr><tr><td><p>--eco-warning</p></td><td><p>#F9A825 — Amber, medium scores, caution states</p></td></tr><tr><td><p>--eco-danger</p></td><td><p>#E53935 — Red, low eco-scores, alerts, deletes</p></td></tr><tr><td><p>--eco-success</p></td><td><p>#43A047 — Success toasts, completed badges</p></td></tr><tr><td><p>--eco-bg</p></td><td><p>#F1F8F4 — Light green-tinted page background</p></td></tr><tr><td><p>--eco-surface</p></td><td><p>#FFFFFF — Cards, modals, panels</p></td></tr><tr><td><p>--eco-text</p></td><td><p>#1B2D25 — Primary dark text</p></td></tr><tr><td><p>--eco-muted</p></td><td><p>#6B7A6E — Secondary/muted text</p></td></tr></tbody></table><h2><strong>8.2 Key UI Components</strong></h2><table><thead><tr><th><p><strong>Component</strong></p></th><th><p><strong>Description</strong></p></th></tr></thead><tbody><tr><td><p>&lt;EcoScoreBadge score={82} /&gt;</p></td><td><p>Circle with color gradient based on score (red→amber→green), animated fill</p></td></tr><tr><td><p>&lt;TripCard trip={trip} /&gt;</p></td><td><p>Compact card: distance, score, date, vehicle badge, eco emoji</p></td></tr><tr><td><p>&lt;WeeklyChart data={scores} /&gt;</p></td><td><p>Recharts AreaChart, green gradient fill, eco score per day</p></td></tr><tr><td><p>&lt;LeaderboardRow user={u} rank={1} /&gt;</p></td><td><p>Rank badge, avatar, name, XP bar, CO₂ saved</p></td></tr><tr><td><p>&lt;BadgeCard badge={b} unlocked={true} /&gt;</p></td><td><p>Emoji icon, name, rarity chip, locked/unlocked state with blur overlay</p></td></tr><tr><td><p>&lt;StatCard label='CO₂ Saved' value='12.4 kg' icon='🌱' /&gt;</p></td><td><p>Metric card with icon, label, animated number</p></td></tr><tr><td><p>&lt;ChallengeCard challenge={c} /&gt;</p></td><td><p>Progress bar, time remaining countdown, join button</p></td></tr><tr><td><p>&lt;EcoTipBanner tip='...' /&gt;</p></td><td><p>Green info banner with leaf icon, dismissible</p></td></tr></tbody></table><h2><strong>8.3 Eco Score Color Logic</strong></h2><p>// src/utils/ecoScore.js</p><p>export const getScoreColor = (score) =&gt; {</p><p>  if (score &gt;= 80) return { bg: '#E8F5E9', text: '#2D7D46', label: 'Excellent 🌿' };</p><p>  if (score &gt;= 60) return { bg: '#FFF9C4', text: '#F9A825', label: 'Good 🍃' };</p><p>  if (score &gt;= 40) return { bg: '#FFF3E0', text: '#E65100', label: 'Fair 🍂' };</p><p>  return { bg: '#FFEBEE', text: '#E53935', label: 'Poor 💨' };</p><p>};</p><h2><strong>8.4 Dashboard Layout Wireframe</strong></h2><table><tr><td><p><strong>Dashboard Layout</strong></p><p>┌─────────────────────────────────────────────────────────────┐
│  🌿 EcoDrive         [Trips] [Leaderboard] [Profile]   🔔  │  ← Nav
├─────────────┬──────────────────────┬───────────────────────┤
│ Eco Score   │  Weekly Trips Chart  │  Quick Log Trip  [+] │  ← Top Row
│   ●  82     │  ▁▃▅▇▆▅▇            │  Vehicle: My Car 🚗  │
├─────────────┴──────────────────────┴───────────────────────┤
│  📊  This Week Stats:  Trips: 4 | Distance: 52km | CO₂ -2kg│
├─────────────────────────────────────┬───────────────────────┤
│  Recent Trips                       │  Your Badges (3 new) │
│  ● Morning Commute  82 🌿 Today     │  🏅🏆🌱 +3 locked    │
│  ● Evening Drive    74 🍃 Yesterday  │                       │
│  [View All Trips]                   │  [View All Badges]    │
└─────────────────────────────────────┴───────────────────────┘</p></td></tr></table><table><tr><td><p><strong>SECTION 9 — AUTHENTICATION &amp; AUTHORIZATION</strong></p></td></tr></table><h1><strong>9. Authentication &amp; Authorization</strong></h1><h2><strong>9.1 Authentication Flow</strong></h2><ol><li>User submits register/login form in React</li><li>React calls POST /api/v1/auth/login with credentials</li><li>Laravel validates, creates Sanctum token, returns { user, token }</li><li>React stores token in localStorage, sets Zustand auth state</li><li>All subsequent requests include Authorization: Bearer &lt;token&gt; header</li><li>On logout, React calls POST /api/v1/auth/logout — Laravel revokes the token</li></ol><h2><strong>9.2 Protected Route (React)</strong></h2><p>// src/components/ProtectedRoute.jsx</p><p>import { Navigate } from 'react-router-dom';</p><p>import { useAuthStore } from '../store/authStore';</p><p>export const ProtectedRoute = ({ children }) =&gt; {</p><p>  const { isAuthenticated } = useAuthStore();</p><p>  return isAuthenticated ? children : &lt;Navigate to='/login' replace /&gt;;</p><p>};</p><h2><strong>9.3 Authorization (Laravel Policies)</strong></h2><p>// app/Policies/TripPolicy.php</p><p>public function update(User $user, Trip $trip): bool {</p><p>    return $user-&gt;id === $trip-&gt;user_id;</p><p>}</p><p>public function delete(User $user, Trip $trip): bool {</p><p>    return $user-&gt;id === $trip-&gt;user_id;</p><p>}</p><p>// In TripController:</p><p>$this-&gt;authorize('update', $trip); // Throws 403 if not owner</p><table><tr><td><p><strong>SECTION 10 — AGENT BUILD PROMPTS (STEP BY STEP)</strong></p></td></tr></table><h1><strong>10. Agent Build Prompts — Step by Step</strong></h1><p>The following prompts are designed to be given sequentially to a coding AI agent (e.g. Claude Code, Cursor, GitHub Copilot Workspace). Each prompt builds on the previous one. Follow them in order and do not skip steps.</p><table><tr><td><p><strong>⚠️ Important Before You Start</strong></p><p>1. Have PHP 8.2+, Composer, Node 20+, MySQL 8, Redis installed
2. Create MySQL database named 'ecodrive' before Step 2
3. Each prompt assumes the previous steps completed successfully
4. After each prompt, run tests and verify before proceeding</p></td></tr></table><h2><strong>Step 1 — Laravel Project Initialization</strong></h2><table><tr><td><p><strong>🤖 AGENT PROMPT — STEP 1 — Laravel Project Setup</strong></p><p>You are building the backend for EcoDrive, an eco-friendly driving habits platform. 

Your task:
1. Create a new Laravel 11 project called 'ecodrive-backend' using composer create-project
2. Install these packages: laravel/sanctum, spatie/laravel-permission, intervention/image-laravel
3. Configure Laravel Sanctum for SPA token authentication
4. Update config/cors.php to allow requests from http://localhost:5173 with supports_credentials: true
5. In bootstrap/app.php, register the Sanctum middleware 'auth:sanctum' as an alias
6. Update .env to connect to a MySQL database named 'ecodrive' on localhost
7. Add FRONTEND_URL=http://localhost:5173 and SANCTUM_STATEFUL_DOMAINS=localhost:5173 to .env
8. Create a routes/api.php file with a versioned prefix: Route::prefix('v1')-&gt;group(...)
9. Confirm the setup works with: php artisan serve
10. Show me the final directory structure.</p></td></tr></table><h2><strong>Step 2 — Database Migrations</strong></h2><table><tr><td><p><strong>🤖 AGENT PROMPT — STEP 2 — All Database Migrations</strong></p><p>In the Laravel project 'ecodrive-backend', create ALL database migrations in this exact order:

1. users table (modify existing) — add columns: avatar, bio, city, country, total_xp, level, global_rank, total_co2_saved, total_distance_km, total_trips, is_admin, notifications_enabled, preferred_unit, softDeletes
2. vehicles table — fields: id, user_id (FK), nickname, make, model, year, fuel_type (enum: petrol/diesel/electric/hybrid/lpg), engine_size_cc, baseline_fuel_efficiency, color, registration_plate, is_default, timestamps, softDeletes
3. trips table — fields: id, user_id (FK), vehicle_id (nullable FK), title, notes, start_location, end_location, start_lat, start_lng, end_lat, end_lng, distance_km, duration_minutes, fuel_consumed_liters, avg_speed_kmh, max_speed_kmh, hard_braking_count, hard_acceleration_count, idle_time_seconds, eco_score, co2_emitted_kg, co2_saved_vs_avg_kg, xp_earned, trip_type (enum), weather (nullable enum), started_at, ended_at, timestamps, softDeletes. Add composite index on (user_id, started_at) and index on eco_score.
4. badges table — fields: id, name, slug, description, icon_emoji, icon_url, category (enum: milestone/eco/speed/streak/community/special), rarity (enum: common/rare/epic/legendary), xp_reward, condition_type, condition_value, is_active, timestamps
5. user_badges pivot — fields: id, user_id (FK), badge_id (FK), awarded_at. Unique constraint on (user_id, badge_id).
6. challenges table — fields: id, title, description, emoji, type (enum: individual/group), goal_metric, goal_value, xp_reward, badge_id (nullable FK), starts_at, ends_at, is_active, timestamps
7. user_challenges pivot — fields: id, user_id, challenge_id, progress, is_completed, completed_at, joined_at. Unique constraint on (user_id, challenge_id).
8. eco_scores table — fields: id, user_id (FK), year, week_number, avg_eco_score, total_distance_km, total_co2_saved_kg, total_fuel_saved_liters, total_trips, xp_earned, timestamps. Unique on (user_id, year, week_number).
9. Use Laravel's built-in notifications table (php artisan notifications:table)

After creating all migrations, run php artisan migrate and show the output.</p></td></tr></table><h2><strong>Step 3 — Eloquent Models</strong></h2><table><tr><td><p><strong>🤖 AGENT PROMPT — STEP 3 — Eloquent Models with Relationships</strong></p><p>In 'ecodrive-backend', create all Eloquent models with full relationships and fillable arrays:

1. User model (update existing):
   - HasMany: vehicles, trips, ecoScores, userChallenges
   - BelongsToMany: badges (via user_badges, withPivot awarded_at), challenges (via user_challenges, withPivot progress/is_completed/completed_at)
   - Casts: total_co2_saved as decimal:3, total_distance_km as decimal:2, is_admin as boolean
   - Appended attribute: eco_level (Beginner/Eco Learner/Green Driver/Eco Master based on level)
   - fillable: all columns except id, password, rememberToken, timestamps

2. Vehicle model:
   - BelongsTo: user
   - HasMany: trips
   - fillable: all columns except id, timestamps
   - Scope: scopeDefault() for where is_default = true

3. Trip model:
   - BelongsTo: user, vehicle
   - fillable: all columns except id, timestamps
   - Casts: started_at and ended_at as datetime, eco_score as decimal:1
   - Accessor: getDurationFormattedAttribute() — returns "1h 24m" format
   - Scope: scopeForUser($userId), scopeThisWeek(), scopeThisMonth()

4. Badge model:
   - BelongsToMany: users (via user_badges)
   - fillable: all columns except id, timestamps

5. Challenge model:
   - BelongsTo: badge (nullable)
   - BelongsToMany: users (via user_challenges)
   - Scope: scopeActive() — where is_active=true and ends_at &gt; now()

6. EcoScore model:
   - BelongsTo: user
   - fillable: all columns except id

7. UserBadge model (for pivot): user_id, badge_id, awarded_at

Show all model files with complete code.</p></td></tr></table><h2><strong>Step 4 — Authentication Controllers &amp; Routes</strong></h2><table><tr><td><p><strong>🤖 AGENT PROMPT — STEP 4 — Auth System (Register, Login, Logout, Password Reset)</strong></p><p>In 'ecodrive-backend', build the complete authentication system:

1. Create app/Http/Controllers/Api/AuthController.php with these methods:
   - register(RegisterRequest $request): Validates, creates user, sends email verification, returns Sanctum token + user resource
   - login(LoginRequest $request): Validates credentials, returns token + user resource. Return 422 if unverified email.
   - logout(Request $request): Revokes current token
   - me(Request $request): Returns current user with eager-loaded badges count and vehicles
   - forgotPassword(Request $request): Sends password reset link via Password::sendResetLink
   - resetPassword(Request $request): Resets password via Password::reset
   - verifyEmail(Request $request, $id, $hash): Marks email as verified
   - resendVerification(Request $request): Resends verification email

2. Create app/Http/Requests/RegisterRequest.php — validate: name (required, max:100), email (required, email, unique:users), password (required, min:8, confirmed), country (nullable, size:2)

3. Create app/Http/Requests/LoginRequest.php — validate: email (required, email), password (required)

4. Create app/Http/Resources/UserResource.php — transform: id, name, email, avatar_url (full URL), bio, city, country, level, eco_level (appended), total_xp, total_trips, total_distance_km, total_co2_saved, global_rank, badges_count, is_admin, created_at

5. Register routes in routes/api.php under prefix 'v1' and sub-group 'auth':
   POST auth/register, POST auth/login (no auth)
   POST auth/logout, GET auth/me, POST auth/forgot-password, POST auth/reset-password, GET auth/verify-email/{id}/{hash}, POST auth/resend-verification (sanctum protected)

6. Test with php artisan test or curl examples for register and login.</p></td></tr></table><h2><strong>Step 5 — Trip &amp; Vehicle Controllers</strong></h2><table><tr><td><p><strong>🤖 AGENT PROMPT — STEP 5 — Trip and Vehicle CRUD with Eco Score Calculation</strong></p><p>In 'ecodrive-backend', build the Trip and Vehicle modules:

VEHICLES:
1. Create app/Services/VehicleService.php with: create(User, array), update(Vehicle, array), setDefault(User, Vehicle) — sets is_default=true for this vehicle and false for all others
2. Create app/Http/Controllers/Api/VehicleController.php with: index (list user's vehicles), store, show, update, destroy, setDefault
3. Create VehicleRequest (store + update rules), VehicleResource (all fields + trips_count)
4. Create VehiclePolicy: only owner can update/delete
5. Register resourceful routes under auth middleware

TRIPS:
1. Create app/Services/EcoScoreService.php:
   - calculate(array $data): float — weighted algorithm:
     * speedScore (20%): 100 if 40-80kmh, linear falloff outside
     * consistencyScore (25%): 100 - (hard_braking + hard_acceleration) * 8, min 0
     * idleScore (20%): 100 - (idle_seconds / duration_seconds * 100) * 1.5, min 0
     * fuelScore (25%): if fuel_consumed provided, compare to vehicle baseline; else 70 default
     * distanceBonus (10%): min(10, distance_km / 5) as 0-10 points
   - estimateCO2(float $fuelLiters, string $fuelType): float — petrol: *2.31, diesel: *2.68, electric: 0, hybrid: *1.5, lpg: *1.61
   - calculateXP(float $ecoScore, float $distanceKm): int — base 10 + (score/100*20) + (distance*0.5), max 100 per trip

2. Create app/Http/Controllers/Api/TripController.php with:
   - index: paginate 15, filter by trip_type, date range, vehicle_id, sort by started_at desc
   - store: calculate eco_score + co2 using services, increment user totals (total_trips, total_distance_km, total_co2_saved, total_xp), dispatch CheckBadgesJob
   - show, update, destroy (with TripPolicy)
   - stats: return { total_trips, total_distance_km, avg_eco_score, total_co2_saved, best_score, worst_score }
   - recent: return last 5 trips

3. Create TripRequest, TripResource (all fields + vehicle relationship + duration_formatted accessor)
4. Dispatch a queued job CheckBadgesJob after each trip is stored
5. Register routes under auth middleware

Show all files with complete code.</p></td></tr></table><h2><strong>Step 6 — Badges, Gamification &amp; Jobs</strong></h2><table><tr><td><p><strong>🤖 AGENT PROMPT — STEP 6 — Badges, XP, Leaderboard, and Challenges</strong></p><p>In 'ecodrive-backend', build the gamification system:

BADGES:
1. Create database seeder DatabaseSeeder.php that seeds these badges:
   - First Trip (milestone, common, 25xp, condition_type: total_trips, value: 1)
   - Road Warrior (milestone, rare, 100xp, total_trips: 50)
   - Century Rider (milestone, epic, 250xp, total_trips: 100)
   - Green Starter (eco, common, 50xp, avg_eco_score: 70)
   - Eco Champion (eco, epic, 200xp, avg_eco_score: 90)
   - Speed Demon Tamed (speed, rare, 75xp, condition: 10 trips with avg_speed &lt; 60)
   - Long Hauler (milestone, rare, 150xp, total_distance_km: 500)
   - Carbon Saver (eco, legendary, 500xp, total_co2_saved: 10)
   - 7-Day Streak (streak, rare, 100xp, condition: 7 consecutive days with trips)

2. Create app/Jobs/CheckBadgesJob.php (queued):
   - Receives User model
   - Checks each badge condition against user stats
   - For each unearned badge whose condition is met: create user_badge record, add xp_reward to user total_xp, update user level (every 500xp = 1 level), dispatch BadgeUnlockedNotification

3. Create app/Notifications/BadgeUnlockedNotification.php:
   - via: ['database', 'mail']
   - toMail: sends email with badge name, emoji, xp earned
   - toArray: { type: 'badge_unlocked', badge_id, badge_name, badge_emoji, xp_earned }

LEADERBOARD:
4. Create app/Http/Controllers/Api/LeaderboardController.php:
   - global(): paginate users by total_xp desc, return rank, name, avatar, level, eco_level, total_xp, total_co2_saved, total_trips. Cache result 5 minutes in Redis.
   - weekly(): same but calculated from eco_scores where week = current ISO week

CHALLENGES:
5. Create app/Http/Controllers/Api/ChallengeController.php:
   - index(): active challenges with user's participation status
   - join(Challenge): create user_challenge record if not already joined
   - progress(Challenge): return user's current progress vs goal
   - leaderboard(Challenge): top participants by progress
6. Create app/Console/Commands/UpdateChallengeProgress.php — scheduled daily to recalculate user_challenges.progress based on trips in challenge date range

7. Create BadgeController with index() (all badges) and mine() (user's earned badges with pivot data)

Register all new routes and show complete files.</p></td></tr></table><h2><strong>Step 7 — Analytics Endpoints</strong></h2><table><tr><td><p><strong>🤖 AGENT PROMPT — STEP 7 — Analytics &amp; Stats API</strong></p><p>In 'ecodrive-backend', build the analytics endpoints:

1. Create app/Services/AnalyticsService.php with these methods:
   - weeklyScores(User $user, int $weeks = 8): returns array of { week_label, avg_eco_score, total_distance_km, total_co2_saved, total_trips } for last N weeks, using eco_scores table. Fill missing weeks with zeros.
   - monthlyStats(User $user, int $months = 6): group trips by month, return monthly aggregates
   - emissionsBreakdown(User $user): return { total_emitted_kg, total_saved_kg, by_trip_type: { commute: X, leisure: Y, ... } }
   - fuelSavings(User $user): calculate fuel_saved_liters and money_saved (assume fuel_price_per_liter = 95 INR), compared to national average efficiency of 12 L/100km
   - co2Timeline(User $user): cumulative CO₂ saved, week by week, for charting

2. Create app/Http/Controllers/Api/AnalyticsController.php:
   - weekly(): calls weeklyScores, returns chart-ready data
   - monthly(): calls monthlyStats
   - emissions(): calls emissionsBreakdown
   - fuelSavings(): calls fuelSavings, returns { fuel_saved_liters, money_saved_inr, equivalent_trees_planted (÷21.7 kg per tree per year) }
   - co2Saved(): calls co2Timeline

3. Create app/Http/Controllers/Api/DashboardController.php:
   - index(): returns single response with: user stats, last 5 trips with vehicle, current week eco_score, weekly chart (4 weeks), unlocked badges (latest 3), active challenge with progress, global rank. This is the main dashboard data load — single API call.

4. Register all routes under /analytics prefix with auth middleware.

Show all service and controller files completely.</p></td></tr></table><h2><strong>Step 8 — React App Foundation</strong></h2><table><tr><td><p><strong>🤖 AGENT PROMPT — STEP 8 — React Frontend Foundation</strong></p><p>Create a new React 18 + Vite project called 'ecodrive-frontend'.

1. Install: react-router-dom, axios, zustand, @tanstack/react-query, recharts, date-fns, clsx, lucide-react
2. Install and configure Tailwind CSS v3 with the following custom colors in tailwind.config.js:
   eco: { primary: '#2D7D46', dark: '#1A4D2E', accent: '#4CAF50', light: '#E8F5E9', bg: '#F1F8F4' }
3. Create src/services/api.js — Axios instance with baseURL from VITE_API_URL env var, Bearer token interceptor from localStorage key 'ecodrive_token', 401 redirect to /login
4. Create src/store/authStore.js — Zustand store with persist middleware: { user, token, isAuthenticated, login(email,password), logout(), updateUser(data) }
5. Create src/App.jsx — React Router setup with all routes from the route map. Wrap with QueryClientProvider. Use lazy loading for all page components.
6. Create src/components/ProtectedRoute.jsx — redirects to /login if not authenticated
7. Create src/components/layout/AppLayout.jsx — sidebar nav layout for authenticated pages with: green sidebar with logo, nav links (Dashboard, Trips, Vehicles, Leaderboard, Challenges, Badges, Analytics), user avatar + name at bottom, mobile-responsive hamburger menu
8. Create src/components/layout/PublicLayout.jsx — minimal layout for login/register/landing pages
9. Create src/utils/ecoScore.js — helper functions: getScoreColor(score), getScoreLabel(score), getScoreEmoji(score), formatCO2(kg), formatDistance(km)
10. Create src/.env with VITE_API_URL=http://localhost:8000

Show all files completely.</p></td></tr></table><h2><strong>Step 9 — Dashboard &amp; Trips UI</strong></h2><table><tr><td><p><strong>🤖 AGENT PROMPT — STEP 9 — Dashboard, Trip List, and Log Trip Pages</strong></p><p>In 'ecodrive-frontend', build the core pages:

DASHBOARD PAGE (src/pages/DashboardPage.jsx):
1. On mount, fetch GET /api/v1/dashboard using React Query
2. Display these sections:
   - Welcome banner: "Good morning, {name}! 🌿 Your eco streak: X days"
   - Row of 4 StatCards: Total Trips | Total Distance | CO₂ Saved | Current Level
   - Large Weekly Eco Score chart: Recharts AreaChart, green gradient, 7 days, score on Y axis
   - Recent Trips: last 5 trips as TripCard components
   - Active Challenge widget: progress bar + days remaining
   - Latest 3 badges earned
3. Show skeleton loaders while data loads

TRIP LIST PAGE (src/pages/TripsPage.jsx):
1. Fetch GET /api/v1/trips (paginated) with filters: date range picker, trip_type dropdown, vehicle selector
2. Show trips in a responsive list/grid with TripCard components
3. TripCard shows: date, title, distance, duration, eco score badge (color-coded), vehicle name, CO₂ emitted
4. Infinite scroll or pagination controls
5. "Log New Trip" floating button → /trips/new

LOG TRIP PAGE (src/pages/NewTripPage.jsx):
1. Form with all trip fields: title, vehicle dropdown (user's vehicles), distance_km, duration_minutes, fuel_consumed_liters, avg_speed_kmh, max_speed_kmh, hard_braking_count, hard_acceleration_count, idle_time_seconds, trip_type, weather, started_at (datetime picker), notes
2. Live eco score preview — recalculate client-side as user fills fields using the ecoScore utility
3. On submit: POST to /api/v1/trips, show success toast with eco score earned, redirect to /trips
4. Validation with descriptive error messages

Create reusable components: src/components/trips/TripCard.jsx, src/components/ui/StatCard.jsx, src/components/ui/EcoScoreBadge.jsx

Show all files completely.</p></td></tr></table><h2><strong>Step 10 — Leaderboard, Badges &amp; Challenges UI</strong></h2><table><tr><td><p><strong>🤖 AGENT PROMPT — STEP 10 — Leaderboard, Badges, and Challenges Pages</strong></p><p>In 'ecodrive-frontend', build the gamification UI pages:

LEADERBOARD PAGE (src/pages/LeaderboardPage.jsx):
1. Two tabs: Global (all-time by XP) and Weekly (this week's eco score)
2. Fetch from /api/v1/leaderboard and /api/v1/leaderboard/weekly
3. Top 3 users shown prominently with gold/silver/bronze styling and large avatars
4. Rest shown in a ranked table: rank number, avatar, name, level badge, XP bar, CO₂ saved stat
5. Highlight current user's row in light green
6. Show user's own rank even if outside top 20

BADGES PAGE (src/pages/BadgesPage.jsx):
1. Fetch all badges (GET /api/v1/badges) and user's earned badges (GET /api/v1/badges/mine)
2. Group badges by category: Milestone, Eco, Speed, Streak, Community, Special
3. Earned badges: full color, show awarded date on hover tooltip
4. Unearned badges: grayscale with blur, show "???" for name, show condition hint ("Log 50 trips")
5. Badge detail modal on click: big emoji, name, rarity chip (color-coded: common=gray, rare=blue, epic=purple, legendary=gold), description, XP reward, earned/not-earned status
6. Progress bar towards next milestone badge

CHALLENGES PAGE (src/pages/ChallengesPage.jsx):
1. Fetch active challenges from GET /api/v1/challenges
2. Show challenge cards: emoji, title, description, goal, time remaining countdown
3. If user joined: show progress bar (current/goal), "You're at X% of the goal!"
4. If not joined: "Join Challenge" button → POST /api/v1/challenges/{id}/join
5. Each card has "View Leaderboard" button → modal with top 10 participants

Show all files completely.</p></td></tr></table><h2><strong>Step 11 — Analytics &amp; Profile Pages</strong></h2><table><tr><td><p><strong>🤖 AGENT PROMPT — STEP 11 — Analytics Dashboard and Profile Pages</strong></p><p>In 'ecodrive-frontend', build the Analytics and Profile pages:

ANALYTICS PAGE (src/pages/AnalyticsPage.jsx):
1. Fetch data from /api/v1/analytics/weekly, /emissions, /fuel-savings, /co2-saved
2. Build a beautiful analytics dashboard with these charts using Recharts:
   a. Weekly Eco Score Trend — AreaChart, last 8 weeks, green gradient fill
   b. Monthly Distance &amp; CO₂ — BarChart with dual Y-axis (distance in km, CO₂ in kg)
   c. Trip Type Breakdown — PieChart with eco colors (commute/leisure/work/school)
   d. Fuel Savings — 2 big stat cards: "X liters saved" and "₹X money saved" with green text
   e. CO₂ Cumulative — LineChart showing cumulative CO₂ saved growing over time
3. Add a "🌱 Equivalent to planting X trees!" callout based on CO₂ saved
4. All charts responsive, with custom tooltips styled in eco-green

PROFILE PAGE (src/pages/ProfilePage.jsx):
1. Show current user's avatar, name, level, eco_level, join date, city
2. Editable form: name, bio (textarea), city, country, preferred_unit (metric/imperial), notifications_enabled toggle
3. Avatar upload: image file input, preview before upload, POST to /api/v1/users/avatar
4. Vehicle management section: list vehicles, add new vehicle form (make, model, year, fuel_type, engine_size_cc, baseline_fuel_efficiency, nickname, color), edit/delete existing, set default
5. Stats summary: total trips, total distance, total CO₂ saved, badges earned count, current level XP progress bar to next level
6. Password change section: current password, new password, confirm

VEHICLES PAGE (src/pages/VehiclesPage.jsx):
1. List all user vehicles as cards: emoji based on fuel type (⚡ electric, ⛽ petrol, 🚌 diesel, 🔋 hybrid), nickname, make/model/year, fuel type badge, "Default" chip if default
2. Add/Edit vehicle modal form
3. Delete confirmation dialog
4. "Set as Default" button

Show all files completely.</p></td></tr></table><h2><strong>Step 12 — Landing Page &amp; Polish</strong></h2><table><tr><td><p><strong>🤖 AGENT PROMPT — STEP 12 — Public Landing Page, Auth Pages &amp; Final Polish</strong></p><p>In 'ecodrive-frontend', build the public-facing pages and apply final polish:

LANDING PAGE (src/pages/LandingPage.jsx):
1. Hero section: large headline "Drive Smarter. Live Greener. 🌿", subheadline about eco-driving, green CTA buttons "Get Started Free" and "See How It Works", animated eco score circle preview
2. Stats bar: "10,000+ Drivers" | "500,000 kg CO₂ Saved" | "2M km Tracked"
3. Features section (3-column grid): 📊 Smart Trip Tracking, 🏆 Gamified Experience, 🌱 Real Impact — each with icon, title, 2-line description
4. How it Works: numbered steps: Log Your Trip → Get Your Eco Score → Earn Badges → Beat the Leaderboard
5. Testimonials: 3 fake testimonials with green card styling and star ratings
6. Final CTA banner: dark green background, white text "Start your eco journey today"
7. Simple footer with logo and links

AUTH PAGES:
1. LoginPage (src/pages/LoginPage.jsx): clean centered card, eco green header, email + password fields, "Remember me" checkbox, "Forgot Password" link, submit button with loading state, link to register
2. RegisterPage (src/pages/RegisterPage.jsx): name, email, password, password_confirmation fields, country selector, terms checkbox, submit with loading state

FINAL POLISH — apply to entire app:
1. Add loading skeletons (Skeleton component) to all data-loading states
2. Add toast notifications (use a simple custom Toast context) for: trip logged, badge unlocked, profile saved, errors
3. Add 404 page with green styling and "Back to Dashboard" button
4. Make all pages mobile responsive: hamburger nav, stacked cards, scrollable tables
5. Add page title updates using useEffect + document.title
6. Add smooth page transitions using CSS opacity/translate on route change

Show all files completely.</p></td></tr></table><h2><strong>Step 13 — Deployment &amp; Docker</strong></h2><table><tr><td><p><strong>🤖 AGENT PROMPT — STEP 13 — Docker, Nginx, and Production Deployment</strong></p><p>Set up Docker-based production deployment for both the Laravel backend and React frontend:

DOCKER SETUP:
1. Create docker-compose.yml at project root with services:
   - backend: PHP-FPM 8.2, mounts ./ecodrive-backend, port 9000
   - frontend: Node 20 (build stage) → Nginx (serve stage), port 3000
   - nginx: Nginx proxy, port 80, routes /api/* to backend:9000, /* to frontend:3000
   - mysql: MySQL 8.0, database 'ecodrive', volume for persistence
   - redis: Redis 7 alpine, port 6379
   - queue-worker: same image as backend, runs php artisan queue:work --tries=3

2. Create ecodrive-backend/Dockerfile:
   - FROM php:8.2-fpm-alpine
   - Install extensions: pdo_mysql, mbstring, exif, pcntl, bcmath, redis, zip, gd
   - Install Composer
   - Copy source, run composer install --no-dev --optimize-autoloader
   - Set correct permissions on storage and bootstrap/cache

3. Create ecodrive-frontend/Dockerfile:
   - Stage 1: node:20-alpine, npm install, npm run build
   - Stage 2: nginx:alpine, copy dist from stage 1, copy nginx.conf

4. Create nginx/default.conf:
   - Route /api/* and /sanctum/* to php-fpm (backend)
   - Route everything else to React static files
   - Handle React Router: try_files $uri $uri/ /index.html

5. Create .env.production files for both projects with production values
6. Create a Makefile with targets: up, down, build, migrate, seed, logs
7. Write deployment instructions for Ubuntu 22.04 VPS

Show all files completely.</p></td></tr></table><h2><strong>Step 14 — Testing</strong></h2><table><tr><td><p><strong>🤖 AGENT PROMPT — STEP 14 — Backend Tests (Feature &amp; Unit)</strong></p><p>In 'ecodrive-backend', write comprehensive tests using PHPUnit and Laravel's testing helpers:

UNIT TESTS:
1. tests/Unit/EcoScoreServiceTest.php:
   - testHighwayDrivingScoresHigh: avg_speed=60, no harsh events, low idle → score &gt;= 80
   - testHarshDrivingScoresLow: 10 hard_braking, 8 hard_acceleration → score &lt;= 50
   - testElectricCarHasZeroCO2: fuel_type=electric → co2 = 0
   - testIdleTimeReducesScore: 10 min idle out of 15 min trip → score &lt; 60
   - testXPCalculation: score=85, distance=20 → xp between 30 and 100

2. tests/Unit/BadgeCheckTest.php:
   - testFirstTripBadgeAwarded: user with 1 trip should receive "First Trip" badge
   - testEcoChampionNotAwardedEarly: avg score 65 should NOT award "Eco Champion"

FEATURE TESTS:
3. tests/Feature/AuthTest.php:
   - testUserCanRegister: POST /api/v1/auth/register → 201 with token
   - testUserCanLogin: creates user, POST login → 200 with token
   - testInvalidCredentialsReturn422
   - testLogoutRevokesToken

4. tests/Feature/TripTest.php:
   - testAuthenticatedUserCanLogTrip: POST /api/v1/trips → 201, eco_score is set, user total_trips incremented
   - testTripBelongsToUser: cannot update another user's trip → 403
   - testTripListIsPaginated: 20 trips exist, GET /api/v1/trips → has pagination meta
   - testTripStatsAreCorrect

5. tests/Feature/LeaderboardTest.php:
   - testLeaderboardIsSortedByXP
   - testLeaderboardIsCached

Set up RefreshDatabase trait and factories for User, Vehicle, Trip, Badge.
Create factories: UserFactory (already exists, extend), VehicleFactory, TripFactory, BadgeFactory.
Show all test files completely.</p></td></tr></table><table><tr><td><p><strong>SECTION 11 — ENVIRONMENT &amp; DEPLOYMENT</strong></p></td></tr></table><h1><strong>11. Environment &amp; Deployment</strong></h1><h2><strong>11.1 Development Setup Checklist</strong></h2><ol><li>Install PHP 8.2+, Composer, Node.js 20+, MySQL 8.0, Redis 7</li><li>Create MySQL database: CREATE DATABASE ecodrive CHARACTER SET utf8mb4;</li><li>Clone backend: cd ecodrive-backend &amp;&amp; composer install &amp;&amp; cp .env.example .env &amp;&amp; php artisan key:generate</li><li>Run: php artisan migrate --seed</li><li>Start backend: php artisan serve (runs on :8000)</li><li>Start queue worker: php artisan queue:work</li><li>Clone frontend: cd ecodrive-frontend &amp;&amp; npm install &amp;&amp; cp .env.example .env</li><li>Set VITE_API_URL=http://localhost:8000 in .env</li><li>Start frontend: npm run dev (runs on :5173)</li><li>Visit http://localhost:5173 — you should see the landing page</li></ol><h2><strong>11.2 Production Checklist</strong></h2><ul><li>Set APP_ENV=production and APP_DEBUG=false</li><li>Run php artisan config:cache &amp;&amp; php artisan route:cache &amp;&amp; php artisan view:cache</li><li>Set SANCTUM_STATEFUL_DOMAINS to your production domain</li><li>Configure Mailgun or SES for transactional email</li><li>Set up S3 bucket for avatar/file storage</li><li>Configure Redis with password in production</li><li>Run npm run build in frontend, serve from Nginx</li><li>Set up SSL with Let's Encrypt (certbot)</li><li>Configure supervisor for queue workers</li><li>Set up daily cron: php artisan schedule:run</li></ul><table><tr><td><p><strong>SECTION 12 — TESTING STRATEGY</strong></p></td></tr></table><h1><strong>12. Testing Strategy</strong></h1><h2><strong>12.1 Backend Testing (PHPUnit)</strong></h2><table><thead><tr><th><p><strong>Test Type</strong></p></th><th><p><strong>Coverage Target</strong></p></th></tr></thead><tbody><tr><td><p>Unit Tests</p></td><td><p>EcoScoreService, AnalyticsService, Badge condition checks</p></td></tr><tr><td><p>Feature Tests</p></td><td><p>All API endpoints: auth, trips, vehicles, leaderboard, challenges</p></td></tr><tr><td><p>Policy Tests</p></td><td><p>Trip/Vehicle ownership enforcement</p></td></tr><tr><td><p>Job Tests</p></td><td><p>CheckBadgesJob awards correct badges</p></td></tr><tr><td><p>Notification Tests</p></td><td><p>BadgeUnlockedNotification sends mail + database</p></td></tr></tbody></table><h2><strong>12.2 Frontend Testing</strong></h2><table><thead><tr><th><p><strong>Test Type</strong></p></th><th><p><strong>Coverage Target</strong></p></th></tr></thead><tbody><tr><td><p>Unit Tests (Vitest)</p></td><td><p>ecoScore utility functions, formatters, store actions</p></td></tr><tr><td><p>Component Tests (RTL)</p></td><td><p>TripCard, EcoScoreBadge, LeaderboardRow renders</p></td></tr><tr><td><p>Integration Tests</p></td><td><p>NewTripPage form submission flow</p></td></tr><tr><td><p>E2E Tests (Playwright)</p></td><td><p>Register → Login → Log Trip → View Dashboard</p></td></tr></tbody></table><h2><strong>12.3 Running Tests</strong></h2><p># Backend</p><p>cd ecodrive-backend</p><p>php artisan test                    # Run all tests</p><p>php artisan test --filter AuthTest  # Run specific test class</p><p>php artisan test --coverage         # With coverage report</p><p># Frontend</p><p>cd ecodrive-frontend</p><p>npm run test          # Vitest unit tests</p><p>npm run test:e2e      # Playwright E2E tests</p><p><strong>🌿  EcoDrive — Build a Greener Future, One Drive at a Time  🌿</strong></p><p><em>This document contains everything needed to build EcoDrive from zero to production.</em></p>