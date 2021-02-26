# Potentiometer tests

## position changes on movement

    say "move the slider/potentiometer"
    ask "did the position register's value change?"
    // changes position

## minimum is zero

    //let save = position
    say "Minimize the position value"
    ask "did the position register's value become 0?"
    //check position > save

## maximum is one

    //let save = position
    say "Maximize the position value"
    ask "did the position register's become 1?"
    //check position < save
