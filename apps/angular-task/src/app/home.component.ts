import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicLibraryComponent } from '@crx/public-library';

@Component({
    selector: 'crx-home',
    standalone: true,
    imports: [CommonModule, PublicLibraryComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {}
