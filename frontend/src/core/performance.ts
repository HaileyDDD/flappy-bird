class PerformanceMonitor {
  private metrics: Record<string, number[]> = {};

  track(key: string, fn: Function) {
    return (...args: any[]) => {
      const start = performance.now();
      const result = fn(...args);
      const end = performance.now();

      if (!this.metrics[key]) {
        this.metrics[key] = [];
      }
      this.metrics[key].push(end - start);

      return result;
    };
  }

  getAverage(key: string) {
    const times = this.metrics[key] || [];
    return times.reduce((a, b) => a + b, 0) / times.length;
  }
}

export const performanceMonitor = new PerformanceMonitor(); 