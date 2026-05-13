'use server'

import { auth } from "@/auth";
import { prisma } from "@/app/lib/db";
import * as z from "zod"
import { revalidatePath } from "next/cache";

const expenseSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    amount: z.coerce.number().positive(),
    category: z.string(),
    date: z.string().min(1)
})

export const addExpense = async (formData: FormData) => {
    const session = await auth()
    if (!session?.user?.id)
        return { error: 'Unauthorized' }

    const validatedFields = expenseSchema.safeParse({
        title: formData.get('title') as string,
        amount: formData.get('amount') as string,
        category: formData.get('category') as string,
        date: formData.get('date') as string
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Please check your input'
        }
    }



    await prisma.expenses.create({
        data: {
            title: validatedFields.data.title,
            amount: validatedFields.data.amount,
            category: validatedFields.data.category,
            date: new Date(validatedFields.data.date),
            userId: session?.user?.id as string,
        },
    })
    revalidatePath('/dashboard')
    return { success: true }
}
