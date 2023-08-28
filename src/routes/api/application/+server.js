
import { json } from '@sveltejs/kit';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function POST({ request }) {

    let responseStatus = "Your application has been submitted!";

    const formData = await request.json();

    // Check if the email already exists
    const duplicateEmail = await prisma.applicationForm.findFirst({
        where: {
            email: formData.email
        }
    });

    if (duplicateEmail) {
        responseStatus = formData.email + " has already been added!"
    }
    else {
        // insert the new email into the database
        await prisma.applicationForm.create({
            data: formData
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