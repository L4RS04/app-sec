export class Genre {
    private name: string;

    constructor(genre: {
        name: string;
    }) {
        this.validate(genre);

        this.name = genre.name;
    }

    // Getters
    public get getName(): string {
        return this.name;
    }

    // Setters
    public set setName(name: string) {
        this.name = name;
    }

    // Validation
    public validate(genre: {
        name: string;
    }) {
        if (!genre.name?.trim()) {
            throw new Error('Genre name is required');
    }
}
}