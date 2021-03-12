/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="jdtest.d.ts" />

export type Commands =
    | "changes"
    | "ask"
    | "say"
    | "check"
    | "increases"
    | "decreases"
    | "increasesBy"
    | "decreasesBy"
    | "stepsUpTo"
    | "stepsDownTo"
    | "events"

export const testCommandFunctions: jdtest.TestFunctionDescription[] = [
    { id: "changes", args: ["register"], prompt: `did the value of {1} change?` },
    { id: "say", args: [], prompt: undefined },
    { id: "ask", args: [], prompt: undefined },
    { id: "events", args: ["array"], prompt: `was the event trace {1} observed?` },
    { id: "check", args: ["boolean"], prompt: `does the condition {1} hold?` },
    {
        id: "increases",
        args: ["register"],
        prompt: `did the value of register {1} increase?`,
    },
    {
        id: "decreases",
        args: ["register"],
        prompt: `did the value of register {1} decrease?`,
    },
    {
        id: "increasesBy",
        args: ["register", "number"],
        prompt: `did the value of register {1} increase by {2}?`,
    },
    {
        id: "decreasesBy",
        args: ["register", "number"],
        prompt: `did the value of register {1} decrease by {2}?`,
    },
    {
        id: "stepsUpTo",
        args: ["register", "number"],
        prompt: `register {1} should step up (by one) to {2}`,
    },
    {
        id: "stepsDownTo",
        args: ["register", "number"],
        prompt: `register {1} should step down (by one) to {2}`,
    },
]

export const testExpressionFunctions: jdtest.TestFunctionDescription[] = [
    { id: "start", args: ["any"], prompt: undefined },
]
