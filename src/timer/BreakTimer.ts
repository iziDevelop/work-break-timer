import { Notifier } from '../notifier/Notifier';

export class BreakTimer {
    private workInterval: number;
    private breakInterval: number;
    private notifier: Notifier;

    private workTimerId: number | null = null;
    private breakTimerId: number | null = null;

    constructor(workInterval: number, breakInterval: number, notifier: Notifier) {
        this.workInterval = workInterval;
        this.breakInterval = breakInterval;
        this.notifier = notifier;
    }

    public start(): void {
        this.startWorkTimer();
    }

    private startWorkTimer(): void {
        this.clearTimers();
        this.workTimerId = setInterval(() => {
            this.notifier.notify('Time to take a break! Rest for 15 minutes.');
            this.startBreakTimer();
        }, this.workInterval);
    }

    private startBreakTimer(): void {
        this.breakTimerId = setTimeout(() => {
            this.notifier.notify('Break over! Back to work.');
            this.startWorkTimer();
        }, this.breakInterval);
    }

    private clearTimers(): void {
        if (this.workTimerId !== null) {
            clearInterval(this.workTimerId);
            this.workTimerId = null;
        }
        if (this.breakTimerId !== null) {
            clearTimeout(this.breakTimerId);
            this.breakTimerId = null;
        }
    }
}