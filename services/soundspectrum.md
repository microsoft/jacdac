# Sound Spectrum

    identifier: 0x157abc1e
    extends: _sensor
    group: sound
    status: experimental

A microphone that analyzes the sound specturm

## Registers

    ro frequency_bins: bytes @ reading

The computed frequency data.

    rw enabled: bool @ intensity

Turns on/off the micropohone.

    rw fft_pow2_size = 5: u8 { absolute_min=2, absolute_max=7 } @ 0x80

The power of 2 used as the size of the FFT to be used to determine the frequency domain.

    rw min_decibels: i16 dB @ 0x81

The minimum power value in the scaling range for the FFT analysis data

    rw max_decibels: i16 dB @ 0x82

The maximum power value in the scaling range for the FFT analysis data

    rw smoothing_time_constant = 0.8: u0.8 / @ 0x83

The averaging constant with the last analysis frame.
If `0` is set, there is no averaging done, whereas a value of `1` means "overlap the previous and current buffer quite a lot while computing the value".
