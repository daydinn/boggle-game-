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
