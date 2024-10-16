export class User {
    private name: string;
    private password: string;
    private email: string;
    private creationDate: Date;

    constructor(name: string, password: string, email: string) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.creationDate = new Date();
    }

    // Getters
    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getCreationDate(): Date {
        return this.creationDate;
    }

    getPassword(): string {
        return this.password;
    }

    // Setters
    setName(name: string): void {
        this.name = name;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    setEmail(email: string): void {
        this.email = email;
    }
}
