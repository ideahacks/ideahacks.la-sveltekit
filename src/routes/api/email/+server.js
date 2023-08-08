
import { json } from '@sveltejs/kit';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST({ request }) {
    const { email } = await request.json();

    let responseStatus = email + " has been added!"

    // Check if the email already exists
    const duplicateEmail = await prisma.email.findFirst({
        where: {
            email
        }
    });

    if (duplicateEmail) {
        responseStatus = email + " has already been added!"
    }
    else {
        // insert the new email into the database
        const emailCreated = await prisma.email.create({
            data: {
                email: email
            }
        })
    }

    return json(responseStatus);
}

// export async function POST({ request }) {
//     const data = await request.formData();
//     console.log(data.get("email"));
//     return json({});
// }

export async function GET() {
    const emails = await prisma.email.findMany();
    console.log(emails);
    return json({ emails });
}