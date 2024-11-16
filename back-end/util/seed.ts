import { PrismaClient } from "@prisma/client";
import { set} from 'date-fns';
import { Genre } from "../model/genre";
import { ca } from "date-fns/locale";

const prisma = new PrismaClient();

const main = async () => {
    try {
    await prisma.watchlist.deleteMany();
    await prisma.movie.deleteMany();
    await prisma.series.deleteMany();
    await prisma.media.deleteMany();
    await prisma.user.deleteMany();

    const user1 = await prisma.user.create({
        data : {
            name: "Xander",
            password: "XanderD123!",
            email: "xander@bingevault.com",
        },
    });

    const user2 = await prisma.user.create({
        data : {
            name: "Lars",
            password: "LarsL123!",
            email: "lars@bingevault.com",
        },
    });

    const media1 = await prisma.media.create({
        data: {
            title: "Star Wars: Episdode I - The Phantom Menace",
            description: "Jedi warriors Qui-Gon Jinn and Obi-Wan Kenobi are tasked with protecting a princess during a trade dispute between planets. During their mission, they meet a small boy who has the Force within him.",
            releaseYear: 1999,
            type: "movie",
            genres: [Genre.SCIFI, Genre.ACTION, Genre.ADVENTURE],  
            }
    });

    await prisma.movie.create({
        data: {
            mediaId: media1.id,
            duration: 136,
            director: "George Lucas",
        },
    });

    const media2 = await prisma.media.create({
        data: {
            title: "Star Wars: Episode II - Attack of the Clones",
            description: "While pursuing an assassin, Obi Wan uncovers a sinister plot to destroy the Republic. With the fate of the galaxy hanging in the balance, the Jedi must defend the galaxy against the evil Sith..",
            releaseYear: 2002,
            type: "movie",
            genres: [Genre.SCIFI, Genre.ACTION, Genre.ADVENTURE],  
        },
    });

    await prisma.movie.create({
        data: {
            mediaId: media2.id,
            duration: 142,
            director: "George Lucas",
        },
    });

    const media3 = await prisma.media.create({
        data: {
            title: "Star Wars: Episode III - Revenge of the Sith",
            description: "Anakin joins forces with Obi-Wan and sets Palpatine free from the evil clutches of Count Doku. However, he falls prey to Palpatine and the Jedis' mind games and gives into temptation.",
            releaseYear: 2005,
            type: "movie",
            genres: [Genre.SCIFI, Genre.ACTION, Genre.ADVENTURE],  
        },
    });

    await prisma.movie.create({
        data: {
            mediaId: media3.id,
            duration: 140,
            director: "George Lucas",
        },
    });

    const media4 = await prisma.media.create({
        data: {
            title: "Prison Break",
            description: "The series revolves around two brothers: Lincoln Burrows (Dominic Purcell) and Michael Scofield (Wentworth Miller); Lincoln has been sentenced to death for a crime he did not commit, while Michael devises an elaborate plan to help his brother escape prison and clear his name.",
            releaseYear: 2005,
            type: "series",
            genres: [Genre.ACTION, Genre.CRIME, Genre.SUSPENSE],
        },
    });

    await prisma.series.create({
        data: {
            mediaId: media4.id,
            numberOfSeasons: 5,
        },
    });

    const media5 = await prisma.media.create({
        data: {
            title: "Suits",
            description: "A college dropout, Mike Ross, possesses immense competence. A set of circumstances leads to him effectively working as a law associate for Harvey Specter despite not having gone to law school.",
            releaseYear: 2011,
            type: "series",
            genres: [Genre.DRAMA, Genre.COMEDY],
        },
    });

    await prisma.series.create({
        data: {
            mediaId: media5.id,
            numberOfSeasons: 9,
        },
    });

    await prisma.watchlist.create({
        data: {
            name: "Xander's Watchlist",
            description: "My favourite movies and series",
            creatorId: user1.id,
            mediaItems: {
                connect: [{ id: media1.id }, { id: media4.id }, { id: media5.id }],
            },
        },
    });

    await prisma.watchlist.create({
        data: {
            name: "Lars' Watchlist",
            description: "My favourite movies and series",
            creatorId: user2.id,
            mediaItems: {
                connect: [{ id: media2.id }, { id: media3.id }, { id: media4.id }],
            },
        },
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