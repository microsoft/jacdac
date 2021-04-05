/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="jdtest.d.ts" />

export type JDTestFunctions =
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
    | "awaitEvent"
    | "nextEvent"
    | "assign"
    | "closeTo"

export function getTestCommandFunctions() {
    return testFunctions.filter(f => f.context === "command" || f.context === "either")
}

export function getTestExpressionFunctions() {
    return testFunctions.filter(f => f.context === "expression" || f.context === "either")
}

const testFunctions: jdtest.TestFunctionDescription[] = [
    {
        id: "changes",
        args: ["register"],
        prompt: `check that {1} changes`,
        context: "command",
    },
    {
        id: "ask",
        args: [],
        prompt: undefined,
        context: "command",
    },
    {
        id: "events",
        args: ["events"],
        prompt: `check that events {1} are observed`,
        context: "command",
    },
    {
        id: "awaitEvent",
        args: ["event", ["boolean", true] ],
        prompt: `wait for event {1} and then check {2} (other events ignored)`,
        context: "command",
    },
    {
        id: "nextEvent",
        args: ["event", ["boolean", true]],
        prompt: `next event must be {1}, then check {2}`,
        context: "command",
    },
    {
        id: "assign",
        args: ["register", "number"],
        prompt: `write value {2:val} to {1}`,
        context: "command",
    },
    {
        id: "check",
        args: ["boolean"],
        prompt: `check that {1}`,
        context: "command",
    },
    {
        id: "increases",
        args: ["register"],
        prompt: `check that {1} increases`,
        context: "command",
    },
    {
        id: "decreases",
        args: ["register"],
        prompt: `check that {1} decreases`,
        context: "command",
    },
    {
        id: "increasesBy",
        args: ["register", "number"],
        prompt: `check that  {1} (initially {1:val}) increases by {2:val}`,
        context: "command",
    },
    {
        id: "decreasesBy",
        args: ["register", "number"],
        prompt: `check that {1} (initially {1:val}) decreases by {2:val}`,
        context: "command",
    },
    {
        id: "stepsUpTo",
        args: ["register", "number"],
        prompt: `{1} should step up (by ones) from {1:val} to {2:val}`,
        context: "command",
    },
    {
        id: "stepsDownTo",
        args: ["register", "number"],
        prompt: `{1} should step down (by ones) from {1:val} to {2:val}`,
        context: "command",
    },
    {
        id: "start",
        args: ["any"],
        prompt: undefined,
        context: "expression",
    },
    {
        id: "closeTo",
        args: ["number", "number", "number"],
        prompt: `evaluate {1} until it is close to {2:val}, as given by error {3:val}`,
        context: "either",
    },
]
