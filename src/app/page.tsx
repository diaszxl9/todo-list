"use client"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Info, Menu, Check, Trash, ListCheck, Sigma } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
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
import { useState } from "react";
import type { Task } from "@/generated/prisma/client"



const Home = () => {

  const [taskList, setTaskList] = useState<Task[]>([])

  const handleGetTask = async () => {
    const tasks = await getTask()

    if(!tasks) return

    setTaskList(tasks)

    console.log(tasks)
  }

console.log(taskList)

  return (
    <main className = "w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className= "w-lg ">
        <CardHeader className = "flex gap-2">
          <Input placeholder ="Adicionar tarefa" />
          <Button className="cursor-pointer"> <Plus/> Cadastrar </Button >
        </CardHeader>
        <Button onClick={handleGetTask}>Buscar Tarefas</Button>
        <CardContent>
          <Separator className="mb-4"/>
          <div className="flex gap-2">
            <Badge className="cursor-pointer" variant="default"> <Menu/> Todas </Badge>
            <Badge className="cursor-pointer" variant="outline"> <Info/> Não finalizadas </Badge>
            <Badge className="cursor-pointer" variant="outline"> <Check/> Concluidas </Badge>
          </div>

          <div className= "mt-4 border b"> 

            <div className ="h-14 flex justify-between items-center border-b border-t">
              <div className = "w-1 h-full bg-green-300"></div>
              <p className="flex-1 px-2 text-sm"> Estudar React </p>
              <div className = "flex gap-2 items-center">

              <EditTask/>
          
                 <Trash size ={16} className="cursor-pointer"/> 
              </div>
            </div>

          </div>
          
          <div className = "flex justify-between mt-4">
            <div className= " flex gap-2 items-center">
            <ListCheck size={18}/>
            <p className= "text-xs"> Tarefas concluidas (3/3)</p>
            </div>

            <AlertDialog>
            <AlertDialogTrigger
              render={<Button className="text-xs h-7 cursor-pointer" variant="outline" />}
            >
              <Trash/> Limpar Tarefas Concluidas
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza que deseja excluir X itens? </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Sim</AlertDialogAction>
                <AlertDialogCancel variant="outline" size="default">Cancelar</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          </div>

          <div className="h-2 w-full bg-gray-200 mt-4 rounded-md">
            <div className= "h-full bg-purple-700 rounded-md" style={{ width: '50%' }}></div>
          </div>

          <div className= "flex justify-end items-center mt-2 gap-2">
            <Sigma size={16}/>
            <p className="text-xs">3 tarefas no total</p>
          </div>

          

        </CardContent>
        
        
      </Card>
    </main>
  );
}
export default Home;