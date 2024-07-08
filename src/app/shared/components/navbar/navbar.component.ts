import { UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, UpperCasePipe, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() availableLanguages: {id: string, label: string}[] = [];
  @Input() selectedLanguage: string = 'es';
  @Output() languageSelected: EventEmitter<string> = new EventEmitter();

  constructor() {}

  onSelectLanguage(langId: string): void {
    this.languageSelected.emit(langId);
  }
}
