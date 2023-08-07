import prisma from "$lib/prisma";

export async function load() {
    const parts = await prisma.part.findMany();
	return {
		summaries: parts.map((parts) => ({
			name: parts.name,
			quantity: parts.quantity
		}))
	};
}
