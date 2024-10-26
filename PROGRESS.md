# Progress: Boggle Scoring Method

## Boggle Score Calculation Method

- Implemented a method called `calculateBoggleScore` in the `GameComponent`.
- The method accepts an array of words and calculates the total score based on Boggle rules.
- Rules for scoring:
  - Words with less than 3 letters are ignored.
  - Words with 3 or 4 letters score 1 point.
  - Words with 5 letters score 2 points.
  - Words with 6 letters score 3 points.
  - Words with 7 letters score 5 points.
  - Words with 8 or more letters score 11 points.
- The method uses `reduce()` to accumulate the total score based on the length of each word.
- The method was tested in the `ngOnInit()` lifecycle hook with a sample word list.
- The result is logged to the console and displayed in the game UI.


# Progress: Multiplayer Score Function

## Multiplayer Score Calculation

- Implemented the `calculateMultiplayerScore` function.
- This function accepts an array of players, where each player has a `name` and a list of `words`.
- For each player, their total score is calculated using the existing `calculateBoggleScore` function.
- The function returns an array of objects where each object contains the player's `name` and `score`.
- This design avoids code repetition and ensures the same scoring logic for both single and multiplayer modes.


# Progress: Score Services & Word Entry and Calculation

## 1. Score Functions Moved to Service

The **`calculateBoggleScore`** and **`calculateMultiplayerScore`** functions were refactored and moved from the `GameComponent` into the **`ScoreService`**. This helps with better separation of concerns and allows the score logic to be reused across other components, if needed.

Key Changes:
- Created a new service: **ScoreService**.
- Moved the **`calculateBoggleScore`** method to handle the scoring logic for individual words based on length.
- Moved the **`calculateMultiplayerScore`** method to handle multiple players’ scores, making it reusable and easier to maintain.

---

## 2. Manual Word Entry for Score Calculation

A new functionality was introduced to allow users to manually enter words, and the score is calculated based solely on the length of the entered words. This feature ignores whether the words are valid or meaningful, focusing only on the word length for scoring. Additionally, the words entered by the user are displayed below the form in a list. This allows the user to see the words they have entered.

Key Changes:
- Added a form input where users can manually enter words.
- Used **`ngModel`** for two-way data binding in the input field to dynamically capture the user's input.
- Implemented the following key methods:
  - **`submitWord()`**: Handles word submission, checks word validity, and recalculates the total score. Clears the input after submission.
  - **`calculateTotalScore()`**: Uses **`ScoreService`** to update the total score based on the entered words.


  
# Progress: Random Board Generation & Styling and Routing fix
A new method, generateRandomBoard, was introduced in the GameComponent to create a dynamic 4x4 game board filled with random letters. The board layout in the component template was updated to use a table format, improving its structure and readability. To enhance user experience, the board and cells received styling adjustments, including spacing, colors, and hover effects, creating a more polished, interactive interface. Additionally, a routing issue that caused duplicate rendering of the Play Game link was identified and resolved, ensuring a streamlined display.

Key Changes
-Implemented the **`generateRandomBoard`** method, which generates a 4x4 grid of random letters using the English alphabet (A-Z).
-Each cell in the grid is assigned a random letter, forming a 2D array (board) that represents the game board.
-This board is displayed as a table within the HTML template of the component.
-Board Display and Styling Adjustments
-Created a <table> structure within .board-container to organize the 4x4 letter grid.
-Enhanced styling for .board-container and .cell:
-Set defined cell dimensions and adjusted spacing for improved layout and readability.
-Applied distinct colors for cells and text to enhance visibility and provide a game-like look.
-Added hover effects on each cell to improve interactivity and user engagement.
-Created HomeComponent and assigned it as the default route.
-Updated the routing configuration to remove AppComponent from the routing structure and link / to HomeComponent.
-"Play Game" has been link to HomeComponent to prevent duplication on the main page. Now, HomeComponent is the default route, and AppComponent only serves as the root component with <router-outlet> for routed content.

Sources->
Inspired by: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
Used as a reference for generating a random sequence of 16 characters to populate the game board table.
Inspired by: https://stackoverflow.com/questions/58268764/angular-ngfor-to-generate-table-4-cells-wide
Used for generating a table with a 4-cell wide structure.
Inspired by: https://angular.dev/guide/routing/common-router-tasks
Used as a reference to review and refresh routing configurations in Angular.



# Progress: Game Board & Interaction Update
Updated the GameComponent to streamline word submission, cell selection, and scoring logic. Enhanced features include dynamic highlighting for selected cells, tracking user-entered words, and improved score calculation. The update also introduces a method to toggle cell highlighting for better interactivity and refines input management to ensure valid word submission.Enabled navigation and selection of board cells using arrow keys and Space/Delete key functionality.
Enhanced the onCellClick method to handle sequential selection and deselection of cells in the board. This ensures that cells can only be deselected in the reverse order of selection. Enhanced both onCellClick and selectLetter methods to manage cell highlighting and selectedWord updates in sync, ensuring consistent behavior between mouse clicks and keyboard navigation. Implemented functionality to enforce that cells can only be deselected in reverse order (last-in, first-out) for an intuitive interaction experience.
Added isNeighbor method to validate that a cell is selected only if it is adjacent to the last highlighted cell, reinforcing the sequential cell selection rule.

Key Changes
-Dynamic Word Submission & Scoring
-Replaced words array with submittedWords  to improve clarity in storing manually entered words.
-Enhanced `**submitWord()**` method:
-Added highlightedCells array to manage which cells are selected on the board.
-Created `**onCellClick()**` method to toggle highlighting:
-If a cell is already highlighted, it’s removed from highlightedCells.
-If a cell is not highlighted, it’s added to highlightedCells, and the letter is appended to selectedWord.
-`**generateRandomBoard()**` method  now supports better interaction with cell highlighting.
-Added ngClass for dynamic cell highlighting upon click.
Sources->
- ngModel enabling real-time synchronization between highlighted cells and input field, providing a responsive user experience.
-Enabled navigation and selection of board cells using arrow keys and Space/Delete key functionality.
-Arrow keys (Up, Down, Left, Right) allow movement between cells.
-Space key selects the current cell, while Delete removes the last selected cell in reverse order.
-Uses `**removeLastSelectedLetter**` to deselect only the last selected cell.
Adds new cells sequentially and appends their letters to selectedWord.
This ensures that users must deselect in the same order as they selected.

Sources->
Inspired by:https://stackoverflow.com/questions/49177619/
Inspired by:need-to-get-the-table-row-data-for-which-cell-is-selected-using-jquery
Inspired by:https://stackoverflow.com/questions/46475843/getting-the-cell-values-for-a-selected-row
Inspired by:https://ej2.syncfusion.com/javascript/documentation/pivotview/how-to/perform-cell-selection-and-get-selected-cells-information
I adapted the approach for selecting table elements and retrieving their values from these sources. These resources provided insight into how I could implement logic for selecting table cells and retrieving their values.
Inspired by:https://www.typescriptlang.org/docs/handbook/intro.html
Inspired by:https://developer.mozilla.org/en-US/docs/Web/JavaScript
This resources was used for general syntax reference throughout the project to ensure correct TypeScript or Javascript usage and to remember the key concepts.
Inspired by:https://v17.angular.io/docs
I referred to Angular v17 Documentation as a general resource to look up syntax and resolve any Angular-specific issues or questions that arose during the implementation. It was especially helpful when I needed to clarify certain aspects of Angular




