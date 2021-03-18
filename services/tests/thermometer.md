# Thermometer tests

## in range

Check that thermometer temperature is in expected range

    check(temperature <= max_temperature+temperature_error)
    check(min_temperature-temperature_error <= temperature)
    
## increase temperature

Blow on the sensor to increase the temperature by one degree C

    increasesBy(temperature, 1.0)
