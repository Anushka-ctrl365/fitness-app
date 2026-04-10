import React, { useEffect, useMemo, useState } from "react";

const defaultProfile = {
  gender: "",
  age: "",
  weight: "",
  height: "",
  targetWeight: "",
  goal: "",
  allergies: [],
  conditions: [],
  bmi: 0,
};

const naturalFoods = [
  { name: "Chicken Breast", emoji: "🍗", cal: 165, pro: 31, carb: 0, fat: 3.6, fiber: 0, sugar: 0, sodium: 74, vitC: 0, calcium: 15, iron: 0.9, allergens: [] },
  { name: "Brown Rice", emoji: "🍚", cal: 112, pro: 2.6, carb: 24, fat: 0.9, fiber: 1.8, sugar: 0, sodium: 5, vitC: 0, calcium: 10, iron: 0.4, allergens: [] },
  { name: "Banana", emoji: "🍌", cal: 89, pro: 1.1, carb: 23, fat: 0.3, fiber: 2.6, sugar: 12, sodium: 1, vitC: 8.7, calcium: 5, iron: 0.3, allergens: [] },
  { name: "Orange", emoji: "🍊", cal: 47, pro: 0.9, carb: 12, fat: 0.1, fiber: 2.4, sugar: 9, sodium: 0, vitC: 53, calcium: 40, iron: 0.1, allergens: [] },
  { name: "Spinach", emoji: "🥬", cal: 23, pro: 2.9, carb: 3.6, fat: 0.4, fiber: 2.2, sugar: 0.4, sodium: 79, vitC: 28, calcium: 99, iron: 2.7, allergens: [] },
  { name: "Paneer", emoji: "🧀", cal: 265, pro: 18, carb: 3, fat: 20, fiber: 0, sugar: 3, sodium: 300, vitC: 0, calcium: 480, iron: 0.4, allergens: ["dairy"] },
  { name: "Almonds", emoji: "🥜", cal: 579, pro: 21, carb: 22, fat: 50, fiber: 12, sugar: 4, sodium: 1, vitC: 0, calcium: 269, iron: 3.7, allergens: ["nuts"] },
  { name: "Eggs", emoji: "🥚", cal: 155, pro: 13, carb: 1.1, fat: 11, fiber: 0, sugar: 1, sodium: 124, vitC: 0, calcium: 56, iron: 1.8, allergens: ["eggs"] },
  { name: "Oats", emoji: "🥣", cal: 389, pro: 17, carb: 66, fat: 7, fiber: 11, sugar: 1, sodium: 2, vitC: 0, calcium: 54, iron: 4.7, allergens: ["gluten"] },
  { name: "Greek Yogurt", emoji: "🥛", cal: 59, pro: 10, carb: 3.6, fat: 0.4, fiber: 0, sugar: 3.6, sodium: 36, vitC: 0, calcium: 110, iron: 0.1, allergens: ["dairy"] },
  { name: "Lentils", emoji: "🫘", cal: 116, pro: 9, carb: 20, fat: 0.4, fiber: 8, sugar: 2, sodium: 2, vitC: 1.5, calcium: 19, iron: 3.3, allergens: [] },
  { name: "Apple", emoji: "🍎", cal: 52, pro: 0.3, carb: 14, fat: 0.2, fiber: 2.4, sugar: 10, sodium: 1, vitC: 4.6, calcium: 6, iron: 0.1, allergens: [] },
  { name: "Broccoli", emoji: "🥦", cal: 34, pro: 2.8, carb: 7, fat: 0.4, fiber: 2.6, sugar: 1.7, sodium: 33, vitC: 89, calcium: 47, iron: 0.7, allergens: [] },
  { name: "Tofu", emoji: "🟨", cal: 76, pro: 8, carb: 1.9, fat: 4.8, fiber: 0.3, sugar: 0.7, sodium: 7, vitC: 0.1, calcium: 350, iron: 5.4, allergens: ["soy"] },
  { name: "Bread (Whole Wheat)", emoji: "🍞", cal: 247, pro: 13, carb: 41, fat: 3.4, fiber: 7, sugar: 6, sodium: 400, vitC: 0, calcium: 107, iron: 2.5, allergens: ["gluten"] },
  { name: "Shrimp", emoji: "🦐", cal: 99, pro: 24, carb: 0.2, fat: 0.3, fiber: 0, sugar: 0, sodium: 148, vitC: 0, calcium: 70, iron: 0.5, allergens: ["shellfish"] },
];

const packagedFoods = [
  { name: "Lay's Classic Salted", category: "chips", emoji: "🥔", cal: 150, pro: 2, carb: 15, sugar: 0.5, fat: 9, fiber: 1, sodium: 170, vitC: 5, calcium: 4, iron: 0.4, allergens: ["dairy"], serving: "28g" },
  { name: "Pringles Original", category: "chips", emoji: "🥔", cal: 150, pro: 2, carb: 16, sugar: 0.5, fat: 9, fiber: 1, sodium: 150, vitC: 5, calcium: 0, iron: 0.5, allergens: [], serving: "28g" },
  { name: "Doritos Nacho Cheese", category: "chips", emoji: "🧀", cal: 140, pro: 2, carb: 18, sugar: 1, fat: 7, fiber: 1, sodium: 210, vitC: 0, calcium: 4, iron: 0.4, allergens: ["dairy", "gluten"], serving: "28g" },
  { name: "Kurkure Masala Munch", category: "chips", emoji: "🌶️", cal: 523, pro: 6, carb: 65, sugar: 3, fat: 27, fiber: 2, sodium: 890, vitC: 0, calcium: 20, iron: 1.2, allergens: ["dairy", "gluten"], serving: "100g" },
  { name: "Haldiram's Aloo Bhujia", category: "chips", emoji: "🌿", cal: 530, pro: 12, carb: 60, sugar: 2, fat: 28, fiber: 4, sodium: 780, vitC: 0, calcium: 42, iron: 2.8, allergens: [], serving: "100g" },
  { name: "Oreo Original", category: "biscuits", emoji: "🍪", cal: 480, pro: 5, carb: 72, sugar: 38, fat: 20, fiber: 2, sodium: 330, vitC: 0, calcium: 10, iron: 4.6, allergens: ["dairy", "gluten", "soy"], serving: "100g" },
  { name: "Parle-G Glucose", category: "biscuits", emoji: "🍪", cal: 450, pro: 7, carb: 72, sugar: 16, fat: 15, fiber: 1, sodium: 260, vitC: 0, calcium: 40, iron: 1.8, allergens: ["gluten"], serving: "100g" },
  { name: "Britannia Marie Gold", category: "biscuits", emoji: "🍪", cal: 420, pro: 8, carb: 70, sugar: 14, fat: 12, fiber: 1, sodium: 290, vitC: 0, calcium: 44, iron: 2, allergens: ["gluten", "dairy"], serving: "100g" },
  { name: "Bourbon Biscuits", category: "biscuits", emoji: "🍫", cal: 490, pro: 5, carb: 70, sugar: 28, fat: 22, fiber: 2, sodium: 300, vitC: 0, calcium: 8, iron: 3.5, allergens: ["gluten", "dairy"], serving: "100g" },
  { name: "Good Day Butter", category: "biscuits", emoji: "🧈", cal: 500, pro: 6, carb: 68, sugar: 20, fat: 23, fiber: 1, sodium: 320, vitC: 0, calcium: 20, iron: 1.6, allergens: ["gluten", "dairy"], serving: "100g" },
  { name: "Maggi 2-Minute Noodles", category: "noodles", emoji: "🍜", cal: 371, pro: 9, carb: 56, sugar: 2, fat: 14, fiber: 2, sodium: 1200, vitC: 0, calcium: 18, iron: 1, allergens: ["gluten"], serving: "70g pkg" },
  { name: "Top Ramen Chicken", category: "noodles", emoji: "🍜", cal: 380, pro: 8, carb: 58, sugar: 2, fat: 15, fiber: 2, sodium: 1350, vitC: 0, calcium: 14, iron: 0.9, allergens: ["gluten"], serving: "70g pkg" },
  { name: "Yippee Mood Masala", category: "noodles", emoji: "🌶️", cal: 355, pro: 10, carb: 55, sugar: 3, fat: 13, fiber: 2, sodium: 1100, vitC: 0, calcium: 20, iron: 1.2, allergens: ["gluten"], serving: "70g pkg" },
  { name: "Cadbury Dairy Milk", category: "chocolates", emoji: "🍫", cal: 535, pro: 7.5, carb: 59, sugar: 56, fat: 30, fiber: 1, sodium: 70, vitC: 0, calcium: 220, iron: 1.5, allergens: ["dairy", "soy"], serving: "100g" },
  { name: "KitKat 4-Finger", category: "chocolates", emoji: "🍫", cal: 518, pro: 6.5, carb: 61, sugar: 52, fat: 27, fiber: 1.5, sodium: 75, vitC: 0, calcium: 190, iron: 1.8, allergens: ["dairy", "gluten", "soy"], serving: "100g" },
  { name: "Amul Dark Chocolate 70%", category: "chocolates", emoji: "🍫", cal: 580, pro: 8, carb: 43, sugar: 28, fat: 42, fiber: 11, sodium: 10, vitC: 0, calcium: 50, iron: 11.7, allergens: ["dairy"], serving: "100g" },
  { name: "Coca-Cola Classic", category: "drinks", emoji: "🥤", cal: 140, pro: 0, carb: 39, sugar: 39, fat: 0, fiber: 0, sodium: 45, vitC: 0, calcium: 0, iron: 0.1, allergens: [], serving: "355ml can" },
  { name: "Pepsi Cola", category: "drinks", emoji: "🥤", cal: 150, pro: 0, carb: 41, sugar: 41, fat: 0, fiber: 0, sodium: 30, vitC: 0, calcium: 0, iron: 0.1, allergens: [], serving: "355ml can" },
  { name: "Red Bull Energy", category: "drinks", emoji: "🔴", cal: 110, pro: 1, carb: 28, sugar: 27, fat: 0, fiber: 0, sodium: 105, vitC: 80, calcium: 0, iron: 0, allergens: [], serving: "250ml can" },
  { name: "Tropicana Orange", category: "drinks", emoji: "🍊", cal: 110, pro: 1, carb: 26, sugar: 22, fat: 0, fiber: 0.5, sodium: 10, vitC: 72, calcium: 20, iron: 0.3, allergens: [], serving: "250ml" },
  { name: "Kellogg's Corn Flakes", category: "cereals", emoji: "🥣", cal: 357, pro: 7, carb: 84, sugar: 8, fat: 1, fiber: 3, sodium: 550, vitC: 0, calcium: 4, iron: 8.3, allergens: ["gluten"], serving: "100g" },
  { name: "Kellogg's Muesli", category: "cereals", emoji: "🥣", cal: 380, pro: 10, carb: 65, sugar: 18, fat: 8, fiber: 8, sodium: 40, vitC: 0, calcium: 44, iron: 4, allergens: ["gluten", "nuts"], serving: "100g" },
  { name: "Quaker Oats Instant", category: "cereals", emoji: "🌾", cal: 370, pro: 12, carb: 64, sugar: 1, fat: 7, fiber: 10, sodium: 230, vitC: 0, calcium: 52, iron: 3.8, allergens: ["gluten"], serving: "100g" },
];

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function todayKey(offset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split("T")[0];
}

