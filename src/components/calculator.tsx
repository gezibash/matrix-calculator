"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (left: number, right: number, op: string): number => {
    switch (op) {
      case "+":
        return left + right;
      case "-":
        return left - right;
      case "*":
        return left * right;
      case "/":
        return right !== 0 ? left / right : 0;
      default:
        return right;
    }
  };

  const handleEquals = () => {
    if (operation === null || previousValue === null) return;

    const inputValue = parseFloat(display);
    const result = calculate(previousValue, inputValue, operation);

    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  return (
    <Card className="w-full max-w-xs cyber-border cyber-scanlines relative overflow-hidden">
      <CardContent className="p-4 relative z-0">
        {/* Display */}
        <div className="mb-4 rounded-lg bg-muted p-4 text-right cyber-glow-sm cyber-border">
          <span className="text-3xl font-mono cyber-text-glow cyber-flicker">{display}</span>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <Button variant="destructive" onClick={clear} className="col-span-2 text-lg font-bold">
            C
          </Button>
          <Button variant="secondary" onClick={() => performOperation("/")} className="text-lg font-bold">
            /
          </Button>
          <Button variant="secondary" onClick={() => performOperation("*")} className="text-lg font-bold">
            *
          </Button>

          {/* Row 2 */}
          <Button variant="outline" onClick={() => inputDigit("7")} className="text-lg">
            7
          </Button>
          <Button variant="outline" onClick={() => inputDigit("8")} className="text-lg">
            8
          </Button>
          <Button variant="outline" onClick={() => inputDigit("9")} className="text-lg">
            9
          </Button>
          <Button variant="secondary" onClick={() => performOperation("-")} className="text-lg font-bold">
            -
          </Button>

          {/* Row 3 */}
          <Button variant="outline" onClick={() => inputDigit("4")} className="text-lg">
            4
          </Button>
          <Button variant="outline" onClick={() => inputDigit("5")} className="text-lg">
            5
          </Button>
          <Button variant="outline" onClick={() => inputDigit("6")} className="text-lg">
            6
          </Button>
          <Button variant="secondary" onClick={() => performOperation("+")} className="text-lg font-bold">
            +
          </Button>

          {/* Row 4 */}
          <Button variant="outline" onClick={() => inputDigit("1")} className="text-lg">
            1
          </Button>
          <Button variant="outline" onClick={() => inputDigit("2")} className="text-lg">
            2
          </Button>
          <Button variant="outline" onClick={() => inputDigit("3")} className="text-lg">
            3
          </Button>
          <Button onClick={handleEquals} className="row-span-2 text-xl font-bold">
            =
          </Button>

          {/* Row 5 */}
          <Button variant="outline" onClick={() => inputDigit("0")} className="col-span-3 text-lg">
            0
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
