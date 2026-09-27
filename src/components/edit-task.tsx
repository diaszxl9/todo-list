import { Input } from "@/components/ui/input"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SquarePen } from "lucide-react"
import type { Task } from "@/generated/prisma/client"
import { useState } from "react"
import { toast } from "sonner"
import {editTask} from "@/actions/edit-task"

type TaskProps = {
  task: Task
  handleGetTask: () => void
}

const EditTask = ({task, handleGetTask}: TaskProps) => {

  const [editedTask, setEditedTask] = useState (task.task)

  const handleEditTask = async () => {
    try{
      if(editedTask !== task.task){
      toast.success("voce pode mandar as informações ao BD")
    } else{
      toast.error("as informações não foram alteradas")
      return
    }
    await editTask({
      idTask: task.id, 
      newTask: editedTask
    })

    handleGetTask ()
    }catch (error){
      throw error
    }
  }

    return(
        <Dialog>
            <DialogTrigger> 
              <SquarePen size ={16} className="cursor-pointer"/> 
            </DialogTrigger>
            
            <DialogContent> 
              <DialogHeader>
            <DialogTitle>Editar Tarefa</DialogTitle>
              </DialogHeader>

              <div className= "flex gap-2">
                <Input 
                  placeholder="Editar tarefa" className="flex-1" 
                  value= {editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />

                <DialogClose>
                <Button className="cursor-pointer" onClick={handleEditTask} variant="default"
                >Editar
                </Button>
                </DialogClose>
              </div>
            </DialogContent> 
          </Dialog>

    )
}

export default EditTask