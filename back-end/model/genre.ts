export class Genre {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    // Getters
    get getName(): string {
        return this.name;
    }

    // Setters
    set setName(name: string) {
        this.name = name;
    }
}