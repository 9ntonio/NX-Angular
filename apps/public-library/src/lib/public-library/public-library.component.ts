import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'lib-public-library',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './public-library.component.html',
    styleUrl: './public-library.component.scss', // Changed from .css to .scss
})
export class PublicLibraryComponent {}
