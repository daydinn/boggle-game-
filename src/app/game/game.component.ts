import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  score: number = 0;  // Player's score

  constructor() {}

  ngOnInit(): void {
    // Example word list to test the scoring function
    const words = ['catty', 'wampus', 'am', 'bumfuzzle', 'gardyloo', 'taradiddle', 'loo', 'snickersnee', 'widdershins', 'teabag', 'collywobbles', 'gubbins'];
    this.score = this.calculateBoggleScore(words);  // Calculate score for the word list
    console.log("Total Score:", this.score);  // Log the score to the console
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
  }
  
