type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Record<string, boolean>;

export function classNames(...args: ClassValue[]): string {
  const classes: string[] = [];

  for (const arg of args) {
    if (typeof arg === 'string') {
      const trimmed = arg.trim();

      if (trimmed.length > 0) {
        classes.push(trimmed);
      }
    } else if (typeof arg === 'number') {
      classes.push(String(arg));
    } else if (arg !== null && typeof arg === 'object') {
      for (const key of Object.keys(arg)) {
        if (arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
}
