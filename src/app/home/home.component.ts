// home.component.ts
import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedLanguage: string = 'en';
  title: string = '';
  startButtonText: string = '';
  languagePrompt: string = '';

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.updateTranslations(); // Initial translation load
  }
  /**
  * Changes the application's language.
  * @param language - Language code (e.g., 'en', 'de', 'fr').
  * Sets the selected language in `languageService` and updates translations.
  */
  selectLanguage(language: string): void {
    this.selectedLanguage = language;
    this.updateTranslations();
  }
  /**
  * Updates component's text elements to the selected language.
  * Retrieves translations for `title`, `startButtonText`, and `languagePrompt`
  * based on the currently selected language.
  */
  private updateTranslations(): void {
    const translations = this.languageService.getTranslations();
    this.title = translations['title'];
    this.startButtonText = translations['startButton'];
    this.languagePrompt = translations['languagePrompt'];
  }
}
