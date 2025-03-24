import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { ImageService } from '../services/image.service';

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
    styleUrls: ['./card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {

    private activeUser: User = {
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

    // Store the image URL to prevent multiple service calls
    private cachedImageUrl: string | null = null;

    @Input({ required: true })
    set user (value: User) {

        this.activeUser = value;
        // Reset cache when user changes
        this.cachedImageUrl = null;

    }

    get user (): User {

        return this.activeUser;

    }

    @Output() favoriteToggled = new EventEmitter<number>();

    constructor (private readonly imageService: ImageService) {}

    get randomImageUrl (): string {

        if (!this.user.id) {

            return '';

        }

        if (!this.cachedImageUrl) {

            this.cachedImageUrl = this.imageService.getUniqueRandomImage(this.user.id);

        }

        return this.cachedImageUrl;

    }

    onFavoriteClick (): void {

        this.favoriteToggled.emit(this.user.id);

    }

}
