import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedLanguage: string = 'en'; // Default language is English
  title: string = ''; // Page title based on selected language
  startButtonText: string = ''; // Text for the start button based on language
  languagePrompt: string = ''; // Prompt to select a language

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    // Initial translation load on component initialization
    this.updateTranslations();
  }

  /**
   * Changes the application's language based on user selection.
   * Updates `selectedLanguage`, sets the new language in `LanguageService`, and refreshes translations.
   * @param language - Language code (e.g., 'en', 'de', 'fr').
   */
  selectLanguage(language: string): void {
    this.selectedLanguage = language;
    this.languageService.setLanguage(language);
    this.updateTranslations();
  }

  /**
   * Updates component's text elements to match the selected language.
   * Retrieves translations for `title`, `startButtonText`, and `languagePrompt`
   * using the currently selected language.
   */
  private updateTranslations(): void {
    const translations = this.languageService.getTranslations();
    this.title = translations['title'];
    this.startButtonText = translations['startButton'];
    this.languagePrompt = translations['languagePrompt'];
  }
}
