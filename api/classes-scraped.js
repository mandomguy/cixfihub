/** @format */

/**
 * Vercel Serverless Function for POE2 Class Popularity Data
 * Works with Vercel deployment while server.js handles local development
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

const BASE_CLASSES = Object.keys(CLASS_HIERARCHY);

function getClassImageUrl(className) {
  const imageName = className.toLowerCase().replace(/\s+/g, "-");
  return `https://poe.ninja/poe2-assets/cdn/classes/${imageName}.webp`;
}

function getClassType(className) {
  return BASE_CLASSES.includes(className) ? "base" : "ascendancy";
}

function getParentClass(ascendancyName) {
  for (const [baseClass, ascendancies] of Object.entries(CLASS_HIERARCHY)) {
    if (ascendancies.includes(ascendancyName)) {
      return baseClass;
    }
  }
  return null;
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const league = req.query.league || "vaal";

  try {
    const apiUrl = `https://poe2.ninja/api/buildoverview?league=${league}&type=class`;

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "CixfiHub/1.0",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.classes || data.classes.length === 0) {
      throw new Error("No class data returned from API");
    }

    // Transform data with type info
    const allClasses = data.classes.map((c) => ({
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
      league: data.league || league,
      totalClasses: allClasses.length,
      totalCharacters: data.total,
      lastUpdated: new Date().toISOString(),
      nextUpdateIn: "24 hours",
      baseClasses,
      ascendancies,
      classes: [...ascendancies, ...baseClasses],
    };

    // Set cache headers (24 hours)
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=43200",
    );

    return res.status(200).json(result);
  } catch (err) {
    console.error("API error:", err.message);

    return res.status(500).json({
      error: "Failed to fetch class data",
      details: err.message,
    });
  }
}
