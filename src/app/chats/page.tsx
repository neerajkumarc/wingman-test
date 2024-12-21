"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePollinationsChat } from "@pollinations/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MousePointer2, Send } from "lucide-react";
import Markdown from "react-markdown";

const ChatComponent = () => {
  const suggestions = [
    "Recommend a product",
    "Compare two products",
    "Search inventory",
    "List all product features",
    "Explain benefits of a feature",
    "Find deals",
  ];

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendUserMessage, messages } = usePollinationsChat(
    [{ role: "system", content: "You are a helpful assistant" }],
    {
      seed: 42,
      jsonMode: false,
      model: "mistral",
    }
  );

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      sendUserMessage(input);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const displayMessages = messages.filter((msg) => msg.role !== "system");

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto w-full">
      <div className="flex-none pt-12 px-4">
        <div className="text-center mb-8 flex items-center justify-center flex-col">
          <h1 className="text-2xl font-semibold mb-2">
            Ask AI Copilot anything!
          </h1>
          <p className="text-muted-foreground max-w-sm text-center">
            Access comprehensive product information from the store's internal
            knowledge base and the Web.
          </p>
        </div>
      </div>

      <div className="flex-grow overflow-hidden px-4">
        <div className="h-full overflow-y-auto pb-4">
          {displayMessages.length === 0 ? (
            <div className="grid grid-cols-2 gap-3 mb-8">
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="secondary"
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 justify-start gap-2 rounded-full p-8"
                  onClick={() => setInput(suggestion)}
                >
                  <MousePointer2 className="w-4 h-4" />
                  {suggestion}
                </Button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {displayMessages.map((msg, index) => (
                <Card
                  key={index}
                  className={`max-w-3xl ${
                    msg.role === "assistant" ? " bg-emerald-50" : " bg-gray-50"
                  }`}
                >
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-1">
                      {msg.role === "assistant" ? "AI Copilot" : "You"}
                    </p>
                    <Markdown>{msg.content}</Markdown>
                  </CardContent>
                </Card>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      <div className="flex-none p-4 bg-white border-t">
        <div className="max-w-4xl mx-auto flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button onClick={handleSend} disabled={!input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
