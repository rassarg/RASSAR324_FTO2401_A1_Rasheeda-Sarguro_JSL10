// Event listener that fetches data from books.json to display it in Room 1
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("solveRoom1").addEventListener("click", () => {
    fetch("books.json")
      .then((response) => response.json())
      .then((books) => {
        const mostRecentBook = findMostRecentBook(books);

        document.getElementById(
          "room1Result"
        ).textContent = `The key to the next room is: ${mostRecentBook.title}`;
      })
      .catch((error) => {
        console.error("Error fetching books data:", error);
      });
  });

  // 2 Sets created to display in Room 2
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

  // Async function that prints out directions from directions.json to display in Room 3
  document.getElementById("solveRoom3").addEventListener("click", async () => {
    try {
      const resp = await fetch("directions.json");
      const directions = await resp.json();
      const message = await navigateLabyrinth(directions);
      // 🪲 Bug: changed this to .textContent instead but unclear why innerHTM: was flagged as "wrong method" in this case
      document.getElementById("room3Result").textContent = message;
    } catch (error) {
      console.error(
        "An error occurred while awaiting directions for room 3:",
        error
      );
    }
  });
});

// Function that displays the most recent book from books.json in Room 1
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

// Function to find common value between 2 arrays
function findIntersection(setA, setB) {
  const intersection = new Set(
    [...setA].filter((concept) => setB.has(concept))
  );
  return intersection;
}

// Async function that checks directions.json and console logs each step with a message
async function navigateLabyrinth(directions) {
  for (let direction of directions) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Navigating: ${direction.step}`);
  }
  return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}
