# PC controller

    identifier: 0x113d0987
    status: experimental
    camel: PCController

Send various events to PC, including opening a URL, start an app, sending text, etc.

## Commands

    command open_url @ 0x80 {
        url: string
    }

Open a URL in the default browser.

    command start_app @ 0x81 {
        name: string
    }

Start an app.

    command send_text @ 0x82 {
        text: string
    }

Send text to the active window.

    command run_script @ 0x83 {
        script: string
    }

Run a script.
