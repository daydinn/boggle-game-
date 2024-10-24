import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  constructor() {}

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
      const score = this.calculateBoggleScore(player.words);
      return { name: player.name, score };
    });
  }
}
