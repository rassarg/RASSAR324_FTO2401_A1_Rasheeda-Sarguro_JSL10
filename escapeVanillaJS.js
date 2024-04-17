// Event listener & books.json API for Room 1
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("solveRoom1").addEventListener("click", () => {
    fetch("books.json")
      .then((response) => response.json())
      .then((books) => {
        const mostRecentBook = findMostRecentBook(books);

        document.getElementById(
          "room1Result"
        ).textContent = `The key to the next room is: ${mostRecentBook.title}`;
      });
  });

  // 2 Sets created for Room 2
  document.getElementById("solveRoom2").addEventListener("click", () => {
    const jsConcepts = new Set(["closure", "scope", "hoisting", "async"]);

    const reactConcepts = new Set(["components", "jsx", "hooks", "async"]);

    const commonConcepts = findIntersection(jsConcepts, reactConcepts);
    document.getElementById(
      "room2Result"
    ).textContent = `The code to unlock the door is: ${Array.from(
      commonConcepts
    ).join(", ")}`;
  });

  // Async function for room 3 to print out directions
  document.getElementById("solveRoom3").addEventListener("click", async () => {
    try {
      const resp = await fetch("directions.json");
      const directions = await resp.json();
      const message = await navigateLabyrinth(directions);

      document.getElementById("room3Result").innerHTML = message;
    } catch (error) {
      console.error(
        "An error occurred while awaiting directions for room 3:",
        error
      );
    }
  });
});

function findMostRecentBook(books) {
  return books.reduce(
    (mostRecent, book) => {
      return new Date(book.published) > new Date(mostRecent.published)
        ? book
        : mostRecent;
    },
    { title: "", published: "1970-01-01" } // Initial value for mostRecent
  );
}

function findIntersection(setA, setB) {
  // 🪲 Bug: Incorrect logic
  const intersection = new Set([...setA]);
  return intersection;
}

async function navigateLabyrinth(directions) {
  for (let direction of directions) {
    // 🪲 Bug: No delay
    new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Navigating: ${direction.step}`);
  }
  return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}
