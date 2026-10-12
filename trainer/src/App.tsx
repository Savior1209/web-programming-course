import { useState } from "react";
import type { Task, TrainingSet } from "./domain";

const moduleSet: TrainingSet = {
  id: "web-basics",
  title: "Основы веб-программирования",
  tasks: [
    {
      id: "ts-1",
      kind: "single-choice",
      topic: "typescript",
      prompt: "Что выведет этот JavaScript-код?",
      code: 'console.log("10" * 5);',
      options: [
        { id: "a", label: "105" },
        { id: "b", label: "50" },
        { id: "c", label: "Ошибка" },
      ],
    },
    {
      id: "react-1",
      kind: "short-text",
      topic: "react",
      prompt: "Объясните, чем props компонента отличаются от его состояния.",
    },
    {
      id: "react-2",
      kind: "single-choice",
      topic: "react",
      prompt: "Почему в списке элементов рекомендуется использовать стабильный key, а не индекс массива?",
      options: [
        { id: "a", label: "Потому что индекс запрещён в React" },
        { id: "b", label: "Потому что при вставке или удалении элемента индекс меняется и React может перепутать строки" },
        { id: "c", label: "Потому что индекс работает только в классовых компонентах" },
        { id: "d", label: "Потому что index замедляет рендер в 10 раз" },
      ],
    },
    {
      id: "html-1",
      kind: "short-text",
      topic: "html",
      prompt: "Зачем нужен <form> в HTML?",
    },
  ],
};

type TaskListProps = {
  tasks: Task[];
  selectedId: string;
  onSelect: (taskId: string) => void;
};

function TaskList({ tasks, selectedId, onSelect }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <button
            type="button"
            onClick={() => onSelect(task.id)}
            aria-current={task.id === selectedId}
          >
            {task.id} — {task.topic}
          </button>
        </li>
      ))}
    </ul>
  );
}

type TaskCardProps = {
  task: Task;
};

function TaskCard({ task }: TaskCardProps) {
  return (
    <article>
      <p>Тема: {task.topic}</p>
      <p>{task.prompt}</p>

      {task.code !== undefined && (
        <pre>{task.code}</pre>
      )}

      {task.kind === "single-choice" ? (
        <ul>
          {task.options.map((option) => (
            <li key={option.id}>{option.label}</li>
          ))}
        </ul>
      ) : (
        <p>Текстовый ответ: (поле ввода).</p>
      )}
    </article>
  );
}

export default function App() {
  const [selectedId, setSelectedId] = useState<string>(moduleSet.tasks[0]?.id ?? "");

  const selectedTask = moduleSet.tasks.find((task) => task.id === selectedId);

  return (
    <main>
      <h1>
        {moduleSet.title} — заданий: {moduleSet.tasks.length}
      </h1>

      {moduleSet.tasks.length === 0 ? (
        <p>В модуле нет заданий.</p>
      ) : (
        <>
          <TaskList
            tasks={moduleSet.tasks}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />

          {selectedTask ? (
            <TaskCard task={selectedTask} />
          ) : (
            <p>Выбранное задание не найдено.</p>
          )}
        </>
      )}
    </main>
  );
}