import { ChangeDetectionStrategy, Component , Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'lib-card',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {

    @Input({ required: true }) user: User = {
        id: 0,
        name: '',
        username: '',
        email: '',
        address: {
            street: '',
            suite: '',
            city: '',
            zipcode: '',
            geo: {
                lat: '',
                lng: ''
            }
        },
        phone: '',
        website: '',
        company: {
            name: '',
            catchPhrase: '',
            bs: ''
        }
    };

    private readonly imageUrls = [
        'https://placecats.com/bella/300/200',
        'https://placecats.com/millie_neo/300/200',
        'https://placecats.com/millie/300/200',
        'https://placecats.com/neo_banana/300/200',
        'https://placecats.com/neo_2/300/200'
    ];

    private availableIndices: number[] = [];

    get randomImageUrl (): string {

        // !! Reset available indices if empty
        if (this.availableIndices.length === 0) {

            this.availableIndices = Array.from({ length: this.imageUrls.length }, (_, i) => i);

        }

        // !! Get random index from available indices
        const randomPosition = Math.floor(Math.random() * this.availableIndices.length);
        const selectedIndex = this.availableIndices.splice(randomPosition, 1)[0];

        return this.imageUrls[selectedIndex];

    }

}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
    isFavorite?: boolean;
}
