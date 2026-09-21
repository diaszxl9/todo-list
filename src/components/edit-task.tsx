import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SquarePen } from "lucide-react"

const EditTask = () => {
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
                <Input placeholder="Editar tarefa" className="flex-1"/>
                <Button className="cursor-pointer" variant="default">Editar</Button>
              </div>
            </DialogContent> 
          </Dialog>

    )
}

export default EditTask