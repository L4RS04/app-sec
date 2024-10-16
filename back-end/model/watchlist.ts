export class Watchlist {
    private name: string;
    private description: string;
    private creation_date: Date;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.creation_date = new Date();
    }

    // Getters
    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getCreationDate(): Date {
        return this.creation_date;
    }
    
    // Setters
    public setName(name: string): void {
        this.name = name;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public setCreationDate(creation_date: Date): void {
        this.creation_date = creation_date;
    }
}

