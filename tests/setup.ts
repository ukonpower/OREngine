(globalThis as any).self = globalThis;

if (!(globalThis as any).crypto) {
  (globalThis as any).crypto = {
    randomUUID: () => '00000000-0000-0000-0000-000000000000',
  } as Crypto;
} else if (typeof (globalThis as any).crypto.randomUUID !== 'function') {
  (globalThis as any).crypto.randomUUID = () =>
    '00000000-0000-0000-0000-000000000000';
}
