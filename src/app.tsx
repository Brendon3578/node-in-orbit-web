import { Dialog } from "@radix-ui/react-dialog";
import { CreateGoal } from "./components/create-goal";
import { WeeklySummary } from "./components/weekly-summary";
import { getSummary } from "./http/get-summary";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { EmptyGoals } from "./components/empty-goal";
// import { EmptyGoals } from "./components/empty-goal";

const staleTime = 1000 * 60; // 60 seconds - 1 minute

export function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime,
  });

  if (isLoading || !data || data == null) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="text-zinc-500 animate-spin size-10" />
      </div>
    );
  }

  return (
    <Dialog>
      {data.summary.total > 0 ? (
        <WeeklySummary summary={data.summary} />
      ) : (
        <EmptyGoals />
      )}

      <CreateGoal />
    </Dialog>
  );
}
