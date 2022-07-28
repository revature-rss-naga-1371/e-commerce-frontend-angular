export class Review {

    id: number;
    rating: number;
    name: string;
    description: string;

    constructor(id: number, rating: number, name: string, description: string) {
        this.id = id;
        this.rating = rating;
        this.name = name;
        this.description = description;
    }

}
