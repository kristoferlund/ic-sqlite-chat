import { FormEvent, useEffect, useState } from "react";
import { handleChanges } from "../database/handleChanges";
import { queryClient } from "../main";
import { useCreateMessage } from "../chat/hooks/useCreateMessage";
import useDatabaseContext from "../database/hooks/useDatabaseContext";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { useMessages } from "../chat/hooks/useMessages";

export default function Chat() {
  const {
    mutate: createMessage,
    data,
    isPending: isCreateMessagePending,
  } = useCreateMessage();
  const { promiser } = useDatabaseContext();
  const { data: messages, isPending } = useMessages();
  const [message, setMessage] = useState("");

  const handleTerminalInput = async (terminalInput: string) => {
    if (!promiser) return;
    setMessage(terminalInput);
    createMessage({ message: terminalInput });
  };

  useEffect(() => {
    if (data) {
      (async () => {
        await handleChanges(data, promiser);
        queryClient.invalidateQueries({ queryKey: ["messages"] });
      })();
    }
  }, [data]);

  return (
    <div className="chat-container">
      <div className="chat">
        <Terminal name="Chat" onInput={handleTerminalInput}>
          {messages &&
            messages.map((message) => (
              <TerminalOutput key={message.id}>
                {message.message}
              </TerminalOutput>
            ))}
          {isCreateMessagePending && (
            <TerminalOutput>
              <span className="chat-wait">{message}</span>
            </TerminalOutput>
          )}
        </Terminal>
      </div>
    </div>
  );
}
