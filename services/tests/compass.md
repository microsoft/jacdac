# Compass tests

## North

Using another compass, turn the compass to the North

    check(enabled)
    check(status_code.code == 0)
    closeTo(heading, 0, 1)

## East

Using another compass, turn the compass to the East

    check(enabled)
    check(status_code.code == 0)
    closeTo(heading, 90, 1)