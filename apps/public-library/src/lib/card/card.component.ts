import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { ImageService } from '../services/image.service';

// !! Define the User type here since it's used in the component
// TODO: Move this to a shared types file
type User = {
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
};

@Component({
    selector: 'lib-card',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {

    // !! Use type annotation instead of interface for input
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

    @Output() favoriteToggled = new EventEmitter<number>();

    private readonly imageUrl: string;

    constructor (private readonly imageService: ImageService) {

        this.imageUrl = this.imageService.getUniqueRandomImage();

    }

    get randomImageUrl (): string {

        return this.imageUrl;

    }

    onFavoriteClick (): void {

        this.favoriteToggled.emit(this.user.id);

    }

}
