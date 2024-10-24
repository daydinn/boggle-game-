import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  score: number = 0;  // Player's score
  players: { name: string, words: string[] }[] = []; // Class-level players property

  constructor() {}

  ngOnInit(): void {
    // Initialize players with their word lists
    this.players = [
      { name: 'Lucas', words: ['am', 'bibble', 'loo', 'malarkey', 'nudiustertian', 'quire', 'widdershins', 'xertz', 'bloviate', 'pluto'] },
      { name: 'Clara', words: ['xertz', 'gardyloo', 'catty', 'fuzzle', 'mars', 'sialoquent', 'quire', 'lollygag', 'colly', 'taradiddle', 'snickersnee', 'widdershins', 'gardy'] },
      { name: 'Klaus', words: ['bumfuzzle', 'wabbit', 'catty', 'flibbertigibbet', 'am', 'loo', 'wampus', 'bibble', 'nudiustertian', 'xertz'] },
      { name: 'Raphael', words: ['bloviate', 'loo', 'xertz', 'mars', 'erinaceous', 'wampus', 'am', 'bibble', 'cattywampus'] },
      { name: 'Tom', words: ['bibble', 'loo', 'snickersnee', 'quire', 'am', 'malarkey'] }
    ];

    // Calculate total score
    const scores = this.calculateMultiplayerScore(this.players);
    console.log(scores); // Output the scores for each player
  }

  /**
   * Calculates the Boggle score based on word length.
   * 
   * @param words - Array of words to score.
   * @returns Total score based on the Boggle game rules.
   */
  calculateBoggleScore(words: string[]): number {
    return words.reduce((score, word) => {
      const length = word.length;

      if (length < 3) return score; 
      if (length >= 8) return score + 11;
      if (length === 7) return score + 5; 
      if (length === 6) return score + 3; 
      if (length === 5) return score + 2; 
      return score + 1;  // 3 or 4 letters: 1 point
    }, 0);
  }

  /**
   * Calculate the score for each player using their word list.
   * 
   * @param players - An array of player objects, where each object contains a player's name and word list.
   * @returns An array of objects where each object contains the player's name and their total score.
   */
  calculateMultiplayerScore(players: { name: string, words: string[] }[]): { name: string, score: number }[] {
    return players.map(player => {
      const score = this.calculateBoggleScore(player.words); // Calculate score for each player's words
      return { name: player.name, score }; // Return the player's name and total score
    });
  }
}
