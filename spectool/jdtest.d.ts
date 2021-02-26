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
        prompt: string;
        manual: boolean;
        commands: TestFunctionCall[];
    }

    interface TestFunctionCall {
        id: string;
        args: string[];
    }

    interface TestFunctionDescription {
        id: string;
        prompt: string;
    }
}