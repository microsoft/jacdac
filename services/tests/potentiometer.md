# Potentiometer Tests

## midpoint

Adjust the potentiometer to the midpoint (0.5)

    closeTo(position,0.5,0.01)


## slider

Check if the device is a slider

    check(variant == Variant.Slider)

## rotary

Check if the device is a rotary

    check(variant == Variant.Rotary)
