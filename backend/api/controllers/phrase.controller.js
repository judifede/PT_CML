import { prisma } from "../db/index.db.js";

/* 
Devuelve una frase aleatoria de uno de los tipos de creativity
creativityLevel -> Tabla creativity puede ser 1 o 0
*/
const getRandomPhrase = async (creativityLevel) => {
    const randomPhrase = await prisma.$queryRaw`
        SELECT * FROM Phrase
        where creativity = ${creativityLevel}
        ORDER BY RANDOM()
        LIMIT 1
    `;

    return randomPhrase[0];
}

//TODO: endpoint c0 POST /generate-text
//req.body.creativity
//req.body.prompt
export const getOnePhrase = async (req, res) => {
    try {
        const creativityLevel = req.body.creativity
        let phrase = await prisma.phrase.findFirst(({
            where: {
                creativity: creativityLevel,
                name: { contains: req.body.prompt }
            }
        }))

        //TODO: Quitar log
        console.log(phrase);

        if(phrase === null || req.body.maxLength > phrase.name.length){
            phrase = getRandomPhrase(creativityLevel)
        }

        return { phrase, result: "OK"}

    } catch (error) {
        console.error(error)
    }
}