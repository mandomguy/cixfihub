/** @format */

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, "..")));

// Cache for class data (24 hours)
let classesCache = null;
const CACHE_TIME = 24 * 60 * 60 * 1000; // 24 hours

/**
 * POE2 Class to Ascendancy mapping
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

// Sample HTML scraped from poe.ninja/poe2/builds/vaal (update periodically)
const SAMPLE_HTML = `<div style="--max-width: 80px;" role="listbox" aria-multiselectable="true"><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 16.636523668282333%, var(--color-coolgrey-900) 16.636523668282333%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/oracle.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Oracle</div><div class="class-percentage">17%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 16.32785936482674%, var(--color-coolgrey-900) 16.32785936482674%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/blood-mage.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Blood Mage</div><div class="class-percentage">16%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 14.551431993376578%, var(--color-coolgrey-900) 14.551431993376578%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/pathfinder.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Pathfinder</div><div class="class-percentage">15%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 9.239833771411577%, var(--color-coolgrey-900) 9.239833771411577%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/shaman.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Shaman</div><div class="class-percentage">9%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 5.660453189933042%, var(--color-coolgrey-900) 5.660453189933042%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/disciple-of-varashta.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Disciple of Varashta</div><div class="class-percentage">6%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 5.656434123481798%, var(--color-coolgrey-900) 5.656434123481798%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/stormweaver.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Stormweaver</div><div class="class-percentage">6%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 5.043124583021855%, var(--color-coolgrey-900) 5.043124583021855%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/titan.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Titan</div><div class="class-percentage">5%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 4.305223982573328%, var(--color-coolgrey-900) 4.305223982573328%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/invoker.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Invoker</div><div class="class-percentage">4%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 4.1042706600110925%, var(--color-coolgrey-900) 4.1042706600110925%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/amazon.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Amazon</div><div class="class-percentage">4%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 3.799625423006744%, var(--color-coolgrey-900) 3.799625423006744%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/ritualist.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Ritualist</div><div class="class-percentage">4%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 2.9636596011478455%, var(--color-coolgrey-900) 2.9636596011478455%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/deadeye.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Deadeye</div><div class="class-percentage">3%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 2.279614491145997%, var(--color-coolgrey-900) 2.279614491145997%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/witchhunter.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Witchhunter</div><div class="class-percentage">2%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 2.097952687549736%, var(--color-coolgrey-900) 2.097952687549736%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/lich.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Lich</div><div class="class-percentage">2%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 1.6542477513323206%, var(--color-coolgrey-900) 1.6542477513323206%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/tactician.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Tactician</div><div class="class-percentage">2%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 1.3134309162667697%, var(--color-coolgrey-900) 1.3134309162667697%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/infernalist.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Infernalist</div><div class="class-percentage">1%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 1.1767826569244495%, var(--color-coolgrey-900) 1.1767826569244495%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/smith-of-kitava.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Smith of Kitava</div><div class="class-percentage">1%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 1.0361153311308848%, var(--color-coolgrey-900) 1.0361153311308848%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/warbringer.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Warbringer</div><div class="class-percentage">1%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 0.6639497777456252%, var(--color-coolgrey-900) 0.6639497777456252%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/chronomancer.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Chronomancer</div><div class="class-percentage">0.7%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 0.6366201258771612%, var(--color-coolgrey-900) 0.6366201258771612%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/acolyte-of-chayula.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Acolyte of Chayula</div><div class="class-percentage">0.6%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 0.5940180214939674%, var(--color-coolgrey-900) 0.5940180214939674%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/abyssal-lich.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Abyssal Lich</div><div class="class-percentage">0.6%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 0.22265628139895666%, var(--color-coolgrey-900) 0.22265628139895666%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/gemling-legionnaire.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Gemling Legionnaire</div><div class="class-percentage">0.2%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 0.011253386063485174%, var(--color-coolgrey-900) 0.011253386063485174%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/druid.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Druid</div><div class="class-percentage">0.0%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 0.007234319612240469%, var(--color-coolgrey-900) 0.007234319612240469%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/witch.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Witch</div><div class="class-percentage">0.0%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 0.006430506321991528%, var(--color-coolgrey-900) 0.006430506321991528%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/ranger.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Ranger</div><div class="class-percentage">0.0%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 0.0048228797414936455%, var(--color-coolgrey-900) 0.0048228797414936455%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/huntress.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Huntress</div><div class="class-percentage">0.0%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 0.003215253160995764%, var(--color-coolgrey-900) 0.003215253160995764%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/warrior.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Warrior</div><div class="class-percentage">0.0%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 0.0024114398707468228%, var(--color-coolgrey-900) 0.0024114398707468228%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/mercenary.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Mercenary</div><div class="class-percentage">0.0%</div></div><div role="option" aria-selected="false" tabindex="0" class="filter-list-cell bg-black " style="border-style: solid; border-width: 0px 0px 2px; border-image-source: linear-gradient(to left, var(--color-coolgrey-100) 0.000803813290248941%, var(--color-coolgrey-900) 0.000803813290248941%); border-image-slice: 1; background-image: url(&quot;/poe2-assets/cdn/classes/sorceress.webp&quot;); background-size: 80px 62.2px; background-repeat: no-repeat; background-position: center bottom;"><div class="class-name">Sorceress</div><div class="class-percentage">0.0%</div></div></div>`;

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

/**
 * Parse class data from HTML string using regex
 */
