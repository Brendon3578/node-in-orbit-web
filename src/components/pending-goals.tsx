import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPendingGoals } from "../http/get-pending-goals";
import { createGoalCompletion } from "../http/create-goal-completion";

export function PendingGoals() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["pending-goals"],
    queryFn: getPendingGoals,
  });

  if (isLoading || !data) {
    return null;
  }

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion({ goalId });

    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
    queryClient.invalidateQueries({ queryKey: ["summary"] });
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.pendingGoals.map((goal) => {
        const wasCompletedInThisWeek =
          goal.completionCount >= goal.desiredWeeklyFrequency;
        return (
          <div
            key={goal.id}
            title={
              wasCompletedInThisWeek
                ? "Você já completou essa meta nessa semana"
                : "Clique para completar a meta"
            }
          >
            <OutlineButton
              onClick={() => handleCompleteGoal(goal.id)}
              disabled={wasCompletedInThisWeek}
            >
              <Plus className="size-4 text-zinc-600" />
              {goal.title}
            </OutlineButton>
          </div>
        );
      })}
    </div>
  );
}
