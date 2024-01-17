import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-actions',
  standalone: true,
  imports: [],
  templateUrl: './button-actions.component.html',
  styleUrl: './button-actions.component.scss'
})
export class ButtonActionsComponent {
  @Input() titleBtn!: string;
  @Output() onClickEmitter = new EventEmitter<boolean>();

  public handleClick() : void {
    this.onClickEmitter.emit(true);
  }
}
