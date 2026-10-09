"use strict";

// matchScoring.js
// This file contains the scoring rules and the scoreMatch function.
// Each rule follows the same contract: calculate(studentA, studentB)
// returns a number of points.

class HobbyScore {
  constructor() {
    this.name = "Shared hobbies";
    this.pointsPerHobby = 10;
  }

  calculate(studentA, studentB) {
    const sharedCount = countSharedValues(studentA.hobbies, studentB.hobbies);
    return sharedCount * this.pointsPerHobby;
  }

  describe(studentA, studentB, points) {
    const sharedCount = countSharedValues(studentA.hobbies, studentB.hobbies);
    return `${this.name}: ${sharedCount} × ${this.pointsPerHobby} points = ${points}`;
  }
}

class AvailabilityScore {
  constructor() {
    this.name = "Shared available times";
    this.pointsPerTimeSlot = 5;
  }

  calculate(studentA, studentB) {
    const sharedSlots = countSharedValues(
      studentA.availability,
      studentB.availability,
    );
    return sharedSlots * this.pointsPerTimeSlot;
  }

  describe(studentA, studentB, points) {
    const sharedSlots = countSharedValues(
      studentA.availability,
      studentB.availability,
    );
    return `${this.name}: ${sharedSlots} × ${this.pointsPerTimeSlot} points = ${points}`;
  }
}

class LocationScore {
  constructor() {
    this.name = "Location";
  }

  calculate(studentA, studentB) {
    // Students in the same campus area receive 15 points.
    // Nearby areas receive 8 points. All other combinations receive 0.
    if (studentA.area === studentB.area) {
      return 15;
    }

    if (areNearby(studentA.area, studentB.area)) {
      return 8;
    }

    return 0;
  }

  describe(studentA, studentB, points) {
    let relationship = "not nearby";

    if (studentA.area === studentB.area) {
      relationship = "same area";
    } else if (areNearby(studentA.area, studentB.area)) {
      relationship = "nearby areas";
    }

    return `${this.name}: ${relationship} = ${points} points`;
  }
}

function scoreMatch(studentA, studentB, rules) {
  return getMatchResult(studentA, studentB, rules).totalScore;
}

function getMatchResult(studentA, studentB, rules) {
  // Each rule calculates its own points and creates its own explanation.
  // The matching app does not hard-code either number.
  const breakdown = rules.map((rule) => {
    const points = rule.calculate(studentA, studentB);

    return {
      name: rule.name,
      points,
      explanation: rule.describe(studentA, studentB, points),
    };
  });

  const totalScore = breakdown.reduce(
    (runningTotal, item) => runningTotal + item.points,
    0,
  );

  return { breakdown, totalScore };
}

function countSharedValues(firstList = [], secondList = []) {
  const secondValues = new Set(secondList.map(normalize));

  return firstList.filter((value) => secondValues.has(normalize(value))).length;
}

function areNearby(firstArea, secondArea) {
  const nearbyAreas = {
    "north campus": ["downtown"],
    downtown: ["north campus", "south campus"],
    "south campus": ["downtown"],
  };

  return (
    nearbyAreas[normalize(firstArea)]?.includes(normalize(secondArea)) ?? false
  );
}

function normalize(value) {
  return String(value).trim().toLowerCase();
}

module.exports = {
  HobbyScore,
  AvailabilityScore,
  LocationScore,
  scoreMatch,
  getMatchResult,
};
