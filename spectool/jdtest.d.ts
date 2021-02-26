/// <reference path="jdspec.d.ts" />

declare namespace jdtest {


    interface ServiceTestMarkdownSpec {
        /**
         * associated service
         */
        serviceClassIdentifier: number;

        /**
         * Markdown source
         */
        source: string;
    }

    /**
     * Service test.
     */
    interface ServiceTest {

        description: string;

        /**
         * the service that this file targets
         */

        serviceClassIdentifier: number;

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
        letVariables: string[];
        commands: ServiceTestCommand[];
    }

    interface ServiceTestCommand {
        kind: ServiceTestCommandKind;
        lhs?: string;
        expr: ServiceTestToken[];
    }

    interface ServiceTestToken {
        js?: string;        // JavaScript token
        id?: string;        // an id in the spec
        const?: number;
    }

    interface ServiceTestTrace {

    }

    type ServiceTestCommandKind = "let" | "say" | "ask" | "check" | "observe" | "changes"
    type ServiceTestComparisonKind = "eq" | "ne" | "lt" | "gt" | "le" | "ge"
}