# Accelerometer tests

## tilt events

Tilt the device up

    awaitEvent(tilt_up)

Now, tilt it down

    awaitEvent(tilt_down)

Now, tilt it left

    awaitEvent(tilt_left)

Now, tilt it right

    awaitEvent(tilt_right)

## face events

Place the device face down

    awaitEvent(face_down)
    
    
Place the device face up

    awaitEvent(face_up)


## 3 G event detection

Move the device quickly in any direction

    check(forces.x >= 3 || forces.y >= 3 || forces.z >= 3)
    awaitEvent(force_3g)

## 6 G event detection

Move the device quickly in any direction

    check(forces.x >= 6 || forces.y >= 6 || forces.z >= 6)
    awaitEvent(force_6g, true)
    
## 8 G event detection

Move the device quickly in any direction

    check(forces.x >= 8 || forces.y >= 8 || forces.z >= 8)
    awaitEvent(force_8g, true)


