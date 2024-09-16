import { CheckCircle2, Plus } from "lucide-react";
import { InOrbitIcon } from "./svg/in-orbit-icon";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Progress, ProgressIndicator } from "@radix-ui/react-progress";
import { Separator } from "./ui/separator";
import ptBR from "dayjs/locale/pt-BR";
import dayjs from "dayjs";
import { PendingGoals } from "./pending-goals";
import type { SummaryResponse } from "../http/get-summary";

interface WeeklySummaryProps {
  summary: SummaryResponse["summary"];
}

dayjs.locale(ptBR);

export function WeeklySummary({ summary }: WeeklySummaryProps) {
  const fromDate = dayjs().startOf("week").format("D[ de ]MMM");
  const toDate = dayjs().endOf("week").format("D[ de ]MMM");

  const completedPercentage = Math.round(
    (summary.completed / summary.total) * 100
  );

  const now = dayjs();

  return (
    <main className="max-w-[480px] py-10 px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold">
            {fromDate} - {toDate}
          </span>
        </div>

        <DialogTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-500 text-indigo-50 text-sm font-medium tracking-tight hover:bg-violet-600">
          <Plus className="size-4" />
          Cadastrar meta
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress
          value={summary.completed}
          max={summary.total}
          className="bg-zinc-900 rounded-full h-2"
        >
          <ProgressIndicator
            className="bg-gradient-to-r from-pink-500 to-violet-500 h-2 rounded-full"
            style={{ width: `${completedPercentage}%` }}
          />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{" "}
            <span className="text-zinc-100">{summary.completed}</span> de{" "}
            <span className="text-zinc-100">{summary.total}</span> metas nessa
            semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      <div className="space-y-4">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {Object.entries(summary.goalsPerDay).map(([date, goals]) => {
          const weekDay = dayjs(date).format("dddd");
          // const parsedDate = dayjs(date).format("D[ de ]MMMM");
          const dayLabel = dayjs(date).format("D");
          const weekLabel = dayjs(date).format("MMMM");

          const isToday = dayjs(date).isSame(now, "date");
          const isYesterday = dayjs(date).isSame(
            now.subtract(1, "day"),
            "date"
          );

          console.log(isYesterday);

          const weekDayLabel = isYesterday
            ? "Ontem"
            : isToday
            ? "Hoje"
            : weekDay;

          return (
            <div className="space-y-4" key={date}>
              <h3 className="font-medium">
                <span className="capitalize">{weekDayLabel} </span>
                <span className="text-zinc-400 text-xs">
                  ({dayLabel} de <span className="capitalize">{weekLabel}</span>
                  )
                </span>
              </h3>

              <ul className="space-y-3">
                {goals.map((goal) => {
                  console.log(goal);
                  const parsedTime = dayjs(goal.completedAt).format("HH:mm[h]");

                  return (
                    <li className="flex items-center gap-2" key={goal.id}>
                      <CheckCircle2 className="size-4 text-pink-500" />
                      <span className="text-sm text-zinc-400">
                        Você completou "
                        <span className="text-zinc-100">{goal.title}</span>" às{" "}
                        <span className="text-zinc-100">{parsedTime}</span>{" "}
                        <button
                          className="text-xs underline text-zinc-500"
                          type="button"
                          onClick={() => alert("Method not implemented yet.")}
                        >
                          Desfazer
                        </button>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </main>
  );
}
