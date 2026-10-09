"use strict";

// matchingApp.js
// This file stores test students and runs the match scorer.

const {
  HobbyScore,
  AvailabilityScore,
  LocationScore,
  getMatchResult,
} = require("./matchScoring");

// Test data. In a real application, this would come from a database.
const students = [
  {
    name: "Maya",
    hobbies: ["hiking", "board games", "photography"],
    availability: ["Monday evening", "Wednesday evening", "Saturday morning"],
    area: "North Campus",
  },
  {
    name: "Jordan",
    hobbies: ["board games", "music", "hiking"],
    availability: ["Wednesday evening", "Friday afternoon"],
    area: "Downtown",
  },
  {
    name: "Priya",
    hobbies: ["hiking", "photography", "reading"],
    availability: ["Monday evening", "Saturday morning"],
    area: "North Campus",
  },
  {
    name: "Leo",
    hobbies: ["music", "video games", "basketball"],
    availability: ["Friday afternoon", "Sunday afternoon"],
    area: "South Campus",
  },
  {
    name: "Sofia",
    hobbies: ["board games", "cooking", "hiking"],
    availability: ["Wednesday evening", "Saturday morning"],
    area: "Downtown",
  },
  {
    name: "Ethan",
    hobbies: ["reading", "photography", "running"],
    availability: ["Tuesday evening", "Saturday morning"],
    area: "South Campus",
  },
];

const rules = [new HobbyScore(), new AvailabilityScore(), new LocationScore()];

function findStudent(name) {
  return students.find((student) => student.name === name);
}

function getAllMatchPairs() {
  const pairs = [];

  for (let firstIndex = 0; firstIndex < students.length; firstIndex += 1) {
    const firstStudent = students[firstIndex];

    // Start one position after the first student. This prevents duplicate
    // pairs such as both Maya + Jordan and Jordan + Maya.
    for (
      let secondIndex = firstIndex + 1;
      secondIndex < students.length;
      secondIndex += 1
    ) {
      const secondStudent = students[secondIndex];
      const result = getMatchResult(firstStudent, secondStudent, rules);

      pairs.push({
        firstName: firstStudent.name,
        secondName: secondStudent.name,
        score: result.totalScore,
      });
    }
  }

  // A positive result puts the second item first, so this sorts high to low.
  pairs.sort((firstPair, secondPair) => secondPair.score - firstPair.score);

  return pairs;
}

const allMatchPairs = getAllMatchPairs();

console.log("All hobby matches, highest score first");
console.log("======================================");

for (const pair of allMatchPairs) {
  console.log(`${pair.firstName} + ${pair.secondName}: ${pair.score}`);
}

function expectScore(firstName, secondName, expectedScore) {
  const firstStudent = findStudent(firstName);
  const secondStudent = findStudent(secondName);
  const actualScore = getMatchResult(
    firstStudent,
    secondStudent,
    rules,
  ).totalScore;

  if (actualScore !== expectedScore) {
    throw new Error(
      `Expected ${firstName} + ${secondName} to score ${expectedScore}, but got ${actualScore}.`,
    );
  }
}

expectScore("Maya", "Priya", 45);
expectScore("Maya", "Leo", 0);
expectScore("Jordan", "Sofia", 40);

if (allMatchPairs.length !== 15) {
  throw new Error(
    `Expected 15 unique pairs, but found ${allMatchPairs.length}.`,
  );
}

console.log("\nAll automatic checks passed.");
