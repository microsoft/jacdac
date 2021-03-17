# Thermometer tests

## in range

Check that thermometer temperature is in expected range

    check(min_temperature-temperature_error <= temperature)
    check(max_temperature+temperature_error >= temperature)

## increase temperature

Blow on the sensor to increase the temperature by one degree C

    increasesBy(temperature, 1.0 + temperature_error)
