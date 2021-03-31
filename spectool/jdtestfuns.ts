/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="jdtest.d.ts" />

export function hasBooleanExpression(t: jdtest.TestFunctionDescription) {
    return t.args.indexOf("boolean") >= 0
}

export type Functions =
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

export function getCommands() {
    return testFunctions.filter(f => f.context === "AsCommand" || f.context === "AsCommand")
}

export function getExpressions() {
    return testFunctions.filter(f => f.context === "AsEither" || f.context === "AsExpression")
}

const testFunctions: jdtest.TestFunctionDescription[] = [
    {
        id: "changes",
        args: ["register"],
        prompt: `check that {1} changes`,
        context: "AsCommand",
    },
    {
        id: "ask",
        args: [],
        prompt: undefined,
        context: "AsCommand",
    },
    {
        id: "events",
        args: ["events"],
        prompt: `check that events {1} are observed`,
        context: "AsCommand",
    },
    {
        id: "awaitEvent",
        args: ["event", "boolean"],
        prompt: `wait for event {1} and then check {2} (other events ignored)`,
        context: "AsCommand",
    },
    {
        id: "nextEvent",
        args: ["event", "boolean"],
        prompt: `next event must be {1}, then check {2}`,
        context: "AsCommand",
    },
    {
        id: "assign",
        args: ["register", "number"],
        prompt: `write value {2:val} to {1}`,
        context: "AsCommand",
    },
    {
        id: "check",
        args: ["boolean"],
        prompt: `check that {1}`,
        context: "AsCommand",
    },
    {
        id: "increases",
        args: ["register"],
        prompt: `check that {1} increases`,
        context: "AsCommand",
    },
    {
        id: "decreases",
        args: ["register"],
        prompt: `check that {1} decreases`,
        context: "AsCommand",
    },
    {
        id: "increasesBy",
        args: ["register", "number"],
        prompt: `check that  {1} (initially {1:val}) increases by {2:val}`,
        context: "AsCommand",
    },
    {
        id: "decreasesBy",
        args: ["register", "number"],
        prompt: `check that {1} (initially {1:val}) decreases by {2:val}`,
        context: "AsCommand",
    },
    {
        id: "stepsUpTo",
        args: ["register", "number"],
        prompt: `{1} should step up (by ones) from {1:val} to {2:val}`,
        context: "AsCommand",
    },
    {
        id: "stepsDownTo",
        args: ["register", "number"],
        prompt: `{1} should step down (by ones) from {1:val} to {2:val}`,
        context: "AsCommand",
    },
    {
        id: "start",
        args: ["any"],
        prompt: undefined,
        context: "AsExpression",
    },
    {
        id: "closeTo",
        args: ["number", "number", "number"],
        prompt: `evaluate {1} until it is close to {2:val}, as given by error {3:val}`,
        context: "AsEither",
    },
]
