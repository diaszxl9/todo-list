import {prisma} from "@/utils/prisma"

const getTask = async () => {
    const tasks = await prisma.task.findMany()

    if(!tasks) return

    console.log(tasks)
    return tasks
}