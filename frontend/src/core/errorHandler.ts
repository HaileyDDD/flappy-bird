interface ErrorLog {
  message: string;
  timestamp: number;
  type: 'warning' | 'error' | 'info';
}

class ErrorHandler {
  private logs: ErrorLog[] = [];

  capture(error: Error, type: ErrorLog['type'] = 'error') {
    const log: ErrorLog = {
      message: error.message,
      timestamp: Date.now(),
      type
    };

    this.logs.push(log);
    this.reportToServer(log);
  }

  private async reportToServer(log: ErrorLog) {
    try {
      await fetch('/api/logs', {
        method: 'POST',
        body: JSON.stringify(log)
      });
    } catch (e) {
      console.error('日志上报失败', e);
    }
  }

  getLogs(type?: ErrorLog['type']) {
    return type 
      ? this.logs.filter(log => log.type === type)
      : this.logs;
  }
}

export const errorHandler = new ErrorHandler(); 