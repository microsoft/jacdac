# DeviceScript Test Controller

    identifier: 0x1a489319
    tags: test, devicescript
    camel: devsTest
    
A test controller to report tests to run and execute them.

## Commands

    command list_tests @ 0x80 {
        tests: pipe
    }
    pipe report tests {
        test_id: string
    }

Retreives the list of tests to run. If empty, run all tests.
