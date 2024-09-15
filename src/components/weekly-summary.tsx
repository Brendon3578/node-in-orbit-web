import { CheckCircle2, Plus } from "lucide-react";
import { InOrbitIcon } from "./svg/in-orbit-icon";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Progress, ProgressIndicator } from "@radix-ui/react-progress";
import { Separator } from "./ui/separator";
import { OutlineButton } from "./ui/outline-button";

export function WeeklySummary() {
  const completionPercentage = {
    width: `${(8 / 15) * 100}%`,
    label: `${((8 / 15) * 100).toFixed(0)}%`,
  };

  return (
    <main className="max-w-[480px] py-10 px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold">05 a 12 de Agosto</span>
        </div>

        <DialogTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-500 text-indigo-50 text-sm font-medium tracking-tight hover:bg-violet-600">
          <Plus className="size-4" />
          Cadastrar meta
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15} className="bg-zinc-900 rounded-full h-2">
          <ProgressIndicator
            style={{ width: completionPercentage.width }}
            className="bg-gradient-to-r from-pink-500 to-violet-500 h-2 rounded-full"
          />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou <span className="text-zinc-100">8</span> de{" "}
            <span className="text-zinc-100">15</span> metas nessa semana.
          </span>
          <span>{completionPercentage.label}</span>
        </div>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-3">
        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          Meditar
        </OutlineButton>

        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          Praticar exercício
        </OutlineButton>

        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          Levantar cedo
        </OutlineButton>

        <OutlineButton disabled>
          <Plus className="size-4 text-zinc-600" />
          Manter uma boa alimentação
        </OutlineButton>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-medium">Sua semana</h2>
        <div className="space-y-4">
          <h3 className="font-medium">
            Hoje <span className="text-zinc-400 text-xs">(06 de agosto)</span>
          </h3>

          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">
                Você completou "
                <span className="text-zinc-100">Acordar cedo</span>" às{" "}
                <span className="text-zinc-100">08:13h</span>
              </span>
              <button
                className="underline text-zinc-500 text-xs hover:text-zinc-400"
                type="button"
              >
                Desfazer
              </button>
            </li>

            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">
                Você completou "<span className="text-zinc-100">Meditar</span>"
                às <span className="text-zinc-100">08:13h</span>
              </span>
              <button
                className="underline text-zinc-500 text-xs hover:text-zinc-400"
                type="button"
              >
                Desfazer
              </button>
            </li>

            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">
                Você completou "
                <span className="text-zinc-100">Praticar exercício</span>" às{" "}
                <span className="text-zinc-100">08:13h</span>
              </span>
              <button
                className="underline text-zinc-500 text-xs hover:text-zinc-400"
                type="button"
              >
                Desfazer
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">
            Ontem <span className="text-zinc-400 text-xs">(05 de agosto)</span>
          </h3>

          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">
                Você completou "
                <span className="text-zinc-100">Acordar cedo</span>" às{" "}
                <span className="text-zinc-100">08:13h</span>
              </span>
              <button
                className="underline text-zinc-500 text-xs hover:text-zinc-400"
                type="button"
              >
                Desfazer
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">
            Quarta-feira{" "}
            <span className="text-zinc-400 text-xs">(04 de agosto)</span>
          </h3>

          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">
                Você completou "
                <span className="text-zinc-100">Acordar cedo</span>" às{" "}
                <span className="text-zinc-100">08:13h</span>
              </span>
              <button
                className="underline text-zinc-500 text-xs hover:text-zinc-400"
                type="button"
              >
                Desfazer
              </button>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
