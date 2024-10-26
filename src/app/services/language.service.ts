// language.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private selectedLanguage: string = 'en'; // Default language

  private translations = {
    en: { title: "Welcome to Boggle Game", startButton: "Start the Game", languagePrompt: "Select a Language", submitWord: "Submit Word", totalScore: "Total Score" },
    de: { title: "Willkommen zum Boggle-Spiel", startButton: "Spiel starten", languagePrompt: "Sprache auswählen", submitWord: "Wort einreichen", totalScore: "Gesamtpunktzahl" },
    fr: { title: "Bienvenue au jeu Boggle", startButton: "Démarrer le jeu", languagePrompt: "Choisissez une langue", submitWord: "Soumettre le mot", totalScore: "Score total" }
  };
  /**
  * Sets the current language for translations.
  * @param language - Language code (e.g., 'en', 'de', 'fr').
  * This updates `selectedLanguage` to the chosen language.
  */
  setLanguage(language: string): void {
    this.selectedLanguage = language;
  }
  /**
  * Retrieves translations for the selected language.
  * @returns An object containing key-value pairs of translations.
  * Accesses the `translations` dictionary using the current language.
  */
  getTranslations(): { [key: string]: string } {
    return this.translations[this.selectedLanguage as keyof typeof this.translations];
  }
}
