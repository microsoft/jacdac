/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="jdtest.d.ts" />

export type Commands =
    | "reset"
    | "changes"
    | "ask"
    | "say"
    | "check"
    | "increases"
    | "decreases"
    | "increasesBy"
    | "decreasesBy"
    | "rangesFromUpTo"
    | "rangesFromDownTo"

export const testCommandFunctions: jdtest.TestFunctionDescription[] = [
    { id: "reset", args: [], prompt: "sends a reset command to the module" },
    { id: "changes", args: ["reg"], prompt: "did the value of $1 change?" },
    { id: "say", args: [], prompt: undefined },
    { id: "ask", args: [], prompt: undefined },
    { id: "check", args: ["boolean"], prompt: "does the condition $1 hold?" },
    {
        id: "increases",
        args: ["reg"],
        prompt: "did the value of register $1 increase?",
    },
    {
        id: "decreases",
        args: ["reg"],
        prompt: "did the value of register $1 decrease?",
    },
    {
        id: "increasesBy",
        args: ["reg", "number"],
        prompt: "did the value of register $1 increase by $2?",
    },
    {
        id: "decreasesBy",
        args: ["reg", "number"],
        prompt: "did the value of register $1 decrease by $2?",
    },
    {
        id: "rangesFromUpTo",
        args: ["reg", "number", "number"],
        prompt: "register $1 should range in value from $2 up to $3",
    },
    {
        id: "rangesFromDownTo",
        args: ["reg", "number", "number"],
        prompt: "register $1 should range in value from $2 down to $3",
    },
]

export const testExpressionFunctions: jdtest.TestFunctionDescription[] = [
    { id: "start", args: ["any"], prompt: "value at beginning of test" },
]
