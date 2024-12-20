import { PrismaClient } from "@prisma/client";
import { Genre } from "../model/genre/genre";
import { Role } from "../model/user/role";
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();

const main = async () => {
    try {
    await prisma.watchlist.deleteMany();
    await prisma.media.deleteMany();
    await prisma.user.deleteMany();

    const hashedPassword1 = await bcrypt.hash("XanderD123!", 12);
    const hashedPassword2 = await bcrypt.hash("LarsM123!", 12);
    const hashedPassword3 = await bcrypt.hash("YodaM123!", 12);

    const user1 = await prisma.user.create({
        data : {
            name: "Xander",
            password: hashedPassword1,
            email: "xander@bingevault.com",
            role: Role.ADMIN,
        },
    });

    const user2 = await prisma.user.create({
        data : {
            name: "Lars",
            password: hashedPassword2,
            email: "lars@bingevault.com",
            role: Role.PREMIUM,
        },
    });

    const user3 = await prisma.user.create({
        data : {
            name: "Yoda",
            password: hashedPassword3,
            email: "yoda@bingevault.com",
            role: Role.USER,
        },
    });

    const media1 = await prisma.media.create({
        data: {
            title: "Star Wars: Episode I - The Phantom Menace",
            description: "Jedi warriors Qui-Gon Jinn and Obi-Wan Kenobi are tasked with protecting a princess during a trade dispute between planets. During their mission, they meet a small boy who has the Force within him.",
            releaseYear: 1999,
            type: "MOVIE",
            genres: [Genre.SCIFI, Genre.ACTION, Genre.ADVENTURE],
            duration: 136,
            director: "George Lucas",
        },
    });

    const media2 = await prisma.media.create({
        data: {
            title: "Breaking Bad",
            description: "A high school chemistry teacher turned methamphetamine producer partners with a former student to build a drug empire while a DEA agent pursues them.",
            releaseYear: 2008,
            type: "SERIES",
            genres: [Genre.DRAMA, Genre.CRIME],
            numberOfSeasons: 5,
        },
    });

    const media3 = await prisma.media.create({
        data: {
            title: "Star Wars: Episode II - Attack of the Clones",
            description: "While pursuing an assassin, Obi Wan uncovers a sinister plot to destroy the Republic. With the fate of the galaxy hanging in the balance, the Jedi must defend the galaxy against the evil Sith.",
            releaseYear: 2002,
            type: "MOVIE",
            genres: [Genre.SCIFI, Genre.ACTION, Genre.ADVENTURE],
            duration: 142,
            director: "George Lucas",
        },
    });

    const media4 = await prisma.media.create({
        data: {
            title: "Prison Break",
            description: "The series revolves around two brothers: Lincoln Burrows and Michael Scofield; Lincoln has been sentenced to death for a crime he did not commit, while Michael devises an elaborate plan to help his brother escape prison and clear his name.",
            releaseYear: 2005,
            type: "SERIES",
            genres: [Genre.ACTION, Genre.CRIME, Genre.SUSPENSE],
            numberOfSeasons: 4,
        },
    });

    const media5 = await prisma.media.create({
        data: {
            title: "Suits",
            description: "A college dropout, Mike Ross, possesses immense competence. A set of circumstances leads to him effectively working as a law associate for Harvey Specter despite not having gone to law school.",
            releaseYear: 2011,
            type: "SERIES",
            genres: [Genre.DRAMA, Genre.COMEDY],
            numberOfSeasons: 9,
        },
    });

    const media6 = await prisma.media.create({
        data: {
            title: "Star Wars: Episode III - Revenge of the Sith",
            description: "The Clone Wars rage on, and the Sith scheme to bring the Jedi to their knees. The fate of the galaxy rests in the hands of a few brave Jedi, as well as a small group of rebels.",
            releaseYear: 2005,
            type: "MOVIE",
            genres: [Genre.SCIFI, Genre.ACTION, Genre.ADVENTURE],
            duration: 140,
            director: "George Lucas",
        },
    });

    const media7 = await prisma.media.create({
        data: {
            title: "Star Wars: Episode IV - A New Hope",
            description: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
            releaseYear: 1977,
            type: "MOVIE",
            genres: [Genre.SCIFI, Genre.ACTION, Genre.ADVENTURE],
            duration: 121,
            director: "George Lucas",
        },
    });

    const media8 = await prisma.media.create({
        data: {
            title: "Star Wars: Episode V - The Empire Strikes Back",
            description: "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader.",
            releaseYear: 1980,
            type: "MOVIE",
            genres: [Genre.SCIFI, Genre.ACTION, Genre.ADVENTURE],
            duration: 124,
            director: "Irvin Kershner",
        },
    });

    const media9 = await prisma.media.create({
        data: {
            title: "Star Wars: Episode VI - Return of the Jedi",
            description: "After a daring mission to rescue Han Solo from Jabba the Hutt, the Rebels dispatch to Endor to destroy the second Death Star. Meanwhile, Luke struggles to help Darth Vader back from the dark side without falling into the Emperor's trap.",
            releaseYear: 1983,
            type: "MOVIE",
            genres: [Genre.SCIFI, Genre.ACTION, Genre.ADVENTURE],
            duration: 131,
            director: "Richard Marquand",
        },
    });

    const media10 = await prisma.media.create({
        data: {
            title: "Star Wars: Episode VII - The Force Awakens",
            description: "As a new threat to the galaxy rises, Rey, a desert scavenger, and Finn, an ex-stormtrooper, must join Han Solo and Chewbacca to search for the one hope of restoring peace.",
            releaseYear: 2015,
            type: "MOVIE",
            genres: [Genre.SCIFI, Genre.ACTION, Genre.ADVENTURE],
            duration: 138,
            director: "J.J. Abrams",
        },
    });

    const media11 = await prisma.media.create({
        data: {
            title: "Star Wars: Episode VIII - The Last Jedi",
            description: "Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares for battle with the First Order.",
            releaseYear: 2017,
            type: "MOVIE",
            genres: [Genre.SCIFI, Genre.ACTION, Genre.ADVENTURE],
            duration: 152,
            director: "Rian Johnson",
        },
    });

    const media12 = await prisma.media.create({
        data: {
            title: "Star Wars: Episode IX - The Rise of Skywalker",
            description: "The surviving members of the resistance face the First Order once again, and the legendary conflict between the Jedi and the Sith reaches its peak bringing the Skywalker saga to its end.",
            releaseYear: 2019,
            type: "MOVIE",
            genres: [Genre.SCIFI, Genre.ACTION, Genre.ADVENTURE],
            duration: 142,
            director: "J.J. Abrams",
        },
    });

    const media13 = await prisma.media.create({
        data: {
            title: "The Mandalorian",
            description: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
            releaseYear: 2019,
            type: "SERIES",
            genres: [Genre.SCIFI, Genre.ACTION, Genre.ADVENTURE],
            numberOfSeasons: 2,
        }
    });

    const media14 = await prisma.media.create({
        data: {
            title: "The Falcon and the Winter Soldier",
            description: "Following the events of 'Avengers: Endgame,' Sam Wilson/Falcon and Bucky Barnes/Winter Soldier team up in a global adventure that tests their abilities -- and their patience.",
            releaseYear: 2021,
            type: "SERIES",
            genres: [Genre.SCIFI, Genre.ACTION, Genre.ADVENTURE],
            numberOfSeasons: 1,
        }
    });

    const media15 = await prisma.media.create({
        data: {
            title: "Game of Thrones",
            description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
            releaseYear: 2011,
            type: "SERIES",
            genres: [Genre.FANTASY, Genre.DRAMA],
            numberOfSeasons: 8,
        }
    });

    const media16 = await prisma.media.create({
        data: {
            title: "Lupin",
            description: "Inspired by the adventures of Arsène Lupin, gentleman thief Assane Diop sets out to avenge his father for an injustice inflicted by a wealthy family.",
            releaseYear: 2021,
            type: "SERIES",
            genres: [Genre.ACTION, Genre.CRIME],
            numberOfSeasons: 3,
        }
    });

    const media17 = await prisma.media.create({
        data: {
            title: "The Queen's Gambit",
            description: "Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA. But child stardom comes at a price.",
            releaseYear: 2020,
            type: "SERIES",
            genres: [Genre.DRAMA],
            numberOfSeasons: 1,
        }
    });

    const media18 = await prisma.media.create({
        data: {
            title: "The Witcher",
            description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
            releaseYear: 2019,
            type: "SERIES",
            genres: [Genre.FANTASY, Genre.ACTION],
            numberOfSeasons: 2,
        }
    });

    const media19 = await prisma.media.create({
        data: {
            title: "Money Heist",
            description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
            releaseYear: 2017,
            type: "SERIES",
            genres: [Genre.ACTION, Genre.CRIME],
            numberOfSeasons: 5,
        }
    });
            

    await prisma.watchlist.create({
        data: {
            name: "Xander's Watchlist",
            description: "Movies that Xander really likes!",
            userId: user1.id,
            mediaItems: {
                connect: [ { id: media1.id }, { id: media2.id }, { id: media3.id }, { id: media4.id }, { id: media5.id }, { id: media6.id }, { id: media13.id }, { id: media15.id } ],
            },
        },
    });

    await prisma.watchlist.create({
        data: {
            name: "Lars' Watchlist",
            description: "The best movies ever!",
            userId: user2.id,
            mediaItems: {
                connect: [ { id: media2.id }, { id: media7.id }, { id: media8.id }, { id: media9.id }, { id: media10.id }, { id: media11.id }, { id: media12.id }, { id: media14.id } ],
            },
        },
    });

    await prisma.watchlist.create({
        data: {
            name: "Star Wars starter pack",
            description: "A watchlist containing all Star Wars movies and series!",
            userId: user3.id,
            mediaItems: {
                connect: [
                    { id: media1.id },
                    { id: media3.id },
                    { id: media6.id },
                    { id: media7.id },
                    { id: media8.id },
                    { id: media9.id },
                    { id: media10.id },
                    { id: media11.id },
                    { id: media12.id },
                    { id: media13.id },
                ],
            },
        },
    });

    await prisma.watchlist.create({
        data: {
            name: "Binge worthy series",
            description: "A watchlist containing the best series to binge-watch!",
            userId: user1.id,
            mediaItems: {
                connect: [
                    { id: media2.id },
                    { id: media4.id },
                    { id: media5.id },
                    { id: media13.id },
                    { id: media14.id },
                    { id: media15.id },
                ],
            },
        },
    });

    await prisma.watchlist.create({
        data: {
            name: "Want to watch",
            description: "A watchlist containing media items that I want to watch!",
            userId: user2.id,
            mediaItems: {
                connect: [
                    { id: media16.id },
                    { id: media17.id },
                    { id: media18.id },
                    { id: media19.id },
                    { id: media1.id },
                ],
            },
        }
    });

    console.log("Data seeded successfully");
} catch (error) {
    console.error("Error seeding data:", error);
} finally {
    await prisma.$disconnect();
}
};

main().catch((e) => {
    console.error(e);
    prisma.$disconnect().finally(() => process.exit(1));
});