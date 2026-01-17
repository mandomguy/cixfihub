/** @format */

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

// Cache for class data (24 hours)
let classesCache = null;
const CACHE_TIME = 24 * 60 * 60 * 1000; // 24 hours

/**
 * POE2 Class to Ascendancy mapping (from maxroll.gg)
 * Base classes → their ascendancies
 */
const CLASS_HIERARCHY = {
  Huntress: ["Amazon", "Ritualist"],
  Warrior: ["Smith of Kitava", "Warbringer", "Titan"],
  Sorceress: ["Stormweaver", "Chronomancer"],
  Mercenary: ["Witchhunter", "Gemling Legionnaire", "Tactician"],
  Monk: ["Invoker", "Acolyte of Chayula"],
  Ranger: ["Deadeye", "Pathfinder"],
  Witch: ["Lich", "Blood Mage", "Infernalist"],
};

// All base class names
const BASE_CLASSES = Object.keys(CLASS_HIERARCHY);

/**
 * Generate image URL from class name
 */
function getClassImageUrl(className) {
  const imageName = className.toLowerCase().replace(/\s+/g, "-");
  return `https://poe.ninja/poe2-assets/cdn/classes/${imageName}.webp`;
}

/**
 * Determine if a class is a base class or ascendancy
 */
function getClassType(className) {
  if (BASE_CLASSES.includes(className)) {
    return "base";
  }
  return "ascendancy";
}

/**
 * Get parent base class for an ascendancy
 */
function getParentClass(ascendancyName) {
  for (const [baseClass, ascendancies] of Object.entries(CLASS_HIERARCHY)) {
    if (ascendancies.includes(ascendancyName)) {
      return baseClass;
    }
  }
  return null; // Standalone ascendancy
}

/**
 * PRIMARY ENDPOINT: Fetch class data with 24h cache
 * Returns organized by base classes and ascendancies
 */
app.get("/api/classes-scraped", async (req, res) => {
  const league = req.query.league || "vaal";
  const now = Date.now();

  // Check cache
  if (
    classesCache &&
    classesCache.league === league &&
    now - classesCache.time < CACHE_TIME
  ) {
    console.log("Returning cached data");
    return res.json(classesCache.data);
  }

  try {
    console.log(`Fetching class data for league: ${league}`);

    const response = await axios.get("https://poe2.ninja/api/buildoverview", {
      params: { league: league, type: "class" },
      timeout: 15000,
    });

    if (
      !response.data ||
      !response.data.classes ||
      response.data.classes.length === 0
    ) {
      throw new Error("No class data returned from API");
    }

    // Transform data with type info
    const allClasses = response.data.classes.map((c) => ({
      name: c.name,
      percentage: c.percentage.toFixed(1) + "%",
      rawPercentage: c.percentage,
      count: c.count || 0,
      image: getClassImageUrl(c.name),
      type: getClassType(c.name),
      parentClass: getParentClass(c.name),
    }));

    // Separate base classes and ascendancies
    const baseClasses = allClasses
      .filter((c) => c.type === "base")
      .sort((a, b) => b.rawPercentage - a.rawPercentage);

    const ascendancies = allClasses
      .filter((c) => c.type === "ascendancy")
      .sort((a, b) => b.rawPercentage - a.rawPercentage);

    const result = {
      league: response.data.league || league,
      totalClasses: allClasses.length,
      totalCharacters: response.data.total,
      lastUpdated: new Date().toISOString(),
      nextUpdateIn: "24 hours",
      baseClasses,
      ascendancies,
      // Also include combined list for backwards compatibility
      classes: [...ascendancies, ...baseClasses],
    };

    // Update cache
    classesCache = { data: result, time: now, league };

    console.log(
      `Fetched ${baseClasses.length} base classes and ${ascendancies.length} ascendancies`
    );
    res.json(result);
  } catch (err) {
    console.error("API error:", err.message);

    if (classesCache && classesCache.league === league) {
      console.log("Returning stale cache");
      return res.json({
        ...classesCache.data,
        warning: "Using cached data",
        error: err.message,
      });
    }

    res.status(500).json({
      error: "Failed to fetch class data",
      details: err.message,
    });
  }
});

app.get("/api/classes", (req, res) => {
  res.redirect(`/api/classes-scraped?league=${req.query.league || "vaal"}`);
});

app.get("/", (req, res) => {
  res.send(`<h1>PoE2 Class Popularity API</h1>
    <h2>Endpoint:</h2>
    <p><a href="/api/classes-scraped">/api/classes-scraped</a> (24h cache)</p>
    <h3>Leagues:</h3>
    <p>
      <a href="/api/classes-scraped?league=vaal">Vaal</a> | 
      <a href="/api/classes-scraped?league=dawn">Dawn</a> | 
      <a href="/api/classes-scraped?league=standard">Standard</a>
    </p>
    <h3>Response includes:</h3>
    <ul>
      <li><code>baseClasses</code> - Witch, Ranger, Warrior, etc.</li>
      <li><code>ascendancies</code> - Oracle, Blood Mage, Pathfinder, etc.</li>
      <li><code>classes</code> - Combined list (backwards compatible)</li>
    </ul>`);
});

app.listen(PORT, () => {
  console.log(`Server running → http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/classes-scraped`);
});
