#!/usr/bin/env -S npx ts-node

console.log('Hello, world!')

class Registers {
  x = new Array(32).fill(0)
  pc = 0
}

interface Memory {
  read(address: number): number
  write(address: number, value: number): void
}

class RAM implements Memory {
  private readonly cells: Uint32Array

  constructor(private readonly start: number, size: number) {
    this.cells = new Uint32Array(size)
  }

  private checkAddressAlignment(address: number) {
    if (address % 4 !== 0) throw new Error('Address must be DWORD-aligned')
  }

  read(address: number): number {
    this.checkAddressAlignment(address)

    return this.cells[(address - this.start) / 4]
  }

  write(address: number, value: number) {
    this.checkAddressAlignment(address)

    return this.cells[(address - this.start) / 4]
  }

  load(...source: number[]) {
    for (let i = 0; i < source.length; i++) {
      if (i < this.cells.length) {
        this.cells[i] = source[i]
      }
    }
  }
}

class InstructionDecoder {
  opcode(data: number) {
    return (data & 0b0000000000000_00000_000_00000_1111111)
  }

  funct3(data: number) {
    return (data & 0b0000000000000_00000_111_00010_0000000) >> 11
  }

  rd(data: number) {
    return (data & 0b0000000000000_00000_000_11111_0000000) >> 7
                   0b0000000000001_00001_000_00011_0010011
  }

  rs1(data: number) {
    return (data & 0b0000000000000_11111_000_00000_0000000) >> 16
  }

  rs2(data: number) {
    return (data & 0b00000000_11111_00000_000_00000_0000000) >> 19
  }

  shamt(data: number) {
    return (data & 0b00000000_11111_00000_000_00000_0000000) >> 19
  }

  imm(data: number) {
    return (data & 0b00011111111111_00000_000_00000_0000000) >> 18
  }

  succ(data: number) {
    return (data & 0b000000_0000_1111_00000_000_00000_0000000) >> 19
  }

  pred(data: number) {
    return (data & 0b000000_1111_0000_00000_000_00000_0000000) >> 23
  }
}

interface Instruction {
  match(instruction: number): boolean
  execute(instruction: number): void
}

class LI implements Instruction {
  private readonly decoder = new InstructionDecoder()

  constructor(private readonly registers: Registers) {
  }

  match(instruction: number): boolean {
    return (instruction & 0b111_0000_111111) === 0b000_0000_0010011
  }

  execute(instruction: number): void {
    const rd  = this.decoder.rd(instruction)
    const rs1 = this.decoder.rs1(instruction)
    const imm = this.decoder.imm(instruction)

    this.registers.x[rd] = this.registers.x[rs1] + imm
  }
}

class ADDI implements Instruction {
  private readonly decoder = new InstructionDecoder()

  constructor(private readonly registers: Registers) {
  }

  match(instruction: number): boolean {
    return (instruction & 0b111_0000_111111) === 0b000_0000_0010011
  }

  execute(instruction: number): void {
    const rd  = this.decoder.rd(instruction)
    const rs1 = this.decoder.rs1(instruction)
    const imm = this.decoder.imm(instruction)

    this.registers.x[rd] = this.registers.x[rs1] + imm
  }
}

class ADD implements Instruction {
  private readonly decoder = new InstructionDecoder()

  constructor(private readonly registers: Registers) {
  }

  match(instruction: number): boolean {
    return (instruction & 0b111_0000_111111) === 0b000_0000_0110011
  }

  execute(instruction: number): void {
    const rd  = this.decoder.rd(instruction)
    const rs1 = this.decoder.rs1(instruction)
    const imm = this.decoder.imm(instruction)

    this.registers.x[rd] = this.registers.x[rs1] + imm
  }
}

class CPU {
  readonly registers = new Registers()

  readonly instructions: Instruction[] = [
    new ADDI(this.registers),
    new ADD(this.registers),
  ]

  public step(memory: Memory) {
    const data = memory.read(this.registers.pc)
    this.registers.pc += 4

    const instruction = this.instructions.find(instr => instr.match(data))
    if (!instruction) throw new Error('Not implemented')

    instruction.execute(data)
  }
}

// ----------------------------------------------------------------------------
// Setup
// ----------------------------------------------------------------------------

const cpu = new CPU()
const memory = new RAM(0x00000000, 1024 * 1024)

// ----------------------------------------------------------------------------
// Initialization
// ----------------------------------------------------------------------------

memory.load(
  0b00000000001_00001_000_00011_0010011,   // ADDI 1, r3
  0b0000000_00001_00010_000_00100_011011,  // ADD  r1, r2, r4
)

// ----------------------------------------------------------------------------
// Execution
// ----------------------------------------------------------------------------

cpu.step(memory)
cpu.step(memory)
