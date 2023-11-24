"use client";
import {
  DndContext,
  type DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { createId } from "@paralleldrive/cuid2";
import { CSS } from "@dnd-kit/utilities";
import { useState, type ReactNode, Children } from "react";
import { cn } from "~/utils/tailwind";
import { Button } from "~/components/ui/button";

const Draggable = ({ children, id }: { children: ReactNode; id: string }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "rounded-lg border border-b-2 border-green-700  bg-white px-2 py-1",
        {},
      )}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

const Droppable = ({
  children,
  name,
  id,
}: {
  children: ReactNode;
  name: string;
  id: string;
}) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  const haveChild = Children.count(children) > 0;

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border-neutral-200 bg-neutral-200 p-1",
        {
          "border-teal-500 bg-teal-500": isOver,
        },
      )}
    >
      <div className="px-2 font-medium">{name}</div>
      <div
        ref={setNodeRef}
        className={cn(
          "flex flex-1 flex-col gap-3 rounded-lg bg-neutral-50 p-3",
          {
            "border-teal-500": isOver,
          },
        )}
      >
        {haveChild ? (
          children
        ) : (
          <div className="flex flex-1 items-center justify-center font-medium text-neutral-400">
            Empty
          </div>
        )}
      </div>
    </div>
  );
};

const containers = ["Todo", "Doing", "Done"] as const;

type Todo = {
  id: string;
  container: (typeof containers)[number];
};

export const DndKitTest = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      setTodos((oldTodos) => {
        return oldTodos.map((oldTodo) => {
          return oldTodo.id === active.id
            ? ({
                ...oldTodo,
                container: over.id.toString() as Todo["container"],
              } satisfies Todo)
            : oldTodo;
        });
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-row gap-2 py-4">
        <Button
          onClick={() => {
            setTodos((oldTodos) => [
              ...oldTodos,
              { id: createId(), container: "Todo" },
            ]);
          }}
        >
          Add todo
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {containers.map((container) => {
          return (
            <Droppable key={container} id={container} name={container}>
              {todos
                .filter((todo) => todo.container === container)
                .map((todo) => (
                  <Draggable key={todo.id} id={todo.id}>
                    {todo.id}
                  </Draggable>
                ))}
            </Droppable>
          );
        })}
      </div>
    </DndContext>
  );
};
