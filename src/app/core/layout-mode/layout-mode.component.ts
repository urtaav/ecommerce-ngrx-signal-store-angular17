import { NgClass } from '@angular/common';
import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-layout-mode',
  standalone: true,
  imports: [NgClass],
  templateUrl: './layout-mode.component.html',
  styleUrl: './layout-mode.component.scss'
})
export class LayoutModeComponent implements OnInit{


  isActive = input<boolean>();
  len = input<number>(0);
  @Output('changeLayout') changeLayout = new EventEmitter<number>();

  items:number[] = [];
  
  ngOnInit(): void {
    for (let i = 0; i < this.len(); i++) {
      this.items.push(i);
    }
  }
}
