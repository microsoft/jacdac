# DeviceScript Debugger

    identifier: 0x155b5b40
    tags: management, devicescript
    restricted: true
    camel: devsDbg

Allows for inspecting and affecting the state of a running DeviceScript program.

## Commands

    enum ValueTag : u8 {
        Number = 0x01         // v0:v1 - f64
        Special = 0x02        // v0 - ValueSpecial
        Fiber = 0x03          // v0 - FiberHandle
        BuiltinObject = 0x05  // v0 - DEVS_BUILTIN_OBJECT_*

        Exotic = 0x06
        Unhandled = 0x07

        // index in v0
        ImgBuffer = 0x20
        ImgStringBuiltin = 0x21
        ImgStringAscii = 0x22
        ImgStringUTF8 = 0x23
        ImgRole = 0x30          // v1 has number of attached properties
        ImgFunction = 0x31      // never returned, can be used in read_*
        ImgRoleMember = 0x32    // v0 has role in low DEVS_ROLE_BITS (15) and offset into embedded specs in the high bits

        // pointer in v0
        // v1 has number of properties (for map) or indexed length (otherwise)
        //   if highest bit of v1 is set, named properties are also present
        ObjArray = 0x51
        ObjMap = 0x52
        ObjBuffer = 0x53
        ObjString = 0x54
        ObjStackFrame = 0x55
        ObjPacket = 0x56
        ObjBoundFunction = 0x57
        ObjOpaque = 0x58

        ObjAny = 0x50    // never returned, can be used in read_*
        ObjMask = 0xF0

        User1 = 0xF1
        User2 = 0xF2
        User3 = 0xF3
        User4 = 0xF4
    }

    enum ValueSpecial : u8 {
        Null = 0
        True = 1
        False = 2

        // These can be used in read_* and are never returned
        Globals = 100
        CurrentException = 101
    }

    type FunIdx : u16 {
        None = 0
        Main = 49999
        FirstBuiltIn = 50000
    }

    type FiberHandle : u32 {
        None = 0
    }
    type ProgramCounter : u32

    type ObjStackFrame : u32 {
        Null = 0
    }

    // either ObjString or one of ImgString*
    type String : u32 {
        StaticIndicatorMask = 0x8000_0001
        StaticTagMask = 0x7f00_0000
        StaticIndexMask = 0x00ff_fffe

        Unhandled = 0
    }

    command read_fibers @ 0x80 {
        results: pipe
    }
    pipe report fiber {
        handle: FiberHandle
        initial_fn: FunIdx
        curr_fn: FunIdx
    }

List the currently running fibers (threads).

    command read_stack @ 0x81 {
        results: pipe
        fiber_handle: FiberHandle
    }
    pipe report stackframe {
        self: ObjStackFrame
        pc: ProgramCounter
        closure: ObjStackFrame
        fn_idx: FunIdx
        reserved: u16
    }

List stack frames in a fiber.

    command read_indexed_values @ 0x82 {
        results: pipe
        v0: u32
        tag: ValueTag
        reserved: u8
        start: u16
        length: u16
    }
    pipe report value {
        v0: u32
        v1: u32
        fn_idx: FunIdx
        tag: ValueTag
    }

Read variable slots in a stack frame, elements of an array, etc.

    command read_named_values @ 0x83 {
        results: pipe
        v0: u32
        tag: ValueTag
    }
    pipe report key_value {
        key: String
        v0: u32
        v1: u32
        fn_idx: FunIdx
        tag: ValueTag
    }

Read variable slots in an object.

    command read_value @ 0x84 {
        v0: u32
        tag: ValueTag
    }
    report {
        v0: u32
        v1: u32
        fn_idx: FunIdx
        tag: ValueTag
    }

Read a specific value.

    command read_bytes @ 0x85 {
        results: pipe
        v0: u32
        tag: ValueTag
        reserved: u8
        start: u16
        length: u16
    }
    pipe report bytes_value {
        data: bytes
    }

Read bytes of a string (UTF8) or buffer value.

    command set_breakpoint @ 0x90 {
        break_pc: ProgramCounter
    }

Set breakpoint at a location.

    command clear_breakpoint @ 0x91 {
        break_pc: ProgramCounter
    }

Clear one breakpoint.

    command clear_breakpoints @ 0x92 {}

Clear all breakpoints.

    command resume @ 0x93 {}

Resume program execution after a breakpoint was hit.

    command halt @ 0x94 {}

Try suspending current program. Client needs to wait for `suspended` event afterwards.

    command restart_and_halt @ 0x95 {}

Start the program from the beginning and halt on first instruction.

## Registers

    rw enabled: bool @ intensity

Turn on/off the debugger interface.

    rw break_at_unhandled_exn: bool @ 0x80

Wheather to place breakpoint at unhandled exception.

    rw break_at_handled_exn: bool @ 0x81

Wheather to place breakpoint at handled exception.

    ro is_suspended: bool @ 0x180

Indicates if the program is currently suspended.
Most commands can only be executed when the program is suspended.

## Events

    enum SuspensionType : u8 {
        None = 0
        Breakpoint = 1
        UnhandledException = 2
        HandledException = 3
        Halt = 4
        Panic = 5
        Restart = 6
        DebuggerStmt = 7
    }

    event suspended @ 0x80 {
        fiber: FiberHandle
        type: SuspensionType
    }

Emitted when the program hits a breakpoint or similar event in the specified fiber.