function parseClassData(htmlString) {
  const optionRegex =
    /<div[^>]*role="option"[^>]*>[\s\S]*?<div class="class-name">([^<]+)<\/div>[\s\S]*?<div class="class-percentage">([^<]+)<\/div>/g;

  const classStats = [];
  let match;
  while ((match = optionRegex.exec(htmlString)) !== null) {
    const name = match[1].trim();
    const percentageStr = match[2].trim();
    const percentage = parseFloat(percentageStr.replace("%", "")) || 0;

    classStats.push({
      name,
      percentage,
      count: 0,
    });
  }
  return classStats;
}

/**
 * PRIMARY ENDPOINT: Get class data from cached HTML
 */
app.get("/api/classes-scraped", (req, res) => {
  const league = req.query.league || "vaal";
  const now = Date.now();

  // Check cache
  if (classesCache && now - classesCache.time < CACHE_TIME) {
    console.log("Returning cached data");
    return res.json(classesCache.data);
  }

  try {
    console.log(`Parsing class data for league: ${league}`);

    // Parse class data from embedded HTML
    const classStats = parseClassData(SAMPLE_HTML);

    if (classStats.length === 0) {
      throw new Error("No class data found");
    }

    // Transform data with type info
    const allClasses = classStats.map((c) => ({
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
      league: league,
      totalClasses: allClasses.length,
      totalCharacters: allClasses.reduce((sum, c) => sum + c.count, 0),
      lastUpdated: new Date().toISOString(),
      dataSource: "poe.ninja (cached)",
      baseClasses,
      ascendancies,
      classes: [...ascendancies, ...baseClasses],
    };

    // Update cache
    classesCache = { data: result, time: now };

    console.log(
      `Parsed ${baseClasses.length} base classes and ${ascendancies.length} ascendancies`,
    );
    res.json(result);
  } catch (err) {
    console.error("Parse error:", err.message);

    if (classesCache) {
      console.log("Returning stale cache");
      return res.json({
        ...classesCache.data,
        warning: "Using cached data",
        error: err.message,
      });
    }

    res.status(500).json({
      error: "Failed to parse class data",
      details: err.message,
    });
  }
});

app.get("/api/classes", (req, res) => {
  res.redirect(`/api/classes-scraped?league=${req.query.league || "vaal"}`);
});

app.listen(PORT, () => {
  console.log(`Server running → http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/classes-scraped`);
});
