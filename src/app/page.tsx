"use client"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Trash, ListCheck, Sigma, LoaderCircle  } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import EditTask from "@/components/edit-task";
import {getTask} from "@/actions/get-tasks-from-db"
import { useEffect, useState } from "react";
import type { Task } from "@/generated/prisma/client"
import { NewTask } from "@/actions/add-task"
import { deleteTask } from "@/actions/delete-task"
import { toast } from "sonner";
import { updateTaskStatus } from "@/actions/toggle-done";
import Filter from "@/components/filter";
import { FilterType } from "@/components/filter";
import {deleteCompletedTask} from "@/actions/clear-completed-task"



const Home = () => {

  const [taskList, setTaskList] = useState<Task[]>([])
  const [task, setTask] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all')

  const handleGetTask = async () => {
    try{
      const tasks = await getTask()
        if(!tasks) return
        setTaskList(tasks)
      }catch(error){
        throw error
      }
  }

  const handleAddTask = async  () => {
    setLoading(true)
    try {
      if(task.length === 0 || !task) {
        toast.error("Insira uma tarefa")
        setLoading(false)
      return
    }

    const myNewTask = await NewTask(task)

      if(!myNewTask) return

      setTask('')

      await handleGetTask()

      toast.success("atividade adicionada com sucesso!")

    }catch(error){
      throw error
    }
    setLoading(false)
  }

  const handleDeleteTask = async (id: string) =>{

    try{
      if (!id) return

      const deletedTask = await deleteTask(id)

      if(!deletedTask) return
      await handleGetTask()
      toast.warning("atividade deletada com sucesso!")

      return

    }catch(error){
      throw error
    }
    
    
  }

  const handleToggleTask = async (taskId: string) => {
    const previousTask = [... taskList]

    try{
      setTaskList((prev) => {
      const updatedTaskList = prev.map(task => {
        if(task.id === taskId) {
          return {
            ... task,
            done : !task.done
          }
        }else {
          return task
        }
      })
      return updatedTaskList
    })
     await updateTaskStatus(taskId)
    
    }catch(error){
      setTaskList(previousTask)
      throw error
    }
  }

  const clearCompletedTask = async () => {
    try {
      const deletedTask = await deleteCompletedTask()

      if (!deletedTask) return

      await handleGetTask()
      toast.success("tarefas concluídas removidas com sucesso!")
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getTask().then((tasks) => {
      if (tasks) setTaskList(tasks)
    })
  }, [])

  const filteredTasks = taskList.filter(task => {
    switch(currentFilter) {
      case "pending":
        return !task.done
      case "completed":
        return task.done
      default:
        return true
    }
  })

  return (
    <main className = "w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className= "w-lg ">
        <CardHeader className = "flex gap-2">
          <Input placeholder ="Adicionar tarefa" onChange={(e)=> setTask(e.target.value)} value={task} />
          <Button className="cursor-pointer" onClick={handleAddTask}>

          {loading ? <LoaderCircle className="animate-spin"/> : <Plus/>}
            Cadastrar </Button >
        </CardHeader>
        
        <CardContent>
          <Separator className="mb-4"/>
          <Filter currentFilter = {currentFilter} setCurrentFilter = {setCurrentFilter}/>

          <div className= "mt-4 border b"> 
          {taskList.length === 0 && <p className="text-xs border-t py-4">Você não possui tarefas cadastradas.</p>}
           {filteredTasks.map(task => (
            <div className ="h-14 flex justify-between items-center border-b border-t" key = {task.id}>
              <div className = {`${task.done ? 'w-1 h-full bg-green-400' : 'w-1 h-full bg-red-400'}`}></div>

              <p className="flex-1 px-2 text-sm cursor-pointer hover:text-gray-700" 
              onClick={() => handleToggleTask(task.id)}
              >{task.task}</p>

              <div className = "flex gap-2 items-center">

              <EditTask task ={task} handleGetTask ={handleGetTask} />
          
                 <Trash size ={16} className="cursor-pointer" onClick={() => handleDeleteTask(task.id)}/> 
              </div>
            </div>
           ))} 

          </div>
          
          <div className = "flex justify-between mt-4">
            <div className= " flex gap-2 items-center">
            <ListCheck size={18}/>
            <p className= "text-xs"> Tarefas concluidas ({taskList.filter(task => task.done).length}/{taskList.length}) </p>
            </div>

            <AlertDialog>
            <AlertDialogTrigger
              render={<Button className="text-xs h-7 cursor-pointer" variant="outline" />}
            >
              <Trash/> Limpar Tarefas Concluidas
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza que deseja excluir {taskList.filter(task => task.done).length} itens? </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction className="cursor-pointer" onClick={clearCompletedTask}>Sim</AlertDialogAction>
                <AlertDialogCancel variant="outline" size="default" className="cursor-pointer">Cancelar</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          </div>

          <div className="h-2 w-full bg-gray-200 mt-4 rounded-md">
            <div className= "h-full bg-purple-700 rounded-md" style={{ 
              width: 
              `${((taskList.filter(task => task.done).length / taskList.length)) * 100}%` 
              }}></div>
          </div>

          <div className= "flex justify-end items-center mt-2 gap-2">
            <Sigma size={16}/>
            <p className="text-xs">{taskList.length} tarefas no total</p>
          </div>

          

        </CardContent>
        
        
      </Card>
    </main>
  );
}
export default Home;