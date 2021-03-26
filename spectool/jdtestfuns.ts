/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="jdtest.d.ts" />

export type Commands =
    | "changes"
    | "ask"
    | "check"
    | "increases"
    | "decreases"
    | "increasesBy"
    | "decreasesBy"
    | "stepsUpTo"
    | "stepsDownTo"
    | "events"
    | "assign"

export const testCommandFunctions: jdtest.TestFunctionDescription[] = [
    { id: "changes", args: ["register"], prompt: `check that {1} changes` },
    { id: "ask", args: [], prompt: undefined },
    { id: "events", args: ["array"], prompt: `check that events {1} are observed` },
    { id: "assign", args: ["register", "number"], prompt: `write value {2:val} to {1}` },
    { id: "check", args: ["boolean"], prompt: `check that {1}` },
    {
        id: "increases",
        args: ["register"],
        prompt: `check that {1} increases`,
    },
    {
        id: "decreases",
        args: ["register"],
        prompt: `check that {1} decreases`,
    },
    {
        id: "increasesBy",
        args: ["register", "number"],
        prompt: `check that  {1} (initially {1:val}) increases by {2:val}`,
    },
    {
        id: "decreasesBy",
        args: ["register", "number"],
        prompt: `check that {1} (initially {1:val}) decreases by {2:val}`,
    },
    {
        id: "stepsUpTo",
        args: ["register", "number"],
        prompt: `{1} should step up (by ones) from {1:val} to {2:val}`,
    },
    {
        id: "stepsDownTo",
        args: ["register", "number"],
        prompt: `{1} should step down (by ones) from {1:val} to {2:val}`,
    },
]

export const testExpressionFunctions: jdtest.TestFunctionDescription[] = [
    { id: "start", args: ["any"], prompt: undefined },
]
