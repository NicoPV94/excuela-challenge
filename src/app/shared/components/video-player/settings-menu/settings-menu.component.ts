import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

interface Option {
  label: string;
  value?: string; // Optional value property for video sources
  src?: string; // Optional src property for subtitles
  srclang?: string; // Optional srclang property for subtitles
  default?: boolean; // Optional default property for subtitles
}

@Component({
  selector: 'app-settings-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings-menu.component.html',
  styleUrl: './settings-menu.component.scss'
})
export class SettingsMenuComponent implements AfterViewInit {
  @Input() title: string = '';
  @Input() options: Option[] = [];
  @Input() menuOpen: boolean = false;
  @Input() selectedOption?: Option;
  @Input() cancelButton: boolean = false;
  @Input() cancelButtonLabel: string = 'Cancelar';
  @Output() optionSelected = new EventEmitter<Option>();
  @Output() menuClosed = new EventEmitter();
  @Output() optionCancelled = new EventEmitter();

  @ViewChild('settingsMenu') settingsMenuRef?: ElementRef;

  settingsMenu: HTMLDivElement = this.settingsMenuRef?.nativeElement;

  ngAfterViewInit(): void {
    this.settingsMenu = this.settingsMenuRef?.nativeElement;
  }

  @HostListener('document:click', ['$event'])
  @HostListener('webkitclick', ['$event'])
  @HostListener('mozbrowserclick', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (this.menuOpen && !this.settingsMenu.contains((event.target as HTMLElement))) {
      this.menuOpen = false;
      this.settingsMenu.style.display = 'none';
      this.onMenuClosed();
    }
  }

  onOptionSelected(option: Option) {
    this.optionSelected.emit(option);
    this.menuOpen = false;
  }

  onMenuClosed() {
    this.menuClosed.emit();
  }

  onCancelOption() {
    this.optionCancelled.emit();
  }

}
