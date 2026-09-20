import { Input } from "@base-ui/react/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
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
                <Input placeholder="Editar tarefa"/>
                <Button className="cursor-pointer" variant="default">Editar</Button>
              </div>
            </DialogContent> 
          </Dialog>

    )
}

export default EditTask