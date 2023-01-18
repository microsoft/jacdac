# DeviceScript Debugger

    identifier: 0x155b5b40
    tags: management, devicescript
    restricted: true
    short: devsDbg

Allows for inspecting and affecting the state of a running DeviceScript program.

## Commands

    enum ValueTag : u8 {
        Number = 0x01       // v0:v1 - f64
        Special = 0x02      // v0 - ValueSpecial
        Fiber = 0x03        // v0 - FiberHandle
        RoleMember = 0x04   // v0 - role, v1 - spec-offset

        Exotic = 0x05
        Unhandled = 0x05

        // index in v0
        ImgBuffer = 0x20
        ImgStringBuiltin = 0x21
        ImgStringAscii = 0x22
        ImgStringUTF8 = 0x23
        ImgRole = 0x30          // v1 has number of attached properties

        // pointer in v0
        // v1 has number of properties (for map) or indexed length (otherwise)
        //   if highest bit of v1 is set, named properties are also present
        ObjOpaque = 0x50
        ObjArray = 0x51
        ObjMap = 0x52
        ObjBuffer = 0x53
        ObjString = 0x54
        ObjStackFrame = 0x55
        ObjPacket = 0x56
        ObjBoundFunction = 0x57
    }

    enum ValueSpecial : u8 {
        Null = 0
        True = 1
        False = 2
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
        StaticTagMask = 0xff00_0000
        StaticIndexMask = 0x00ff_fffe
    }

    command read_fibers @ 0x80 {
        results: pipe
    }
    pipe report fiber {
        handle: FiberHandle
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

    enum ReadIndexedModifier : u32 {
        Object = 0
        Globals = 1
        Roles = 2
    }

    command read_indexed_values @ 0x82 {
        results: pipe
        obj: u32
        modifier: ReadIndexedModifier
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
        obj: u32
    }
    pipe report key_value {
        key: String
        v0: u32
        v1: u32
        fn_idx: FunIdx
        tag: ValueTag
    }

Read variable slots in an object.

    enum ValueIndex : u32 {
        CurrentException = 1
        RoleObject = 2        // arg is role idx
        ReturnValue = 3       // arg is fiber handle
    }
    command read_value @ 0x84 {
        index: ValueIndex
        arg: u32
    }
    report {
        v0: u32
        v1: u32
        fn_idx: FunIdx
        tag: ValueTag
    }

Read a specific value.

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
        Breakpoint = 1
        UnhandledException = 2
        HandledException = 3
        Halt = 4
        Panic = 5
        Restart = 6
    }

    event suspended @ 0x80 {
        fiber: FiberHandle
        type: SuspensionType
    }

Emitted when the program hits a breakpoint or similar event in the specified fiber.
