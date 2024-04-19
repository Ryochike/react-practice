import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useTodoList } from "../TodoList/useTodoList";

type TodoCreationFormProps = {
  onCreateTodo: (title: string) => void;
};

export function TodoCreationForm({ onCreateTodo }: TodoCreationFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const [titleError, setTitleError] = useState<string | undefined>(undefined);
  const [newTaskName, setNewTaskName] = useState<string>("");
  const { createTodo, todoList } = useTodoList();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if ((titleRef.current === null)) {
          return;
        }

        if (newTaskName.trim() === "") {
          setTitleError("タスク名を入力してください")
          titleRef.current.focus();
          return;
        }

        // onCreateTodo(newTaskName);
        createTodo({ title: newTaskName });
        setNewTaskName("");
        console.log(todoList, "todoList")
      }}
    >
      <HStack gap={2} align="start">
        <FormControl isInvalid={!!titleError}>
          <Input ref={titleRef} value={newTaskName} size="sm" placeholder="Learn React" onChange={e => setNewTaskName(e.target.value)} />
          <FormErrorMessage>{titleError}</FormErrorMessage>
        </FormControl>
        <Button type="submit" size="sm">
          追加
        </Button>
      </HStack>
    </form>
  );
}
