import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'lib-public-library',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './public-library.component.html',
    styleUrls: ['./public-library.component.scss'],
    // Add view encapsulation to prevent styles from leaking
    encapsulation: ViewEncapsulation.None
})
export class PublicLibraryComponent {}
