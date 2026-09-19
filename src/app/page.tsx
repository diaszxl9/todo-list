import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Plus, Info, Menu, Check } from 'lucide-react';
import { Badge } from "../components/ui/badge";



const Home = () => {
  return (
    <main className = "w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className= "w-lg ">
        <CardHeader className = "flex gap-2">
          <Input placeholder ="Adicionar tarefa" />
          <Button className="cursor-pointer"> <Plus/> Cadastrar </Button >
        </CardHeader>

        <CardContent>
          <Separator className="mb-4"/>
          <div className="flex gap-2">
            <Badge className="cursor-pointer"> <Menu/> Todas </Badge>
            <Badge className="cursor-pointer"> <Info/> Não finalizadas </Badge>
            <Badge className="cursor-pointer"> <Check/> Concluidas </Badge>
          </div>
        </CardContent>
        
        
      </Card>
    </main>
  );
}
export default Home;