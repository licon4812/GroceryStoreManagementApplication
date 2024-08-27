import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterLink, MenuModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit {
    constructor(private authService: AuthService, private themeService: ThemeService) {}

    profileItems: MenuItem[] | undefined;
    darkMode: boolean = false;

    ngOnInit(): void {
        this.profileItems = [
            {
                label: 'Profile',
                items: [
                    {
                        label: 'Toggle Dark Mode',
                        icon: 'pi pi-moon',
                        command: () => {
                            this.themeService.changeTheme();
                        }
                    },
                    {
                        label: 'Sign out',
                        icon: 'pi pi-sign-out',
                        command: () => { 
                            this.authService.logout();
                        }
                    }
                ]
            }
        ];
    }
}
