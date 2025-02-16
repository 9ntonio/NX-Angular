import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    private readonly imageUrls = [
        'https://placecats.com/bella/300/200',
        'https://placecats.com/millie_neo/300/200',
        'https://placecats.com/millie/300/200',
        'https://placecats.com/neo_banana/300/200',
        'https://placecats.com/neo_2/300/200',
        'https://placecats.com/poppy/300/200',
        'https://placecats.com/louie/300/200'
    ];

    private usedImages: Set<string> = new Set();

    getUniqueRandomImage (): string {

        const availableImages = this.imageUrls.filter((url) => !this.usedImages.has(url));

        // !! If all images are used, reset the tracking
        if (availableImages.length === 0) {

            this.usedImages.clear();
            return this.getUniqueRandomImage();

        }

        const randomIndex = Math.floor(Math.random() * availableImages.length);
        const selectedImage = availableImages[randomIndex];
        this.usedImages.add(selectedImage);
        return selectedImage;

    }

}
