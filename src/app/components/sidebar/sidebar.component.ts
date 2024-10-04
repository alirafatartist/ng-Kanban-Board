import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss', // Fix this to `styleUrls` not `styleUrl`
})
export class SidebarComponent {
  isSidebarHide: boolean = false;
  isDarkMode: boolean = false;
  logoSrc: string = 'assets/images/logo-dark.svg';
  iconClass:string="fa-solid fa-moon"

  @ViewChild('offcanvas') offcanvasElement!: ElementRef;
  showbtn(): void {
    if (
      this.offcanvasElement.nativeElement.classList[
        this.offcanvasElement.nativeElement.classList.length - 1
      ] === 'showing'
    ) {
      this.isSidebarHide = false;
    } else {
      this.isSidebarHide = true;
    }
  }
  checkAreaModel(): void {
    const ariaModal =
      this.offcanvasElement.nativeElement.getAttribute('aria-modal');
    if (ariaModal == 'true') {
      this.showbtn();
    }
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    // console.log(targetElement);
    if (targetElement.classList.contains('offcanvas-backdrop')) {
      this.checkAreaModel();
    }
  }

  toggleTheme(e:Event) {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      this.logoSrc = 'assets/images/logo-light.svg';
      this.iconClass="fa-solid fa-sun rotate"
    } else {
      this.logoSrc = 'assets/images/logo-dark.svg';
      this.iconClass="fa-solid fa-moon rotate"
    }
  }
}
