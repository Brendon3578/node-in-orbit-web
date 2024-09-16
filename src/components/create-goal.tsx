import {
  DialogOverlay,
  DialogContent,
  DialogPortal,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { X } from "lucide-react";
import { Label } from "./ui/label";
import { RadioGroupIndicator } from "./ui/radio-group";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createGoal } from "../http/create-goal";

const goalEmojis = ["🥱", "🙂", "😎", "😜", "🤨", "🤯", "🔥"];

const createGoalSchema = z.object({
  title: z.string().min(1, "Informe a atividade que deseja praticar"),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});

type CreateGoalSchema = z.infer<typeof createGoalSchema>;

export function CreateGoal() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<CreateGoalSchema>({
    resolver: zodResolver(createGoalSchema),
  });

  async function handleCreateGoal({
    title,
    desiredWeeklyFrequency,
  }: CreateGoalSchema) {
    try {
      await createGoal({
        title,
        desiredWeeklyFrequency,
      });

      reset();

      queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });

      //toast.success('Meta criada com sucesso!')
    } catch {
      //toast.error('Erro ao criar a meta, tente novamente!')
    }
  }

  return (
    <DialogPortal>
      <DialogOverlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />

      <DialogContent className="fixed z-50 right-0 top-0 bottom-0 w-[400px] h-screen border-l border-zinc-900 bg-zinc-950 flex flex-col justify-between p-8 overflow-auto">
        <form onSubmit={handleSubmit(handleCreateGoal)}>
          <div className="space-y-6 mb-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg font-semibold">
                  Cadastrar meta
                </DialogTitle>

                <DialogClose>
                  <X className="size-5 text-zinc-600" />
                </DialogClose>
              </div>

              <DialogDescription className="text-zinc-400 text-sm leading-relaxed">
                Adicione atividades que te fazem bem e que você quer continuar
                praticando toda semana.
              </DialogDescription>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Qual a atividade?</Label>

                <Input
                  id="title"
                  autoFocus
                  placeholder="Praticar exercícios, meditar, etc..."
                  {...register("title")}
                />

                {errors.title && (
                  <p className="text-sm text-red-400">{errors.title.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="desiredWeeklyFrequency">
                  Quantas vezes na semana?
                </Label>

                <Controller
                  control={control}
                  name="desiredWeeklyFrequency"
                  defaultValue={1}
                  render={({ field }) => {
                    return (
                      <RadioGroup
                        value={String(field.value)}
                        onValueChange={field.onChange}
                        className="flex flex-col gap-2"
                      >
                        {Array.from({ length: 7 }).map((_, i) => {
                          const frequency = String(i + 1);

                          return (
                            <RadioGroupItem
                              key={`radio-group-${i.toString()}`}
                              value={frequency}
                              className="group bg-black border border-zinc-900 rounded-lg px-4 py-2.5 flex items-center justify-between outline-none hover:border-zinc-800 focus-visible:border-pink-500 focus-visible:ring-4 ring-pink-500/10 data-[state=checked]:bg-pink-500/5 data-[state=checked]:border-pink-500"
                            >
                              <RadioGroupIndicator />

                              <span className="text-zinc-300 text-sm font-medium leading-none">
                                {frequency !== "7"
                                  ? `${frequency}x na semana`
                                  : "Todos dias da semana"}
                              </span>
                              <span className="text-lg leading-none size-5 -translate-x-px">
                                {goalEmojis[i] ?? "🥱"}
                              </span>
                            </RadioGroupItem>
                          );
                        })}
                      </RadioGroup>
                    );
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 text-zinc-400 text-sm font-medium tracking-tight hover:bg-zinc-800">
              Fechar
            </DialogClose>

            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </DialogContent>
    </DialogPortal>
  );
}
