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
    { id: "reset", args: [], prompt: () => "sends a reset command to the module" },
    { id: "changes", args: ["reg"], prompt: (args) => `did the value of ${args[0]} change?` },
    { id: "say", args: [], prompt: undefined },
    { id: "ask", args: [], prompt: undefined },
    { id: "check", args: ["boolean"], prompt: (args) => `does the condition ${args[0]} hold?` },
    {
        id: "increases",
        args: ["reg"],
        prompt: (args) => `did the value of register ${args[0]} increase?`,
    },
    {
        id: "decreases",
        args: ["reg"],
        prompt: (args) => `did the value of register ${args[0]} decrease?`,
    },
    {
        id: "increasesBy",
        args: ["reg", "number"],
        prompt: (args) => `did the value of register ${args[0]} increase by ${args[1]}?`,
    },
    {
        id: "decreasesBy",
        args: ["reg", "number"],
        prompt: (args) => `did the value of register ${args[0]} decrease by ${args[1]}?`,
    },
    {
        id: "rangesFromUpTo",
        args: ["reg", "number", "number"],
        prompt: (args) => `register ${args[0]} should range in value from ${args[1]} up to ${args[2]}`,
    },
    {
        id: "rangesFromDownTo",
        args: ["reg", "number", "number"],
        prompt: (args) => `register ${args[0]} should range in value from ${args[1]} down to ${args[2]}`,
    },
]

export const testExpressionFunctions: jdtest.TestFunctionDescription[] = [
    { id: "start", args: ["any"], prompt: undefined },
]
