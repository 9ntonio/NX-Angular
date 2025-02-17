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

    // This map persists across navigation since service is singleton
    private readonly userImageMap = new Map<number, string>();

    getUniqueRandomImage (userId: number): string {

        // Always check the persistent map first
        const existingImage = this.userImageMap.get(userId);
        if (existingImage) {

            return existingImage;

        }

        // If no image exists, get the least used one
        const imageCounts = new Map<string, number>();
        this.userImageMap.forEach((url) => {

            imageCounts.set(url, (imageCounts.get(url) ?? 0) + 1);

        });

        let selectedImage = this.imageUrls[0];
        let lowestCount = Infinity;

        this.imageUrls.forEach((url) => {

            const count = imageCounts.get(url) ?? 0;
            if (count < lowestCount) {

                lowestCount = count;
                selectedImage = url;

            }

        });

        // Store in persistent map and return
        this.userImageMap.set(userId, selectedImage);
        return selectedImage;

    }

    clearImageAssignments (): void {

        this.userImageMap.clear();

    }

}
