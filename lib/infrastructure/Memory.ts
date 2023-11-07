/* eslint-disable no-multi-spaces */
/* eslint-disable padding-line-between-statements */
export type uint5  = number
export type uint8  = number
export type uint12 = number
export type uint16 = number
export type uint32 = number
export type int32  = number

export interface Memory {
  read8(address: uint32): uint8;
  write8(address: uint32, value: uint8): void;
  read16(address: uint32): uint16;
  write16(address: uint32, value: uint16): void;
  read32(address: uint32): uint32;
  write32(address: uint32, value: uint32): void;
}

export class RAM implements Memory {
  private readonly bytes: Uint8Array

  constructor(private readonly base: number, size: number) {
    this.bytes = new Uint8Array(size)
  }

  load(base: number, bytes: uint8[]) {
    if (base < this.base) throw new Error('Memory underflow')

    for (let i = 0; i < bytes.length; i++) {
      if (base + i < this.base + this.bytes.length) {
        this.bytes[base - this.base + i] = bytes[i]
      } else {
        throw new Error('Memory overflow')
      }
    }

    return this
  }

  private validateAddressInRange(address: uint32, size: number) {
    if (address < this.base) throw new Error('Address below base')
    if (address > this.base + this.bytes.length - size) throw new Error('Address above available space')
    if (address % size !== 0) throw new Error(`Memory alignment error while accessing address ${address} in block size ${size}`)
  }

  read8(address: uint32): number {
    this.validateAddressInRange(address, 1)

    return this.bytes[address - this.base]
  }

  write8(address: uint32, value: uint8): void {
    this.validateAddressInRange(address, 1)

    this.bytes[address - this.base] = value
  }

  read16(address: uint32): number {
    this.validateAddressInRange(address, 2)

    const n0 = this.bytes[address - this.base + 0] << 8
    const n1 = this.bytes[address - this.base + 1] << 0

    return n0 | n1
  }

  write16(address: uint32, value: uint16): void {
    this.validateAddressInRange(address, 2)

    this.bytes[address - this.base + 0] = (value & 0b11111111_00000000) >>> 8
    this.bytes[address - this.base + 1] = (value & 0b00000000_11111111) >>> 0
  }

  read32(address: uint32): number {
    this.validateAddressInRange(address, 4)

    const n0 = this.bytes[address - this.base + 0] << 24
    const n1 = this.bytes[address - this.base + 1] << 16
    const n2 = this.bytes[address - this.base + 2] << 8
    const n3 = this.bytes[address - this.base + 3] << 0

    return (n0 | n1 | n2 | n3) >>> 0
  }

  write32(address: uint32, value: uint16): void {
    this.validateAddressInRange(address, 4)

    this.bytes[address - this.base + 0] = (value & 0b11111111_00000000_00000000_00000000) >>> 24
    this.bytes[address - this.base + 1] = (value & 0b00000000_11111111_00000000_00000000) >>> 16
    this.bytes[address - this.base + 2] = (value & 0b00000000_00000000_11111111_00000000) >>> 8
    this.bytes[address - this.base + 3] = (value & 0b00000000_00000000_00000000_11111111) >>> 0
  }
}

export function dump(memory: Memory, from: number, to: number) {
  const line = []

  for (let i = 0; i < to - from; i++) {
    line.push(memory.read8(from + i).toHex8())
    if (line.length === 16) {
      console.log(line.join(' '))
      line.splice(0, line.length)
    }
  }

  if (line.length > 0) {
    console.log(line.join(' '))
  }
}
