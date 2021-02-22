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
        commands: ServiceTestCommand[];
    }

    interface ServiceTestCommand {
        kind: ServiceTestCommandKind;
        message?: string;
        expr?: ServiceTestExpression;
        trace?: ServiceTestTrace;
    }

    interface ServiceTestExpression {
        left: ServiceTestValue;
        op?: ServiceTestComparisonKind;
        right?: ServiceTestValue;
    }

    interface ServiceTestValue {
        negate?: boolean;
        id?: string;
        field?: string;
        const?: number;
    }

    interface ServiceTestTrace {

    }

    type ServiceTestCommandKind = "say" | "ask" | "check" | "observe" | "changes" | "establish"
    type ServiceTestComparisonKind = "eq" | "ne" | "lt" | "gt" | "le" | "ge"
}