# To-do List

Uma lista de tarefas full stack feita com Next.js, React.js, TypeScript, PostgreSQL, Prisma ORM, Tailwind CSS e Shadcn UI. As tarefas ficam salvas no banco, então nada se perde ao recarregar a página.

## O que dá pra fazer

- Adicionar, editar e excluir tarefas
- Marcar uma tarefa como concluída clicando nela. A interface atualiza na hora e volta ao estado anterior se o servidor falhar.
- Filtrar entre todas, pendentes e concluídas
- Limpar de uma vez todas as tarefas concluídas
- Acompanhar o progresso pela barra e pelo contador de concluídas

## Como rodar

Você vai precisar do Node.js 20 ou superior e de um banco PostgreSQL. Pode ser local, no Docker ou em um serviço como o [Neon](https://neon.tech) ou o [Supabase](https://supabase.com).

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/diaszxl9/todo-list.git
cd todo-list
npm install
```

Crie o arquivo `.env` a partir do exemplo e coloque a URL do seu banco:

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/todolist"
```

Se não tiver o PostgreSQL instalado, dá pra subir um com Docker:

```bash
docker run --name todolist-db -e POSTGRES_PASSWORD=senha -e POSTGRES_DB=todolist -p 5432:5432 -d postgres
```

Crie a tabela no banco e inicie o projeto:

```bash
npx prisma db push
npm run dev
```

Pronto, é só abrir [http://localhost:3000](http://localhost:3000).
