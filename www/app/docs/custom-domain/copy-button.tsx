"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";


interface CopyButtonProps {
    text: string
    className?: string
  }
  
  export  function CopyButton({ text, className = "" }: CopyButtonProps) {
    const [isCopied, setIsCopied] = useState(false)
  
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(text)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy text: ", err)
      }
    }
  
    return (
      <Button
        variant="outline"
        size="icon"
        className={`relative ${className}`}
        onClick={copyToClipboard}
      >
        <span className="sr-only">Copy to clipboard</span>
        {isCopied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    )
  }