function sumFoods(foods) {
  return foods.reduce((a, f) => ({
    cal: +(a.cal + (f.cal || 0)).toFixed(1),
    pro: +(a.pro + (f.pro || 0)).toFixed(1),
    carb: +(a.carb + (f.carb || 0)).toFixed(1),
    fat: +(a.fat + (f.fat || 0)).toFixed(1),
    fiber: +(a.fiber + (f.fiber || 0)).toFixed(1),
    sugar: +(a.sugar + (f.sugar || 0)).toFixed(1),
    sodium: +(a.sodium + (f.sodium || 0)).toFixed(1),
    vitC: +(a.vitC + (f.vitC || 0)).toFixed(1),
    calcium: +(a.calcium + (f.calcium || 0)).toFixed(1),
    iron: +(a.iron + (f.iron || 0)).toFixed(1),
  }), { cal: 0, pro: 0, carb: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0, vitC: 0, calcium: 0, iron: 0 });
}

function bmiCategory(bmi) {
  if (!bmi) return "-";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

function calcTargets(user) {
  const bmr = user.gender === "male"
    ? 10 * user.weight + 6.25 * user.height - 5 * user.age + 5
    : 10 * user.weight + 6.25 * user.height - 5 * user.age - 161;
  const tdee = Math.round(bmr * 1.55);
  const cal = Math.max(1200, ({ lose: tdee - 500, gain: tdee + 400, maintain: tdee, health: tdee }[user.goal] || tdee));
  return { cal, pro: Math.round(user.weight * (user.goal === "gain" ? 2 : 1.6)), carb: Math.round((cal * 0.45) / 4), fat: Math.round((cal * 0.3) / 9), fiber: 28, sugar: 50 };
}

function healthScore(food) {
  const score = 50 + (food.fiber || 0) * 3 + food.pro * 0.8 + (food.vitC || 0) * 0.4 + (food.calcium || 0) * 0.015 + (food.iron || 0) * 2 - food.sugar * 1.8 - (food.sodium || 0) * 0.04 - food.fat * 0.6;
  return Math.max(0, Math.min(100, Math.round(score)));
}

function safety(food, user) {
  for (const allergy of user.allergies || []) {
    if ((food.allergens || []).includes(allergy)) return { level: "red", reason: `Contains ${allergy}` };
  }
  if ((user.conditions || []).includes("diabetes")) {
    if (food.sugar > 20) return { level: "red", reason: "Very high sugar" };
    if (food.sugar > 10) return { level: "yellow", reason: "Moderate sugar" };
  }
  if ((user.conditions || []).includes("hypertension")) {
    if ((food.sodium || 0) > 700) return { level: "red", reason: "Very high sodium" };
    if ((food.sodium || 0) > 400) return { level: "yellow", reason: "Moderate sodium" };
  }
  if ((user.conditions || []).includes("heart") && food.fat > 20) return { level: "yellow", reason: "High fat" };
  if ((user.conditions || []).includes("obesity") && food.cal > 450) return { level: "yellow", reason: "High calorie" };
  const score = healthScore(food);
  if (score >= 58) return { level: "green", reason: "Healthy choice" };
  if (score >= 36) return { level: "yellow", reason: "Consume moderately" };
  return { level: "red", reason: "High in sugar/sodium/fat" };
}

function foodScore(food, user) {
  if (user.goal === "gain") return Math.max(0, food.pro * 2 - food.sugar * 0.3 + (food.fiber || 0) * 0.5);
  if (user.goal === "lose") return Math.max(0, food.pro - food.cal * 0.2 - food.sugar - food.fat * 0.4 + (food.fiber || 0));
  return Math.max(0, food.pro + (food.vitC || 0) * 0.4 + (food.fiber || 0) * 1.5 - food.sugar * 0.5);
}

export default function App() {
  const [screen, setScreen] = useState("auth");
  const [authTab, setAuthTab] = useState("login");
  const [login, setLogin] = useState({ username: "", password: "" });
  const [signup, setSignup] = useState({ username: "", password: "", confirm: "" });
  const [authError, setAuthError] = useState("");
  const [authOk, setAuthOk] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [profile, setProfile] = useState(defaultProfile);
  const [targets, setTargets] = useState({ cal: 0, pro: 0, carb: 0, fat: 0, fiber: 28, sugar: 50 });
  const [obStep, setObStep] = useState(1);
  const [obError, setObError] = useState("");
  const [view, setView] = useState("dashboard");
  const [dayOffset, setDayOffset] = useState(0);
  const [dayData, setDayData] = useState({ foods: [], water: 0 });
  const [explSearch, setExplSearch] = useState("");
  const [explFilters, setExplFilters] = useState({ cat: "all", safety: "all" });
  const [trackerSearch, setTrackerSearch] = useState("");
  const [analyticsTab, setAnalyticsTab] = useState("cal");
  const [profileOpen, setProfileOpen] = useState(false);

  const selectedDay = useMemo(() => todayKey(dayOffset), [dayOffset]);
  const totals = useMemo(() => sumFoods(dayData.foods || []), [dayData.foods]);
  const storageKey = (key) => `ntp_${currentUser}_${key}`;

  function saveUserData(key, value) {
    localStorage.setItem(storageKey(key), JSON.stringify(value));
  }

  useEffect(() => {
    const saved = localStorage.getItem("ntp_currentUser");
    if (!saved) return;
    const plan = readJson(`ntp_${saved}_plan`, null);
    setCurrentUser(saved);
    if (plan && plan.gender) {
      setProfile(plan);
      setTargets(readJson(`ntp_${saved}_targets`, calcTargets(plan)));
      setScreen("app");
    } else {
      setScreen("onboard");
    }
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    setDayData(readJson(`ntp_${currentUser}_day_${selectedDay}`, { foods: [], water: 0 }));
  }, [currentUser, selectedDay]);

  function doSignup() {
    const username = signup.username.trim();
    const users = readJson("ntp_users", {});
    setAuthError("");
    setAuthOk("");
    if (!username || username.length < 3) return setAuthError("Username must be at least 3 characters");
    if (!signup.password || signup.password.length < 6) return setAuthError("Password must be at least 6 characters");
    if (signup.password !== signup.confirm) return setAuthError("Passwords do not match");
    if (users[username]) return setAuthError("Username already taken");
    users[username] = { password: signup.password, createdAt: new Date().toISOString() };
    localStorage.setItem("ntp_users", JSON.stringify(users));
    setAuthOk("Account created! Please sign in.");
    setLogin({ username, password: "" });
    setSignup({ username: "", password: "", confirm: "" });
    setTimeout(() => {
      setAuthTab("login");
      setAuthOk("");
    }, 900);
  }

  function doLogin() {
    const username = login.username.trim();
    const users = readJson("ntp_users", {});
    setAuthError("");
    if (!username || !login.password) return setAuthError("Please fill in all fields");
    if (!users[username]) return setAuthError("Username not found");
    if (users[username].password !== login.password) return setAuthError("Incorrect password");
    localStorage.setItem("ntp_currentUser", username);
    setCurrentUser(username);
    const plan = readJson(`ntp_${username}_plan`, null);
    if (plan && plan.gender) {
      setProfile(plan);
      setTargets(readJson(`ntp_${username}_targets`, calcTargets(plan)));
      setScreen("app");
    } else {
      setProfile(defaultProfile);
      setObStep(1);
      setScreen("onboard");
    }
  }

  function doLogout() {
    if (!window.confirm("Sign out?")) return;
    localStorage.removeItem("ntp_currentUser");
    setCurrentUser("");
    setProfile(defaultProfile);
    setDayData({ foods: [], water: 0 });
    setScreen("auth");
  }

  function goOB(step) {
    setObError("");
    if (step === 2 && !profile.gender) return setObError("Please select your gender");
    if (step === 3) {
      const age = Number(profile.age);
      const weight = Number(profile.weight);
      const height = Number(profile.height);
      const targetWeight = Number(profile.targetWeight || profile.weight);
      if (!age || age < 10 || age > 100 || !weight || weight < 30 || weight > 300 || !height || height < 100 || height > 250) {
        return setObError("Please enter valid values");
      }
      setProfile((p) => ({ ...p, age, weight, height, targetWeight: targetWeight >= 30 && targetWeight <= 300 ? targetWeight : weight }));
    }
    if (step === 5 && !profile.goal) return setObError("Please select a goal");
    setObStep(step);
  }

  const bmi = useMemo(() => {
    if (!profile.weight || !profile.height) return 0;
    return +(Number(profile.weight) / (Number(profile.height) / 100) ** 2).toFixed(1);
  }, [profile.weight, profile.height]);

  function finishOnboard() {
    const nextProfile = { ...profile, bmi };
    const nextTargets = calcTargets(nextProfile);
    setProfile(nextProfile);
    setTargets(nextTargets);
    saveUserData("plan", nextProfile);
    saveUserData("targets", nextTargets);
    setView("dashboard");
    setScreen("app");
  }

  function saveDay(next) {
    setDayData(next);
    saveUserData(`day_${selectedDay}`, next);
  }

  function setWater(count) {
    saveDay({ ...dayData, water: count });
  }

  function addFood(food) {
    const clean = { ...food };
    delete clean.score;
    delete clean.safe;
    saveDay({ ...dayData, foods: [...(dayData.foods || []), clean] });
    setTrackerSearch("");
  }

  function removeFood(index) {
    saveDay({ ...dayData, foods: (dayData.foods || []).filter((_, i) => i !== index) });
  }

  const explorerFoods = useMemo(() => {
    const query = explSearch.toLowerCase().trim();
    return packagedFoods
      .filter((food) => explFilters.cat === "all" || food.category === explFilters.cat)
      .filter((food) => !query || food.name.toLowerCase().includes(query) || food.category.toLowerCase().includes(query))
      .map((food) => ({ ...food, safe: safety(food, profile), score: healthScore(food) }))
      .filter((food) => explFilters.safety === "all" || food.safe.level === explFilters.safety)
      .sort((a, b) => b.score - a.score);
  }, [explSearch, explFilters, profile]);

  const trackerResults = useMemo(() => {
    const query = trackerSearch.toLowerCase().trim();
    if (!query) return [];
    return naturalFoods
      .filter((food) => food.name.toLowerCase().includes(query))
      .map((food) => ({ ...food, safe: safety(food, profile), score: foodScore(food, profile) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [trackerSearch, profile]);

  const last7Days = currentUser
    ? Array.from({ length: 7 }, (_, index) => {
      const offset = index - 6;
      const key = todayKey(offset);
      const data = readJson(`ntp_${currentUser}_day_${key}`, { foods: [], water: 0 });
      const date = new Date();
      date.setDate(date.getDate() + offset);
      return { label: date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric" }), data, totals: sumFoods(data.foods || []) };
    })
    : [];

  const title = { dashboard: "Dashboard", explorer: "Food Explorer", tracker: "Daily Tracker", analytics: "Analytics" }[view];

  return (
    <>
      <style>{styles}</style>
      {screen === "auth" && <Auth authTab={authTab} setAuthTab={setAuthTab} login={login} setLogin={setLogin} signup={signup} setSignup={setSignup} authError={authError} authOk={authOk} clear={() => { setAuthError(""); setAuthOk(""); }} doSignup={doSignup} doLogin={doLogin} />}
      {screen === "onboard" && <Onboarding profile={profile} setProfile={setProfile} step={obStep} setStep={goOB} error={obError} bmi={bmi} finish={finishOnboard} />}
      {screen === "app" && (
        <div className="app-screen">
          <aside className="sidebar">
            <div className="sb-brand"><div className="brand-icon">🏃</div><strong>NutriTrack <span>Pro</span></strong></div>
            <button className="sb-user" onClick={() => setProfileOpen(true)}><div className="avatar">{currentUser[0]?.toUpperCase() || "U"}</div><div><strong>{currentUser}</strong><small>{goalLabel(profile.goal)}</small></div></button>
            <nav>
              <div className="nav-label">Main</div>
              {[
                ["dashboard", "📊", "Dashboard"],
                ["explorer", "🔍", "Food Explorer"],
                ["tracker", "📋", "Daily Tracker"],
                ["analytics", "📈", "Analytics"],
              ].map(([id, icon, label]) => <button key={id} className={`nav-btn ${view === id ? "active" : ""}`} onClick={() => setView(id)}><span>{icon}</span>{label}</button>)}
            </nav>
            <button className="logout" onClick={doLogout}>🚪 Sign Out</button>
          </aside>
          <main className="main">
            <header className="topbar"><h1>{title}</h1><span>{new Date().toLocaleDateString("en-IN", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}</span></header>
            <div className="content">
              {view === "dashboard" && <Dashboard profile={profile} targets={targets} data={dayData} totals={totals} setWater={setWater} />}
              {view === "explorer" && <Explorer foods={explorerFoods} search={explSearch} setSearch={setExplSearch} filters={explFilters} setFilters={setExplFilters} />}
              {view === "tracker" && <Tracker selectedDay={selectedDay} dayOffset={dayOffset} setDayOffset={setDayOffset} data={dayData} totals={totals} targets={targets} search={trackerSearch} setSearch={setTrackerSearch} results={trackerResults} addFood={addFood} removeFood={removeFood} setWater={setWater} />}
              {view === "analytics" && <Analytics days={last7Days} tab={analyticsTab} setTab={setAnalyticsTab} />}
            </div>
          </main>
          {profileOpen && <ProfileModal user={currentUser} profile={profile} close={() => setProfileOpen(false)} resetPlan={() => { if (window.confirm("This will reset your plan and sign you out. Continue?")) { localStorage.removeItem(storageKey("plan")); localStorage.removeItem(storageKey("targets")); setProfileOpen(false); doLogout(); } }} />}
        </div>
      )}
    </>
  );
}

function Auth({ authTab, setAuthTab, login, setLogin, signup, setSignup, authError, authOk, clear, doSignup, doLogin }) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand"><div className="brand-icon">🏃</div><strong>NutriTrack <span>Pro</span></strong></div>
        <h2>Welcome back</h2>
        <p>Your smart nutrition & fitness companion</p>
        <div className="tabs">
          <button className={authTab === "login" ? "active" : ""} onClick={() => { setAuthTab("login"); clear(); }}>Sign In</button>
          <button className={authTab === "signup" ? "active" : ""} onClick={() => { setAuthTab("signup"); clear(); }}>Create Account</button>
        </div>
        {authTab === "login" ? (
          <>
            <Field label="Username" value={login.username} onChange={(v) => setLogin({ ...login, username: v })} placeholder="Enter username" />
            <Field label="Password" type="password" value={login.password} onChange={(v) => setLogin({ ...login, password: v })} placeholder="Enter password" />
            {authError && <div className="msg error">{authError}</div>}
            <button className="primary full" onClick={doLogin}>Sign In →</button>
          </>
        ) : (
          <>
            <Field label="Username" value={signup.username} onChange={(v) => setSignup({ ...signup, username: v })} placeholder="Choose username" />
            <Field label="Password" type="password" value={signup.password} onChange={(v) => setSignup({ ...signup, password: v })} placeholder="Create password (min 6 chars)" />
            <Field label="Confirm Password" type="password" value={signup.confirm} onChange={(v) => setSignup({ ...signup, confirm: v })} placeholder="Confirm password" />
            {authError && <div className="msg error">{authError}</div>}
            {authOk && <div className="msg ok">{authOk}</div>}
            <button className="primary full" onClick={doSignup}>Create Account →</button>
          </>
        )}
        <div className="note">New users must create an account first. Existing users can sign in with their saved username and password.</div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return <label className="field"><span>{label}</span><input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} /></label>;
}

function Onboarding({ profile, setProfile, step, setStep, error, bmi, finish }) {
  const steps = ["Personal Info", "Body Stats", "Health Profile", "Your Goal", "BMI & Results", "Nutrition Plan"];
  const targets = profile.goal && profile.weight && profile.height && profile.age ? calcTargets({ ...profile, bmi }) : { cal: 0, pro: 0, carb: 0, fat: 0, fiber: 28, sugar: 50 };
  const bmiInfo = getBmiInfo(bmi);
  const toggleList = (key, value) => setProfile({ ...profile, [key]: profile[key].includes(value) ? profile[key].filter((x) => x !== value) : [...profile[key], value] });

  return (
    <div className="onboard-page">
      <aside className="ob-side">
        <h2>🏃 NutriTrack Pro</h2>
        {steps.map((label, index) => <div key={label} className={`ob-step ${step === index + 1 ? "active" : ""} ${step > index + 1 ? "done" : ""}`}><b>{index + 1}</b>{label}</div>)}
      </aside>
      <main className="ob-main">
        {step === 1 && <Panel title="Let's build your profile" sub="This helps us personalize your nutrition and fitness plan.">
          <div className="option-grid">{[["male", "🧔", "Male"], ["female", "👩", "Female"]].map(([id, icon, label]) => <button key={id} className={`option ${profile.gender === id ? "selected" : ""}`} onClick={() => setProfile({ ...profile, gender: id })}><span>{icon}</span><strong>{label}</strong></button>)}</div>
          {error && <div className="msg error">{error}</div>}<button className="primary" onClick={() => setStep(2)}>Continue →</button>
        </Panel>}
        {step === 2 && <Panel title="Your body stats" sub="We use these to calculate your BMI and calorie needs.">
          <div className="form-grid">
            <Field label="Age (years)" type="number" value={profile.age} onChange={(v) => setProfile({ ...profile, age: v })} placeholder="e.g. 25" />
            <Field label="Weight (kg)" type="number" value={profile.weight} onChange={(v) => setProfile({ ...profile, weight: v })} placeholder="e.g. 70" />
            <Field label="Height (cm)" type="number" value={profile.height} onChange={(v) => setProfile({ ...profile, height: v })} placeholder="e.g. 170" />
            <Field label="Target Weight (kg)" type="number" value={profile.targetWeight} onChange={(v) => setProfile({ ...profile, targetWeight: v })} placeholder="e.g. 65" />
          </div>
          {error && <div className="msg error">{error}</div>}<div className="row"><button className="secondary" onClick={() => setStep(1)}>← Back</button><button className="primary" onClick={() => setStep(3)}>Continue →</button></div>
        </Panel>}
        {step === 3 && <Panel title="Health profile" sub="Helps us flag foods to avoid and tailor recommendations for you.">
          <Pills label="Allergies / Dietary Restrictions" values={["nuts", "dairy", "gluten", "soy", "eggs", "shellfish"]} selected={profile.allergies} toggle={(v) => toggleList("allergies", v)} />
          <Pills label="Health Conditions (optional)" values={["diabetes", "hypertension", "obesity", "heart", "thyroid"]} selected={profile.conditions} toggle={(v) => toggleList("conditions", v)} />
          <div className="row"><button className="secondary" onClick={() => setStep(2)}>← Back</button><button className="primary" onClick={() => setStep(4)}>Continue →</button></div>
        </Panel>}
        {step === 4 && <Panel title="What's your goal?" sub="We'll build your calorie and macro targets around this.">
          <div className="option-grid">{[["lose", "🔥", "Lose Weight", "Calorie deficit plan"], ["gain", "💪", "Build Muscle", "High protein plan"], ["maintain", "⚖️", "Maintain", "Balanced intake"], ["health", "🌿", "General Health", "Wholesome nutrition"]].map(([id, icon, title, sub]) => <button key={id} className={`option ${profile.goal === id ? "selected" : ""}`} onClick={() => setProfile({ ...profile, goal: id })}><span>{icon}</span><strong>{title}</strong><small>{sub}</small></button>)}</div>
          {error && <div className="msg error">{error}</div>}<div className="row"><button className="secondary" onClick={() => setStep(3)}>← Back</button><button className="primary" onClick={() => setStep(5)}>Continue →</button></div>
        </Panel>}
        {step === 5 && <Panel title="Your BMI" sub="Based on your height and weight">
          <div className="bmi-card"><strong style={{ color: bmiInfo.color }}>{bmi || "-"}</strong><h3>{bmiInfo.cat}</h3><p>{bmiInfo.tip}</p></div>
          <div className="row"><button className="secondary" onClick={() => setStep(4)}>← Back</button><button className="primary" onClick={() => setStep(6)}>See My Plan →</button></div>
        </Panel>}
        {step === 6 && <Panel title="Your Nutrition Plan" sub="Personalized daily targets based on your profile and goal">
          <div className="target-grid">{[["Daily Calories", targets.cal, "kcal"], ["Protein", targets.pro, "g/day"], ["Carbs", targets.carb, "g/day"], ["Fat", targets.fat, "g/day"], ["Fiber", targets.fiber, "g/day"], ["Sugar Limit", targets.sugar, "g/day"]].map(([l, v, u]) => <div key={l} className="target"><small>{l}</small><strong>{v}</strong><span>{u}</span></div>)}</div>
          <div className="tip">💡 Use the Daily Tracker to log your meals. The Food Explorer shows safety ratings based on your health profile.</div>
          <button className="primary full" onClick={finish}>Start Tracking 🚀</button>
        </Panel>}
      </main>
    </div>
  );
}

function Panel({ title, sub, children }) {
  return <section className="panel"><h2>{title}</h2><p>{sub}</p>{children}</section>;
}

function Pills({ label, values, selected, toggle }) {
  const icons = { nuts: "🥜", dairy: "🥛", gluten: "🌾", soy: "🫘", eggs: "🥚", shellfish: "🦐", diabetes: "🩸", hypertension: "💊", obesity: "⚖️", heart: "❤️", thyroid: "🔬" };
  return <div className="pill-block"><strong>{label}</strong><div className="pill-row">{values.map((v) => <button key={v} className={selected.includes(v) ? "pill selected" : "pill"} onClick={() => toggle(v)}>{icons[v]} {v}</button>)}</div></div>;
}

function Dashboard({ profile, targets, data, totals, setWater }) {
  const tip = getTip(totals, targets, data.water || 0);
  return (
    <>
      <div className="stats-grid">
        <Stat icon="📏" label="BMI" value={profile.bmi || "-"} sub={bmiCategory(profile.bmi)} />
        <Stat icon="🔥" label="Daily Target" value={targets.cal || "-"} sub="kcal / day" />
        <Stat icon="💪" label="Protein Target" value={targets.pro ? `${targets.pro}g` : "-"} sub="grams / day" />
        <Stat icon="💧" label="Water Today" value={data.water || 0} sub="of 8 glasses" />
      </div>
      <div className="two-grid">
        <Card title="Calories & Macros Today">
          <div className="ring-layout"><Ring value={totals.cal} pct={targets.cal ? totals.cal / targets.cal : 0} /><div>{macroRows(totals, targets).slice(0, 4).map((m) => <Macro key={m.label} {...m} />)}</div></div>
        </Card>
        <Water value={data.water || 0} setWater={setWater} />
      </div>
      <div className="two-grid">
        <Card title="Today's Summary"><div className="summary-grid">{[["Calories", totals.cal, "kcal"], ["Protein", totals.pro, "g"], ["Sugar", totals.sugar, "g"], ["Sodium", totals.sodium, "mg"]].map(([l, v, u]) => <div className="summary" key={l}><span>{l}</span><strong>{v}<small>{u}</small></strong></div>)}</div></Card>
        <Card title="Recent Foods">{(data.foods || []).length ? data.foods.slice(-4).reverse().map((f, i) => <div className="recent" key={`${f.name}-${i}`}><span>{f.emoji} {f.name}</span><b>{f.cal} kcal</b></div>) : <Empty text="No foods logged today" />}</Card>
      </div>
      <div className="tip-bar"><b>💡 Today's Tip</b><span>{tip}</span></div>
    </>
  );
}

function Stat({ icon, label, value, sub }) {
  return <div className="stat"><div className="stat-icon">{icon}</div><span>{label}</span><strong>{value}</strong><small>{sub}</small></div>;
}

function Card({ title, children }) {
  return <section className="card"><h3>{title}</h3>{children}</section>;
}

function Ring({ value, pct }) {
  const safePct = Math.min(Math.max(pct || 0, 0), 1);
  const circumference = 326.7;
  const color = safePct >= 1 ? "#EF4444" : safePct >= 0.8 ? "#F59E0B" : "#2563EB";
  return (
    <div className="ring">
      <svg width="120" height="120"><circle cx="60" cy="60" r="52" fill="none" stroke="#E8EEF6" strokeWidth="10" /><circle cx="60" cy="60" r="52" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference - circumference * safePct} transform="rotate(-90 60 60)" /></svg>
      <div><strong>{Math.round(value)}</strong><span>kcal</span></div>
    </div>
  );
}

function Macro({ label, value, target, color }) {
  return <div className="macro"><div><span>{label}</span><b>{value}g / {target}g</b></div><div className="bar"><i style={{ width: `${target ? Math.min((value / target) * 100, 100) : 0}%`, background: color }} /></div></div>;
}

function Water({ value, setWater }) {
  return <Card title="Water Intake"><div className="water-count"><strong>{value}</strong> / 8 glasses</div><div className="water-row">{Array.from({ length: 8 }, (_, i) => <button key={i} className={i < value ? "water-btn filled" : "water-btn"} onClick={() => setWater(i < value ? i : i + 1)}>💧</button>)}</div><div className="bar"><i style={{ width: `${(value / 8) * 100}%`, background: "#0EA5E9" }} /></div></Card>;
}

function Explorer({ foods, search, setSearch, filters, setFilters }) {
  const cats = [["all", "All"], ["chips", "🥔 Chips"], ["biscuits", "🍪 Biscuits"], ["noodles", "🍜 Noodles"], ["chocolates", "🍫 Chocolates"], ["drinks", "🥤 Drinks"], ["cereals", "🥣 Cereals"]];
  const safeties = [["all", "All"], ["green", "🟢 Safe"], ["yellow", "🟡 Moderate"], ["red", "🔴 Avoid"]];
  return (
    <>
      <div className="search"><span>🔍</span><input value={search} placeholder="Search packaged foods, chips, chocolates..." onChange={(e) => setSearch(e.target.value)} /></div>
      <Filter label="Category:" items={cats} value={filters.cat} setValue={(cat) => setFilters({ ...filters, cat })} />
      <Filter label="Safety:" items={safeties} value={filters.safety} setValue={(safety) => setFilters({ ...filters, safety })} />
      <p className="muted">Showing {foods.length} food{foods.length !== 1 ? "s" : ""}</p>
      <div className="food-grid">{foods.length ? foods.map((f) => <FoodCard key={f.name} food={f} />) : <Empty text="No foods found. Try adjusting your filters or search term." />}</div>
    </>
  );
}

function Filter({ label, items, value, setValue }) {
  return <div className="filters"><b>{label}</b>{items.map(([id, text]) => <button key={id} className={value === id ? "filter active" : "filter"} onClick={() => setValue(id)}>{text}</button>)}</div>;
}

function FoodCard({ food }) {
  const color = food.score >= 58 ? "#22C55E" : food.score >= 36 ? "#F59E0B" : "#EF4444";
  return (
    <article className="food-card">
      <span className={`badge ${food.safe.level}`}>{({ green: "✓ Safe", yellow: "⚠ Moderate", red: "✕ Avoid" })[food.safe.level]}</span>
      <div className="food-emoji">{food.emoji}</div><h3>{food.name}</h3><p>{food.category} · Per {food.serving}</p>
      <div className="food-stats"><div><b>{food.cal}</b><span>kcal</span></div><div><b>{food.pro}g</b><span>protein</span></div><div><b>{food.sodium}</b><span>sodium mg</span></div></div>
      {[
        ["Carbs", food.carb, 100, "#F59E0B", "g"], ["Sugar", food.sugar, 80, "#EF4444", "g"], ["Fat", food.fat, 70, "#F97316", "g"], ["Fiber", food.fiber, 20, "#22C55E", "g"],
        ["Sodium", food.sodium, 2000, "#EF4444", "mg"], ["Vit C", food.vitC, 100, "#F59E0B", "mg"], ["Calcium", food.calcium, 500, "#3B82F6", "mg"], ["Iron", food.iron, 15, "#8B5CF6", "mg"],
      ].map(([l, v, t, c, u]) => <div className="nut" key={l}><div><span>{l}</span><b>{v}{u}</b></div><div className="bar"><i style={{ width: `${Math.min((v / t) * 100, 100)}%`, background: c }} /></div></div>)}
      {!!food.allergens.length && <div className="allergens">{food.allergens.map((a) => <span key={a}>⚠ {a}</span>)}</div>}
      <div className="reason">{food.safe.reason}</div><div className="score"><span>Health Score</span><b style={{ color }}>{food.score}/100</b></div><div className="bar"><i style={{ width: `${food.score}%`, background: color }} /></div>
    </article>
  );
}

function Tracker({ selectedDay, dayOffset, setDayOffset, data, totals, targets, search, setSearch, results, addFood, removeFood, setWater }) {
  const date = new Date(`${selectedDay}T00:00:00`);
  const relative = dayOffset === 0 ? "Today" : dayOffset === -1 ? "Yesterday" : `${Math.abs(dayOffset)} days ago`;
  const suggestions = [];
  if (totals.pro < targets.pro * 0.5) suggestions.push("Your protein is very low today. Add chicken, eggs, or lentils.");
  else if (totals.pro >= targets.pro) suggestions.push("Great protein intake! You're hitting your protein goal.");
  if (totals.cal > targets.cal) suggestions.push("Calorie target exceeded. Try lighter options for the next meal.");
  else if (totals.cal < targets.cal * 0.3) suggestions.push("You've only eaten a small portion of your daily needs. Don't skip meals!");
  if (totals.sugar > targets.sugar) suggestions.push("Sugar intake is high. Avoid sweets and packaged drinks for the rest of the day.");
  if (totals.fiber < 15) suggestions.push("Low fiber today. Add vegetables, fruits, or oats.");

  return (
    <div className="tracker-grid">
      <div>
        <div className="datebar"><button onClick={() => setDayOffset(dayOffset - 1)}>‹</button><div><strong>{date.toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })}</strong><small>{relative}</small></div><button disabled={dayOffset >= 0} onClick={() => setDayOffset(Math.min(0, dayOffset + 1))}>›</button></div>
        <Card title="Add Food to Log">
          <div className="search tracker-search"><span>🔍</span><input value={search} placeholder="Search foods..." onChange={(e) => setSearch(e.target.value)} /><button className="secondary">Search</button></div>
          {search && <div className="dropdown">{results.length ? results.map((food) => <div className="drop-item" key={food.name}><div><strong>{food.emoji} {food.name}</strong><small>{food.cal} kcal · {food.pro}g pro · {food.carb}g carb · {food.safe.reason}</small></div><button onClick={() => addFood(food)}>+ Add</button></div>) : <Empty text="No foods found" />}</div>}
        </Card>
        <Card title="Today's Food Log">{(data.foods || []).length ? data.foods.map((food, index) => <div className="log-row" key={`${food.name}-${index}`}><div><strong>{food.emoji} {food.name}</strong><small>{food.cal} kcal · {food.pro}g pro · {food.carb}g carb · {food.fat}g fat</small></div><button onClick={() => removeFood(index)}>✕</button></div>) : <Empty text="No foods logged. Search above to add foods." />}</Card>
      </div>
      <div>
        <Card title="Calorie Progress"><div className="progress-row"><Ring value={totals.cal} pct={targets.cal ? totals.cal / targets.cal : 0} /><div><span className="muted">Target</span><h2>{targets.cal} kcal</h2><p className={targets.cal - totals.cal >= 0 ? "green-text" : "red-text"}>{targets.cal - totals.cal >= 0 ? `↓ ${Math.round(targets.cal - totals.cal)} kcal remaining` : `↑ ${Math.round(Math.abs(targets.cal - totals.cal))} kcal over target`}</p></div></div></Card>
        <Card title="Macronutrients">{macroRows(totals, targets).map((m) => <Macro key={m.label} {...m} />)}</Card>
        <Water value={data.water || 0} setWater={setWater} />
        <Card title="Suggestion"><div className="suggestions">{suggestions.length ? suggestions.map((s) => <p key={s}>💡 {s}</p>) : <span className="muted">Log some foods to get personalized suggestions.</span>}</div></Card>
      </div>
    </div>
  );
}

function Analytics({ days, tab, setTab }) {
  const labels = days.map((d) => d.label);
  const values = {
    cal: days.map((d) => d.totals.cal),
    pro: days.map((d) => d.totals.pro),
    carb: days.map((d) => d.totals.carb),
    fat: days.map((d) => d.totals.fat),
    water: days.map((d) => d.data.water || 0),
    vitC: days.map((d) => d.totals.vitC),
    iron: days.map((d) => d.totals.iron),
    calcium: days.map((d) => d.totals.calcium),
  };
  return (
    <div>
      <div className="analytics-tabs">{[["cal", "Calories"], ["pro", "Protein"], ["macros", "Macros"], ["micro", "Micronutrients"], ["water", "Water"]].map(([id, label]) => <button key={id} className={tab === id ? "active" : ""} onClick={() => setTab(id)}>{label}</button>)}</div>
      {tab === "cal" && <Chart title="Calorie Intake - Last 7 Days" labels={labels} series={[{ label: "Calories", values: values.cal, color: "#2563EB" }]} />}
      {tab === "pro" && <Chart title="Protein Intake - Last 7 Days" labels={labels} series={[{ label: "Protein", values: values.pro, color: "#22C55E" }]} />}
      {tab === "macros" && <Chart title="Macronutrient Distribution - Last 7 Days" labels={labels} series={[{ label: "Carbs", values: values.carb, color: "#F59E0B" }, { label: "Protein", values: values.pro, color: "#22C55E" }, { label: "Fat", values: values.fat, color: "#EF4444" }]} />}
      {tab === "micro" && <div className="two-grid"><Chart title="Vitamin C (mg)" labels={labels} series={[{ label: "Vitamin C", values: values.vitC, color: "#F59E0B" }]} /><Chart title="Iron (mg)" labels={labels} series={[{ label: "Iron", values: values.iron, color: "#8B5CF6" }]} /><Chart title="Calcium (mg)" labels={labels} series={[{ label: "Calcium", values: values.calcium, color: "#0EA5E9" }]} /></div>}
      {tab === "water" && <Chart title="Water Intake - Last 7 Days" labels={labels} series={[{ label: "Water", values: values.water, color: "#0EA5E9" }]} />}
    </div>
  );
}

function Chart({ title, labels, series }) {
  const max = Math.max(1, ...series.flatMap((s) => s.values));
  return <Card title={title}><div className="chart">{labels.map((label, i) => <div className="chart-col" key={label}><div>{series.map((s) => <i key={s.label} title={`${s.label}: ${s.values[i]}`} style={{ height: `${Math.max((s.values[i] / max) * 100, 3)}%`, background: s.color }} />)}</div><span>{label}</span></div>)}</div></Card>;
}

function ProfileModal({ user, profile, close, resetPlan }) {
  return (
    <div className="modal" onClick={(e) => e.target.className === "modal" && close()}>
      <div className="modal-box">
        <button className="modal-close" onClick={close}>✕</button>
        <div className="avatar big">{user[0]?.toUpperCase() || "U"}</div><h2>{user}</h2><p>{goalLabel(profile.goal)}</p>
        <Card title="Body Stats"><div className="profile-grid">{[["Age", `${profile.age} yrs`], ["Weight", `${profile.weight} kg`], ["Height", `${profile.height} cm`], ["Target", `${profile.targetWeight} kg`], ["BMI", profile.bmi || "-"], ["BMI Category", bmiCategory(profile.bmi)]].map(([l, v]) => <div key={l}><span>{l}</span><b>{v}</b></div>)}</div></Card>
        <Card title="Allergies"><p>{profile.allergies?.length ? profile.allergies.join(", ") : "None"}</p></Card>
        <Card title="Health Conditions"><p>{profile.conditions?.length ? profile.conditions.join(", ") : "None"}</p></Card>
        <button className="secondary full" onClick={resetPlan}>Reset Plan & Logout</button>
      </div>
    </div>
  );
}

function Empty({ text }) {
  return <div className="empty">🍽️<p>{text}</p></div>;
}

function macroRows(totals, targets) {
  return [
    { label: "Protein", value: totals.pro, target: targets.pro, color: "#22C55E" },
    { label: "Carbs", value: totals.carb, target: targets.carb, color: "#F59E0B" },
    { label: "Fat", value: totals.fat, target: targets.fat, color: "#EF4444" },
    { label: "Fiber", value: totals.fiber, target: targets.fiber, color: "#8B5CF6" },
    { label: "Sugar", value: totals.sugar, target: targets.sugar, color: "#EC4899" },
  ];
}

function getTip(totals, targets, water) {
  if (totals.cal < targets.cal * 0.5) return "You've eaten less than half your daily calories. Try adding a protein-rich snack.";
  if (totals.cal > targets.cal) return "You've exceeded today's calorie target. Consider a light dinner with vegetables.";
  if (totals.pro < targets.pro * 0.6) return "Protein intake is low. Include eggs, chicken, or lentils in your next meal.";
  if (water < 5) return "Remember to stay hydrated. Aim for at least 8 glasses of water today.";
  if (totals.fiber < 15) return "Add more fiber with vegetables, fruits, or whole grains for better digestion.";
  if (totals.sugar > targets.sugar) return "Sugar intake is above target. Avoid packaged sweets and sugary drinks.";
  return "Great job tracking! Keep maintaining a balanced diet with varied whole foods.";
}

function goalLabel(goal) {
  return { lose: "Weight Loss", gain: "Muscle Gain", maintain: "Maintenance", health: "General Health" }[goal] || "-";
}

function getBmiInfo(bmi) {
  if (!bmi) return { cat: "-", tip: "-", color: "#2563EB" };
  if (bmi < 18.5) return { cat: "Underweight", tip: "Consider increasing calorie intake with nutrient-rich foods.", color: "#F59E0B" };
  if (bmi < 25) return { cat: "Normal Weight", tip: "Great BMI! Maintain with balanced nutrition.", color: "#22C55E" };
  if (bmi < 30) return { cat: "Overweight", tip: "A moderate deficit with exercise can help reach healthy weight.", color: "#F97316" };
  return { cat: "Obese", tip: "Consult a healthcare professional for a personalized plan.", color: "#EF4444" };
}

const styles = `
*{box-sizing:border-box}body{margin:0;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#0f172a;background:#f5f7fb}button,input{font:inherit}button{cursor:pointer}h1,h2,h3,p{margin-top:0}.auth-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:28px;background:linear-gradient(rgba(255,255,255,.55) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.55) 1px,transparent 1px),linear-gradient(135deg,#e9f7f2 0%,#eef6ff 48%,#fff3ea 100%);background-size:42px 42px,42px 42px,cover}.auth-card,.panel,.card,.food-card,.modal-box{background:rgba(255,255,255,.96);border:1px solid #dbe4ee;border-radius:8px;box-shadow:0 18px 44px rgba(15,23,42,.08)}.auth-card{width:100%;max-width:560px;padding:46px;position:relative;overflow:hidden}.auth-card:before{content:"";position:absolute;left:0;right:0;top:0;height:6px;background:linear-gradient(90deg,#0f766e,#2563eb,#f97316)}.auth-brand,.sb-brand{display:flex;align-items:center;gap:12px}.auth-brand{margin-bottom:26px}.brand-icon{width:46px;height:46px;border-radius:8px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0f766e,#2563eb);color:white}.auth-brand strong{font-size:28px}.auth-brand span,.sb-brand span{color:#0f766e}.auth-card h2{font-size:38px;line-height:1.08;margin-bottom:8px}.auth-card p,.panel>p{color:#64748b}.tabs{display:flex;background:#eef2f7;border:1px solid #e2e8f0;border-radius:8px;padding:6px;margin:24px 0}.tabs button{flex:1;border:0;background:transparent;border-radius:6px;padding:12px;font-weight:800;color:#64748b}.tabs button.active{background:#0f172a;color:white}.field{display:block;margin-bottom:14px}.field span{display:block;font-size:12px;text-transform:uppercase;letter-spacing:.08em;font-weight:900;color:#475569;margin-bottom:7px}.field input,.search input{width:100%;border:1.5px solid #dbe4ee;border-radius:8px;padding:14px 15px;outline:none;background:#fbfdff}.field input:focus,.search input:focus{border-color:#2563eb;box-shadow:0 0 0 4px rgba(37,99,235,.12);background:white}.primary,.secondary{border-radius:8px;border:0;padding:12px 20px;font-weight:900}.primary{background:#2563eb;color:white}.secondary{background:white;border:1.5px solid #dbe4ee;color:#0f172a}.full{width:100%}.msg{padding:11px 13px;border-radius:8px;font-weight:800;font-size:14px;margin:10px 0}.error{background:#fff1f2;color:#dc2626}.ok{background:#ecfdf5;color:#047857}.note{margin-top:16px;text-align:center;color:#64748b;font-size:13px}.onboard-page{min-height:100vh;display:flex;background:linear-gradient(135deg,#f8fafc,#eff6ff)}.ob-side{width:270px;padding:34px 24px;background:linear-gradient(160deg,#0f766e,#2563eb);color:white}.ob-side h2{font-size:21px;margin-bottom:36px}.ob-step{display:flex;align-items:center;gap:10px;padding:10px;border-radius:8px;color:rgba(255,255,255,.62);font-weight:800;font-size:14px}.ob-step.active{background:rgba(255,255,255,.16);color:white}.ob-step.done{color:rgba(255,255,255,.86)}.ob-step b{width:25px;height:25px;border-radius:50%;border:2px solid rgba(255,255,255,.35);display:flex;align-items:center;justify-content:center;font-size:12px}.ob-main{flex:1;padding:36px;display:flex;justify-content:center;align-items:flex-start}.panel{width:100%;max-width:630px;padding:36px}.panel h2{font-size:29px;margin-bottom:6px}.option-grid,.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:20px 0}.option{border:2px solid #dbe4ee;background:white;border-radius:8px;padding:18px;text-align:center}.option span{display:block;font-size:34px}.option strong{display:block}.option small{display:block;color:#64748b;margin-top:3px}.option.selected,.option:hover,.pill.selected{border-color:#2563eb;background:#eff6ff;color:#2563eb}.row{display:flex;gap:10px;margin-top:12px}.pill-block{margin:18px 0}.pill-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.pill{border:1.5px solid #dbe4ee;background:white;border-radius:8px;padding:9px 14px;text-transform:capitalize;font-weight:800}.bmi-card{text-align:center;padding:28px;border-radius:8px;background:linear-gradient(135deg,#eff6ff,#f0fdf4);margin:20px 0}.bmi-card strong{font-size:64px;line-height:1}.target-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px}.target{border:1px solid #dbe4ee;border-bottom:3px solid #2563eb;border-radius:8px;padding:14px}.target small{display:block;color:#64748b;font-weight:900;text-transform:uppercase}.target strong{font-size:27px;margin-right:3px}.target span{color:#64748b;font-size:12px}.tip{background:linear-gradient(135deg,#eff6ff,#f0fdf4);border-radius:8px;padding:15px;margin:18px 0;color:#334155}.app-screen{min-height:100vh;background:linear-gradient(135deg,#f8fafc 0%,#eef6ff 52%,#f8fbf3 100%)}.sidebar{position:fixed;left:0;top:0;bottom:0;width:248px;background:rgba(255,255,255,.96);border-right:1px solid #dbe4ee;display:flex;flex-direction:column;box-shadow:12px 0 34px rgba(15,23,42,.04)}.sb-brand{padding:18px;border-bottom:1px solid #dbe4ee}.sb-brand .brand-icon{width:34px;height:34px}.sb-user{display:flex;align-items:center;gap:10px;padding:14px 18px;background:transparent;border:0;border-bottom:1px solid #dbe4ee;text-align:left}.avatar{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#e0f2fe;color:#0f766e;font-weight:900}.avatar.big{width:58px;height:58px;margin:0 auto 10px}.sb-user small{display:block;color:#64748b}.nav-label{font-size:12px;text-transform:uppercase;letter-spacing:.08em;font-weight:900;color:#64748b;margin:18px 20px 10px}.nav-btn{width:calc(100% - 24px);margin:0 12px 6px;padding:12px;border:0;border-radius:8px;background:transparent;color:#475569;font-weight:800;text-align:left}.nav-btn span{margin-right:10px}.nav-btn.active,.nav-btn:hover{background:#e0f2fe;color:#0f766e}.logout{margin:auto 12px 16px;padding:12px;border:0;border-radius:8px;background:transparent;text-align:left;color:#64748b;font-weight:800}.logout:hover{background:#fff1f2;color:#e11d48}.main{margin-left:248px;min-height:100vh}.topbar{height:78px;background:rgba(255,255,255,.88);border-bottom:1px solid #dbe4ee;display:flex;align-items:center;justify-content:space-between;padding:0 28px}.topbar h1{margin:0;font-size:24px}.topbar span,.muted{color:#64748b}.content{padding:24px 28px}.stats-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-bottom:18px}.stat{background:rgba(255,255,255,.96);border:1px solid #dbe4ee;border-radius:8px;padding:20px;box-shadow:0 12px 28px rgba(15,23,42,.06)}.stat-icon{width:40px;height:40px;border-radius:8px;background:#eff6ff;display:flex;align-items:center;justify-content:center;margin-bottom:15px}.stat span{display:block;font-size:12px;color:#64748b;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.stat strong{display:block;font-size:31px;margin:6px 0}.stat small{color:#64748b}.two-grid,.tracker-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:18px}.tracker-grid{grid-template-columns:1.12fr .88fr}.card{padding:22px;margin-bottom:16px}.card h3{margin-bottom:18px}.ring-layout,.progress-row{display:grid;grid-template-columns:140px 1fr;gap:18px;align-items:center}.ring{position:relative;width:120px;height:120px}.ring div{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}.ring strong{font-size:24px}.ring span{font-size:12px;color:#64748b}.macro{margin-bottom:13px}.macro>div:first-child,.nut>div:first-child,.score{display:flex;justify-content:space-between;font-size:14px;margin-bottom:6px}.bar{height:8px;border-radius:999px;overflow:hidden;background:#edf2f7}.bar i{display:block;height:100%;border-radius:999px}.water-count{color:#64748b;margin-bottom:14px}.water-count strong{font-size:24px;color:#0ea5e9}.water-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}.water-btn{width:38px;height:44px;border-radius:8px;border:2px solid #0ea5e9;background:white;opacity:.45}.water-btn.filled{background:#eff6ff;opacity:1}.summary-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.summary,.recent,.log-row,.drop-item{background:#f4f6fa;border-radius:8px;padding:12px}.summary span{display:block;color:#64748b;text-transform:uppercase;font-size:12px;font-weight:900}.summary strong{font-size:20px}.summary small{font-size:11px;color:#64748b;margin-left:2px}.recent,.log-row,.drop-item{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:8px}.tip-bar{display:flex;gap:14px;padding:18px;border-radius:8px;background:linear-gradient(135deg,#ecfdf5,#eff6ff);border:1px solid #d1fae5}.tip-bar b{display:block}.tip-bar span{color:#334155}.search{position:relative;margin-bottom:14px;display:flex;gap:10px}.search span{position:absolute;left:14px;top:14px}.search input{padding-left:40px}.filters{display:flex;gap:9px;align-items:center;flex-wrap:wrap;margin:12px 0}.filter{border:1.5px solid #dbe4ee;background:white;border-radius:8px;padding:8px 13px}.filter.active{background:#e0f2fe;border-color:#7dd3fc;color:#0369a1;font-weight:900}.food-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(285px,1fr));gap:16px}.food-card{padding:18px;position:relative}.badge{position:absolute;top:14px;right:14px;border-radius:6px;padding:5px 8px;font-size:11px;font-weight:900}.green{background:#dcfce7;color:#15803d}.yellow{background:#fef3c7;color:#92400e}.red{background:#fee2e2;color:#991b1b}.food-emoji{font-size:34px}.food-card h3{padding-right:90px;margin:8px 0 3px}.food-card p{color:#64748b;font-size:14px}.food-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:14px 0}.food-stats div{text-align:center;background:#f4f6fa;border-radius:8px;padding:10px}.food-stats b,.food-stats span{display:block}.food-stats span{font-size:12px;color:#64748b}.nut{margin-bottom:10px}.allergens{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0}.allergens span,.reason{background:#fff1f2;color:#9f1239;border-radius:8px;padding:7px 9px;font-size:12px;font-weight:800}.datebar{display:flex;align-items:center;justify-content:space-between;background:white;border:1px solid #dbe4ee;border-radius:8px;padding:12px;margin-bottom:16px}.datebar button,.log-row button,.drop-item button{border:0;border-radius:8px;padding:9px 12px;background:#eff6ff;color:#2563eb;font-weight:900}.datebar button:disabled{opacity:.4}.datebar small,.drop-item small,.log-row small{display:block;color:#64748b;margin-top:3px}.tracker-search button{flex-shrink:0}.dropdown{margin-top:10px}.green-text{color:#15803d}.red-text{color:#dc2626}.suggestions p{background:#eff6ff;border-left:3px solid #2563eb;border-radius:8px;padding:10px}.analytics-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}.analytics-tabs button{border:1.5px solid #dbe4ee;background:white;border-radius:8px;padding:10px 14px;font-weight:800}.analytics-tabs button.active{background:#2563eb;color:white}.chart{height:280px;display:flex;align-items:flex-end;gap:12px}.chart-col{flex:1;height:100%;display:flex;flex-direction:column;justify-content:flex-end;text-align:center;color:#64748b;font-size:12px}.chart-col>div{height:230px;display:flex;align-items:flex-end;gap:3px;justify-content:center}.chart-col i{width:100%;max-width:28px;border-radius:8px 8px 3px 3px}.empty{grid-column:1/-1;display:flex;align-items:center;justify-content:center;min-height:120px;text-align:center;color:#64748b;flex-direction:column}.modal{position:fixed;inset:0;background:rgba(15,23,42,.42);display:flex;align-items:center;justify-content:center;padding:20px;z-index:5}.modal-box{width:100%;max-width:480px;padding:24px;position:relative;text-align:center}.modal-close{position:absolute;right:14px;top:14px;border:0;background:#f4f6fa;border-radius:8px;width:34px;height:34px}.profile-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.profile-grid div{background:#f4f6fa;border-radius:8px;padding:10px;text-align:left}.profile-grid span{display:block;color:#64748b;font-size:12px}.profile-grid b{display:block}@media(max-width:1050px){.stats-grid{grid-template-columns:1fr 1fr}.two-grid,.tracker-grid{grid-template-columns:1fr}}@media(max-width:760px){.sidebar{position:static;width:100%}.main{margin-left:0}.app-screen,.onboard-page{display:block}.ob-side{width:100%;height:auto}.topbar{padding:0 16px}.content{padding:16px}.stats-grid,.summary-grid,.option-grid,.form-grid{grid-template-columns:1fr}.auth-card{padding:34px 20px}.auth-card h2{font-size:32px}}
/* cinematic gym-style theme */
body{background:#070405;color:#fff}.auth-page{position:relative;overflow:hidden;background:radial-gradient(circle at 18% 34%,rgba(255,255,255,.08),transparent 18%),radial-gradient(circle at 82% 38%,rgba(255,255,255,.07),transparent 20%),linear-gradient(90deg,rgba(4,3,4,.94),rgba(82,8,13,.83) 48%,rgba(4,3,4,.94)),url("https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1800&q=80");background-size:cover;background-position:center;isolation:isolate}.auth-page:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px);background-size:25% 100%,100% 25%;pointer-events:none}.auth-page:after{content:"BUILD YOUR SMART NUTRITION STRENGTH";position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);width:min(1100px,92vw);text-align:center;font-size:clamp(44px,9vw,112px);line-height:.86;font-weight:950;letter-spacing:.03em;color:rgba(255,255,255,.055);z-index:-1}.auth-card{max-width:520px;background:rgba(12,8,10,.78);border:1px solid rgba(255,255,255,.14);box-shadow:0 30px 90px rgba(0,0,0,.55);backdrop-filter:blur(18px);color:#fff}.auth-card:before{height:5px;background:#ef141f}.auth-card h2{font-size:clamp(38px,6vw,64px);text-transform:uppercase;letter-spacing:.03em;color:#fff}.auth-card p,.note{color:rgba(255,255,255,.72)}.brand-icon{background:#ef141f;box-shadow:0 14px 34px rgba(239,20,31,.34)}.auth-brand span,.sb-brand span{color:#ef141f}.tabs{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.14)}.tabs button{color:rgba(255,255,255,.68)}.tabs button.active{background:#ef141f;color:#fff}.field span{color:rgba(255,255,255,.78)}.field input,.search input{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.14);color:#fff}.field input::placeholder,.search input::placeholder{color:rgba(255,255,255,.45)}.field input:focus,.search input:focus{border-color:#ef141f;box-shadow:0 0 0 4px rgba(239,20,31,.2);background:rgba(255,255,255,.11)}.primary{background:#ef141f;color:#fff;box-shadow:0 14px 30px rgba(239,20,31,.25);text-transform:uppercase;letter-spacing:.04em}.primary:hover{background:#ff2430;transform:translateY(-1px)}.secondary{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.18);color:#fff}.app-screen,.onboard-page{background:radial-gradient(circle at 15% 8%,rgba(239,20,31,.22),transparent 28%),radial-gradient(circle at 85% 18%,rgba(255,255,255,.08),transparent 24%),linear-gradient(135deg,#080405,#19070a 48%,#090405)}.sidebar,.topbar{background:rgba(9,5,7,.86);border-color:rgba(255,255,255,.1);backdrop-filter:blur(18px)}.sidebar{box-shadow:18px 0 48px rgba(0,0,0,.36)}.topbar h1{color:#fff;text-transform:uppercase;letter-spacing:.04em}.topbar span,.muted,.sb-user small,.stat small,.summary span,.food-card p,.chart-col,.datebar small,.drop-item small,.log-row small{color:rgba(255,255,255,.62)}.nav-label{color:rgba(255,255,255,.48)}.nav-btn{color:rgba(255,255,255,.7)}.nav-btn.active,.nav-btn:hover{background:rgba(239,20,31,.16);color:#fff}.logout:hover{background:rgba(239,20,31,.16);color:#fff}.stat,.card,.food-card,.panel,.modal-box{background:linear-gradient(180deg,rgba(255,255,255,.095),rgba(255,255,255,.045));border-color:rgba(255,255,255,.12);box-shadow:0 20px 52px rgba(0,0,0,.28);color:#fff;backdrop-filter:blur(14px)}.stat-icon,.summary,.recent,.log-row,.drop-item,.food-stats div,.profile-grid div{background:rgba(255,255,255,.08)}.stat span,.card h3,.panel h2,.food-card h3,.macro span,.nut span,.score span{color:#fff}.stat strong,.summary strong{color:#fff}.bar{background:rgba(255,255,255,.14)}.tip-bar,.tip,.bmi-card{background:linear-gradient(135deg,rgba(239,20,31,.22),rgba(255,255,255,.07));border-color:rgba(239,20,31,.28);color:#fff}.tip-bar span{color:rgba(255,255,255,.75)}.filter,.pill,.option,.datebar,.analytics-tabs button{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.14);color:#fff}.filter.active,.analytics-tabs button.active,.pill.selected,.option.selected,.option:hover{background:#ef141f;border-color:#ef141f;color:#fff}.option small{color:rgba(255,255,255,.65)}.ob-side{background:linear-gradient(160deg,#090405,#52080d 56%,#ef141f)}.target{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.13);border-bottom-color:#ef141f}.target small,.target span{color:rgba(255,255,255,.62)}.water-btn{background:rgba(255,255,255,.06);border-color:#ef141f}.water-btn.filled{background:rgba(239,20,31,.25)}.water-count strong{color:#ef141f}.green{background:rgba(34,197,94,.17);color:#86efac}.yellow{background:rgba(245,158,11,.17);color:#facc15}.red{background:rgba(239,20,31,.2);color:#ff8a91}.allergens span,.reason{background:rgba(239,20,31,.18);color:#ff9aa0}.modal{background:rgba(0,0,0,.72)}.modal-close{background:rgba(255,255,255,.1);color:#fff}.avatar{background:#ef141f;color:#fff}.chart-col i{box-shadow:0 0 18px rgba(239,20,31,.22)}
`;
