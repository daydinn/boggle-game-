import { Component, OnInit, HostListener } from '@angular/core';
import { ScoreService } from '../services/score.service';
import { LanguageService } from '../services/language.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  totalScore = 0; // Total score for submitted words
  submittedWords: string[] = []; // Stores manually entered words
  players: { name: string; words: string[] }[] = []; // Stores player names and their words
  playerScores: { name: string; score: number }[] = []; // Stores player scores
  board: string[][] = []; // 4x4 board of random letters
  highlightedCells: { row: number; col: number }[] = []; // Tracks highlighted cells
  selectedWord: string = ''; // Current word being selected
  currentRowIndex = 0; // Tracks current row index for navigation
  currentColIndex = 0; // Tracks current column index for navigation
  submitWordLabel: string = ''; // Label for the "Submit Word" button
  totalScoreLabel: string = ''; // Label for the "Total Score" display
  acceptedWords: Set<string> = new Set(); // Set of accepted words based on language
  selectedLanguage: string = 'en'; // Default selected language

  constructor(
    private scoreService: ScoreService,
    private languageService: LanguageService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Initialize language, words, and board
    this.selectedLanguage = this.languageService.getLanguage();
    this.loadAcceptedWords();
    this.playerScores = this.scoreService.calculateMultiplayerScore(this.players);
    this.board = this.generateRandomBoard();
    this.updateTranslations();
  }

  /**
   * Updates translation labels for UI elements.
   * Retrieves translations and assigns them to labels based on the selected language.
   */
  private updateTranslations(): void {
    const translations = this.languageService.getTranslations();
    this.submitWordLabel = translations['submitWord'];
    this.totalScoreLabel = translations['totalScore'];
  }

  /**
   * Asynchronously loads a list of accepted words based on the selected language.
   * - Dynamically determines the file path based on the language.
   * - Processes each line as a word, storing them in a Set to ensure uniqueness and ignore case.
   */
  async loadAcceptedWords(): Promise<void> {
    try {
      let filePath = 'assets/wordlist-english.txt'; // Default to English
      if (this.selectedLanguage === 'de') {
        filePath = 'assets/wortliste-deutsch.txt';
      } else if (this.selectedLanguage === 'fr') {
        filePath = 'assets/listedemots-francais.txt';
      }

      const response = await fetch(filePath);
      const data = await response.text();

      // Store words in a Set to ensure uniqueness and ignore case
      this.acceptedWords = new Set(data.split('\n').map(word => word.trim().toLowerCase()));
      console.log(`Accepted words loaded for language ${this.selectedLanguage}:`, Array.from(this.acceptedWords));
    } catch (err) {
      console.error('Error loading accepted words:', err);
    }
  }

  /**
   * Handles keyboard navigation and selection.
   * - Uses arrow keys to navigate cells, space to select a letter, and Enter to submit the word.
   */
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp': if (this.currentRowIndex > 0) this.currentRowIndex--; break;
      case 'ArrowDown': if (this.currentRowIndex < this.board.length - 1) this.currentRowIndex++; break;
      case 'ArrowLeft': if (this.currentColIndex > 0) this.currentColIndex--; break;
      case 'ArrowRight': if (this.currentColIndex < this.board[this.currentRowIndex].length - 1) this.currentColIndex++; break;
      case ' ': event.preventDefault(); this.selectLetter(); break;
      case 'Enter': this.submitWord(); break;
      case 'Backspace': this.removeLastSelectedLetter(); break;
    }
  }

  /**
   * Removes the last highlighted cell and character from `selectedWord`.
   */
  removeLastSelectedLetter(): void {
    if (this.highlightedCells.length > 0) {
      this.highlightedCells.pop();
      this.selectedWord = this.selectedWord.slice(0, -1);
    }
  }

  /**
   * Checks if a cell is adjacent to the last highlighted cell.
   * @param cell - The cell to check adjacency.
   * @returns `true` if adjacent, otherwise `false`.
   */
  isNeighbor(cell: { row: number; col: number }): boolean {
    const lastCell = this.highlightedCells[this.highlightedCells.length - 1];
    const rowDiff = Math.abs(cell.row - lastCell.row);
    const colDiff = Math.abs(cell.col - lastCell.col);
    return rowDiff <= 1 && colDiff <= 1 && (rowDiff + colDiff > 0);
  }

  /**
   * Adds the selected word to the list if valid and recalculates the total score.
   * - Ensures word is in the accepted list, clears `selectedWord` and highlights.
   */
  submitWord(): void {
    const word = this.selectedWord.trim().toLowerCase();
    if (word.length >= 3 && this.acceptedWords.has(word)) {
      this.submittedWords.push(word);
      this.calculateTotalScore();
    }
    this.selectedWord = '';
    this.highlightedCells = [];
  }

  /**
   * Calculates the total score based on the submitted words.
   * - Uses the ScoreService to calculate the score.
   */
  calculateTotalScore(): void {
    this.totalScore = this.scoreService.calculateBoggleScore(this.submittedWords);
  }

  /**
   * Generates a 4x4 game board filled with random letters.
   * - Fills each cell in a 4x4 grid with a random letter.
   * @returns {string[][]} A 4x4 array of letters.
   */
  generateRandomBoard(): string[][] {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const board: string[][] = [];
    for (let i = 0; i < 4; i++) {
      const row = [];
      for (let j = 0; j < 4; j++) {
        const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
        row.push(randomLetter);
      }
      board.push(row);
    }
    return board;
  }

  /**
   * Checks if a cell at the given row and column is highlighted.
   * @param row - Row index of the cell.
   * @param col - Column index of the cell.
   * @returns `true` if highlighted, otherwise `false`.
   */
  isCellHighlighted(row: number, col: number): boolean {
    return this.highlightedCells.some(cell => cell.row === row && cell.col === col);
  }

  /**
   * Handles cell click events to select/deselect letters.
   * - Sets the current position for navigation.
   * @param letter - The letter in the clicked cell.
   * @param rowIndex - Row index of the cell.
   * @param colIndex - Column index of the cell.
   */
  onCellClick(letter: string, rowIndex: number, colIndex: number): void {
    this.currentRowIndex = rowIndex;
    this.currentColIndex = colIndex;
    this.selectLetter();
  }

  /**
   * Selects or deselects a letter on the board based on the current cell.
   * - Adds the cell to `highlightedCells` if it's the first selection or adjacent to the last highlighted cell.
   * - Removes the cell if it's already highlighted, ensuring sequential removal.
   */
  selectLetter(): void {
    const cell = { row: this.currentRowIndex, col: this.currentColIndex };
    const letter = this.board[cell.row][cell.col];
    const cellIndex = this.highlightedCells.findIndex(
      highlightedCell => highlightedCell.row === cell.row && highlightedCell.col === cell.col
    );

    if (cellIndex > -1) {
      this.removeLastSelectedLetter();
    } else if (this.highlightedCells.length === 0 || this.isNeighbor(cell)) {
      this.highlightedCells.push(cell);
      this.selectedWord += letter;
    } else {
      console.log('Only adjacent cells can be selected.');
    }
  }
}
