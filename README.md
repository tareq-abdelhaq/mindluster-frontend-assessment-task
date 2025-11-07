## Features

- View tasks in columns (Backlog, In Progress, Review, Done)
- Add, edit, and delete tasks
- Search tasks by title or description
- Drag and drop tasks between columns
- Infinite scroll for pagination

## Setup Instructions

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the JSON server (in one terminal):

```bash
npm run server
```

3. Start the development server (in another terminal):

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run server` - Start JSON server on port 4000

## Tech Stack

- React 19
- TypeScript
- Vite
- React Bootstrap
- TanStack Query (React Query)
- Zustand
- JSON Server

## Future Enhancements (If We Had More Time)

- [ ] User authentication
- [ ] Drag and drop animations
- [ ] Task reordering within the same column to enable drag/drop withing the same column
- [ ] Use Optimistic approach to update the task column when the drop happen since it currently takes time to reflect the drag/drop of a task into a new column
- [ ] Bulk operations (select multiple tasks)
- [ ] Task filtering by status, priority, etc.
- [ ] Responsive mobile optimizations
- [ ] Working on the JQuery Bonus Task
