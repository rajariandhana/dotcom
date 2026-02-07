import { Button, Input, Textarea } from "@heroui/react";

export default function PromptBox({ query, setQuery, onSubmit, loading }) {
  return (
    <div className="w-full bg-blue-50 flex gap-2">
      <Input
        placeholder="Ask anything about me"
        value={query}
        onValueChange={setQuery}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        variant="faded"
      />

      <Button onPress={onSubmit} disabled={loading}>
        Enter
      </Button>
    </div>
  );
}
