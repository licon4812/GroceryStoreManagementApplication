import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

    private theme = signal<string | null>(null);

    constructor() { 
        this.theme.set(localStorage.getItem('theme'));
        if (this.theme() == null)
            this.theme.set(environment.theme.light);
    
        this.setTheme(this.theme()!)
    }

    private setTheme(newTheme: string) {
        const themeLink = <HTMLLinkElement>document.getElementById('app-theme')
        
        localStorage.setItem('theme', newTheme);
        this.theme.set(newTheme);
        newTheme = `assets/themes/${newTheme}/theme.css`
        themeLink.setAttribute('href', newTheme);
    }

    changeTheme(dark?: boolean) {
        const themeLink = <HTMLLinkElement>document.getElementById('app-theme')

        let newTheme = this.theme()!;
        
        if (dark != null && dark)
        {
            newTheme = environment.theme.dark;
        }
        else {
            newTheme = this.theme() === environment.theme.light ? environment.theme.dark : environment.theme.light
        }

        this.setTheme(newTheme);
    }
}
