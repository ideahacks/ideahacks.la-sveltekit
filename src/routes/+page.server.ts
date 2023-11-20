import { Prisma, PrismaClient } from '@prisma/client';
import { fail } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const actions = {
	submitEmail: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();

		if (email === undefined) {
			return fail(400, { email, invalid: true });
		}

		try {
			await prisma.email.create({
				data: {
					email
				}
			});
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError && e.code ==='P2002') {
					console.log(`Email ${email} already in database`);
          // For privacy reasons, don't reveal the emails we have
					return { success: true };
			}

      return fail(400, {email, invalid: true})
		}

    return {success: true}
	}
};
