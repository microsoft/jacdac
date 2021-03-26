# Humidity tests

## in range

Check that thermometer temperature is in expected range

    check(humidity <= max_humidity + humidity_error)
    check(min_humidity - humidity_error <= humidity )

## increases
    
blow on the sensor

    increasesBy(humidity, 10)

## decreases
    
let the sensor rest

    decreasesBy(humidity, 4)

## calibrate

measure humidity using a calibrated sensor and check value

    ask()
