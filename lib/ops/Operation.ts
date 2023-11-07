import { Memory, uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'

export interface Operation {
  recognize(arg0: uint32): boolean
  execute(instruction: uint32, registers: Registers, memory: Memory): void
}
