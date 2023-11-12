#!/bin/sh

riscv32-unknown-linux-gnu-gcc hello-world.c -nostdlib -Wl,--section-start=.text=0x00400000 -o hello-world 
riscv32-unknown-linux-gnu-objcopy -O binary hello-world hello-world.bin 
riscv32-unknown-linux-gnu-objdump hello-world -d
