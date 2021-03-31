/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="jdspec.d.ts" />
/// <reference path="jsep.d.ts" />

declare namespace jdtest {
    interface ServiceTestMarkdownSpec {
        /**
         * associated service
         */
        serviceClassIdentifier: number

        /**
         * Markdown source
         */
        source: string
    }

    /**
     * Service test specification
     */
    interface ServiceTestSpec {
        description: string // markdown

        /**
         * the service that this file targets
         */

        serviceClassIdentifier: number

        /**
         * the set of independent tests for the service
         */
        tests: TestSpec[]

        /**
         * If parsing of markdown fails, this includes the parse errors. Set to null/undefined when no errors.
         */
        errors?: jdspec.Diagnostic[]
    }

    interface TestSpec {
        description: string
        prompt: string
        registers: string[]
        events: string[]
        testCommands: TestCommandSpec[]
    }

    interface TestCommandSpec {
        prompt: string // markdown
        call: jsep.CallExpression
    }

    type Context = "AsCommand" | "AsExpression" | "AsEither"

    interface TestFunctionDescription {
        id: string
        args: string[]
        prompt: string
        context: string
    }
}
