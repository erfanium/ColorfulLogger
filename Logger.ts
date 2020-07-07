interface LoggerBase {
   debug(...args: unknown[]): void
   info(...args: unknown[]): void
   warn(...args: unknown[]): void
   error(...args: unknown[]): void
}

const mockLogger: LoggerBase = {
   debug: () => undefined,
   info: () => undefined,
   warn: () => undefined,
   error: () => undefined
}

interface PrefixFactory {
   (method: string): string
}

let colorSeed = Math.floor(Math.random() * 6) // 0 to 5
function getColor(): number {
   colorSeed++
   if (colorSeed === 6) colorSeed = 0
   return colorSeed + 31
}

export class Logger {
   namespace: string
   base: LoggerBase = console
   logPrefix?: string
   color = getColor()
   methodPrefixes: {
      [key in keyof LoggerBase]: string
   }

   constructor(namespace: string) {
      this.namespace = namespace
      if (process.env.NODE_ENV === 'test') this.base = mockLogger
      const prefixFactory = this.makePrefixFactory()
      this.methodPrefixes = {
         debug: prefixFactory('DEBUG'),
         info: prefixFactory('INFO'),
         warn: prefixFactory('WARN'),
         error: prefixFactory('ERROR')
      }
   }

   private makePrefixFactory(): PrefixFactory  {
      if (process.env.NODE_ENV === 'development') {
         return (method): string => `\x1b[${this.color}m${method} | ${this.namespace} |\x1b[0m`
      } else {
         return (method): string => `${method} | ${this.namespace} |`
      }
   }

   debug(...args: unknown[]): void {
      this.base.debug(this.methodPrefixes.debug, ...args)
   }
   info(...args: unknown[]): void {
      this.base.info(this.methodPrefixes.info, ...args)
   }
   warn(...args: unknown[]): void {
      this.base.warn(this.methodPrefixes.warn, ...args)
   }
   error(...args: unknown[]): void {
      this.base.error(this.methodPrefixes.error, ...args)
   }
}
