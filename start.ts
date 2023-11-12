#!/usr/bin/env -S npx ts-node

import './lib/utils'

import { readFile } from 'node:fs/promises'
import { Memory, RAM } from './lib/infrastructure/Memory'
import { Registers } from './lib/infrastructure/Registers'
import * as Ops from './lib/ops/index'

const registers = new Registers()
const ram = new RAM(0x00400000, 0x10000)
const ops = Object.entries(Ops).map(([, OpType]) => new OpType())

function initialize(pc: number, sp: number) {
  console.log('System initialization')

  // initialize program counter
  registers.pc = pc
  // initialize stack pointer
  registers.write(Registers.sp, sp)
}

async function load(filename: string, memory: Memory, address: number = memory.base) {
  const contents = await readFile(filename)
  memory.load(memory.base, contents)

  console.log('Loaded program:', contents.length)
  memory.dump(address, 40)
  console.log('')

  return contents.byteLength
}

function execute() {
  console.log('Execution:')
  registers.dump(-1, Registers.sp)

  for (let i = 0; i < 40; i += 4) {
    const { pc } = registers
    const instruction = ram.read32(pc)

    const op = ops.find(item => item.recognize(instruction))
    if (!op) throw new Error(`Unrecognized instruction: ${instruction.toBin32()}`)

    console.log(registers.pc.toHex32(), instruction.toHex32(), instruction.toBin32(), op)
    op.execute(instruction, registers, ram)
    registers.dump(-1, Registers.sp, 15)

    // advance program counter if it has not been modified by the operation (jumps!)
    if (registers.pc === pc) registers.pc += 4
  }
}

initialize(ram.base, ram.base + ram.size - 4)
await load('./hello-world/hello-world.bin', ram)
execute()
