import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ui-pages',
  templateUrl: './ui-pages.component.html',
  styleUrls: ['./ui-pages.component.css'],
})
export class UiPagesComponent implements OnInit {
  constructor(private elRef: ElementRef) {}
  slides: any;
  btnRight = <HTMLElement>document.querySelector('.right');
  btnLeft = <HTMLElement>document.querySelector('.left');
  curSlide = 0;
  MaxSlide: any;
  ngAfterViewInit() {}
  ngOnInit(): void {
    let slides = Array.from(
      this.elRef.nativeElement.querySelectorAll('.slide')
    );
    this.slides = slides;
    this.MaxSlide = this.slides.length;
    // this.moveSlide(this.curSlide);
    // this.btnRight.addEventListener('click', this.slideRight);
    // this.btnLeft.addEventListener('click', this.slideLeft);
  }

  moveSlide(this: UiPagesComponent, cur: number): void {
    console.log(this.slides[0]);
    if (cur == 0) {
      for (let i = 0; i < this.slides.length; i++) {
        this.slides[i].classList.add(`s1-${i + 1}`);
        this.slides[i].classList.remove(`s2-${i + 1}`);
        this.slides[i].classList.remove(`s3-${i + 1}`);
        this.slides[i].classList.remove(`s4-${i + 1}`);
      }
    } else if (cur == 1) {
      for (let i = 0; i < this.slides.length; i++) {
        this.slides[i].classList.add(`s2-${i + 1}`);
        this.slides[i].classList.remove(`s1-${i + 1}`);
        this.slides[i].classList.remove(`s3-${i + 1}`);
        this.slides[i].classList.remove(`s4-${i + 1}`);
      }
    } else if (cur == 2) {
      for (let i = 0; i < this.slides.length; i++) {
        this.slides[i].classList.add(`s3-${i + 1}`);
        this.slides[i].classList.remove(`s1-${i + 1}`);
        this.slides[i].classList.remove(`s2-${i + 1}`);
        this.slides[i].classList.remove(`s4-${i + 1}`);
      }
    } else if (cur == 3) {
      for (let i = 0; i < this.slides.length; i++) {
        this.slides[i].classList.add(`s4-${i + 1}`);
        this.slides[i].classList.remove(`s1-${i + 1}`);
        this.slides[i].classList.remove(`s2-${i + 1}`);
        this.slides[i].classList.remove(`s3-${i + 1}`);
      }
    }
  }

  slideRight() {
    //console.log(this.curSlide);
    if (this.curSlide === this.MaxSlide - 1) {
      this.curSlide = 0;
      this.moveSlide(this.curSlide);
    } else {
      this.curSlide++;
      this.moveSlide(this.curSlide);
    }
  }
  slideLeft() {
    if (this.curSlide === 0) {
      this.curSlide = this.MaxSlide - 1;
      this.moveSlide(this.curSlide);
    } else {
      this.curSlide--;
      this.moveSlide(this.curSlide);
    }
  }
}
