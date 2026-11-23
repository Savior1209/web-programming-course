import type { TrainingSet } from "../domain";
import type { ServerAttempt } from "../api/attempts";

type AttemptResultProps = {
  set: TrainingSet;
  attempt: ServerAttempt;
  result: NonNullable<ServerAttempt["result"]>;
  onRestart: () => void;
};

export function AttemptResult({ set, attempt, result, onRestart }: AttemptResultProps) {
  return (
    <main>
      <h1>{set.title}</h1>
      <h2>Попытка завершена</h2>
      <p>
        Статус:{" "}
        <strong>
          {result.status === "pending-review" ? "Ожидает проверки" : "Проверено"}
        </strong>
        {result.status === "graded" && (
          <> — {result.score} из {result.maxScore}</>
        )}
      </p>
      <ul className="review-list">
        {set.tasks.map((task) => {
          const answer = attempt.answers.find((a) => a.taskId === task.id);
          const answered = answer !== undefined;
          
          let label = "Нет ответа";
          if (result.status === "pending-review") {
            label = "Ожидает проверки";
          } else if (answered) {
            label = `Оценка: ${result.score} из ${result.maxScore}`;
          }

          return (
            <li key={task.id} className="review-item">
              <strong>{task.id}</strong>: {task.prompt}
              <br />
              <span>{label}</span>
            </li>
          );
        })}
      </ul>
      <button onClick={onRestart} className="btn-primary" style={{ marginTop: 20 }}>
        Начать новую попытку
      </button>
    </main>
  );
}