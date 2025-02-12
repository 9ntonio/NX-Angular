import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'crx-test',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="p-4 bg-blue-500 text-white rounded-lg">
            Test Component
        </div>
    `
})
export class TestComponent {}
