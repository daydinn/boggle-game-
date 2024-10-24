import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  totalScore = 0;  // Total score for words
  words: string[] = [];  // Store manually entered words
  wordInput: string = '';  // Two-way binding for word input
  players: { name: string, words: string[] }[] = []; // Class-level players property
  playerScores: { name: string, score: number }[] = []; // Array to store each player's name and score

  constructor(private scoreService: ScoreService) {}

  ngOnInit(): void {
    // Initialize players with their word lists
    this.players = [
      { name: 'Lucas', words: ['am', 'bibble', 'loo', 'malarkey', 'nudiustertian', 'quire', 'widdershins', 'xertz', 'bloviate', 'pluto'] },
      { name: 'Clara', words: ['xertz', 'gardyloo', 'catty', 'fuzzle', 'mars', 'sialoquent', 'quire', 'lollygag', 'colly', 'taradiddle', 'snickersnee', 'widdershins', 'gardy'] },
      { name: 'Klaus', words: ['bumfuzzle', 'wabbit', 'catty', 'flibbertigibbet', 'am', 'loo', 'wampus', 'bibble', 'nudiustertian', 'xertz'] },
      { name: 'Raphael', words: ['bloviate', 'loo', 'xertz', 'mars', 'erinaceous', 'wampus', 'am', 'bibble', 'cattywampus'] },
      { name: 'Tom', words: ['bibble', 'loo', 'snickersnee', 'quire', 'am', 'malarkey'] }
    
    
    ];
    //const words = ['catty', 'wampus', 'am', 'bumfuzzle', 'gardyloo', 'taradiddle', 'loo', 'snickersnee', 'widdershins', 'teabag', 'collywobbles', 'gubbins'];
    
    // Calculate scores for all players using the ScoreService
    this.playerScores = this.scoreService.calculateMultiplayerScore(this.players);

  }
  
  /**
 * Submits the entered word.
 * - Trims and converts the word to lowercase.
 * - Adds the word to the list if it has 3 or more characters.
 * - Recalculates the total score.
 * - Clears the input field after submission.
 */
submitWord(): void {
  const word = this.wordInput.trim().toLowerCase();  // Clean up input
  
  if (word.length >= 3) {  // Validate word length
    this.words.push(word);  // Add word to list
    this.calculateTotalScore();  // Update total score
  }

  this.wordInput = '';  // Clear input
}

/**
 * Updates the total score based on the entered words.
 * - Uses the ScoreService to recalculate the score.
 */
calculateTotalScore(): void {
  this.totalScore = this.scoreService.calculateBoggleScore(this.words);
}

  

  
}
