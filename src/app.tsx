import { Dialog } from "@radix-ui/react-dialog";
import { CreateGoal } from "./components/create-goal";
import { WeeklySummary } from "./components/weekly-summary";
// import { EmptyGoals } from "./components/empty-goal";

export function App() {
  return (
    <Dialog>
      {/* <EmptyGoals /> */}
      <WeeklySummary />

      <CreateGoal />
    </Dialog>
  );
}
