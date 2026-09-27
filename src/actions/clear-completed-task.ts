"use server"

import { prisma } from "@/utils/prisma"

export const deleteCompletedTask = async () => {
    try{
        const deletedTasks = await prisma.task.deleteMany({
            where: {done: true}
        })

        return deletedTasks
    }catch(error){
        throw error
    }
}