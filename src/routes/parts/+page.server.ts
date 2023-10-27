import prisma from '$lib/prisma';

export async function load() {
	const parts = await prisma.part.findMany();
	return { parts };
}
