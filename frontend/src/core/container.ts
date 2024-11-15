type Constructor<T = any> = new (...args: any[]) => T;

class Container {
  private services = new Map<string, any>();

  register<T>(key: string, service: T) {
    this.services.set(key, service);
  }

  resolve<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service ${key} not found`);
    }
    return service;
  }

  singleton<T>(key: string, constructor: Constructor<T>) {
    if (!this.services.has(key)) {
      const instance = new constructor();
      this.register(key, instance);
    }
    return this.resolve<T>(key);
  }
}

export const container = new Container(); 