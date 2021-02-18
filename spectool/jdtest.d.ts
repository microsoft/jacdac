/// <reference path="jdspec.d.ts" />

declare namespace jdtest {


    interface ServiceTestMarkdownSpec {
        /**
         * associated service
         */
        classIdentifier: number;

        /**
         * Markdown source
         */
        source: string;
    }

    /**
     * Service test.
     */
    interface ServiceTest {
        /**
         * the service that this file targets
         */

        service: jdspec.ServiceSpec;

        /**
         * the set of independent tests for the service
         */
        tests: UnitTest[];

        /**
         * If parsing of markdown fails, this includes the parse errors. Set to null/undefined when no errors.
         */
        errors?: jdspec.Diagnostic[];
    }

    interface UnitTest {
        description: string;
        commands: Command[];
    }

    interface Command {
        kind: CommandKind;
        message: string;
        condition?: Condition;
        trace?: string[];
    }

    interface Condition {
        comparison: ComparisonKind;
        left: string;
        right: string;
    }

    type CommandKind = "prompt" | "ask" | "check" | "observe"
    type ComparisonKind = "eq" | "ne" | "lt" | "gt" | "le" | "ge"
}