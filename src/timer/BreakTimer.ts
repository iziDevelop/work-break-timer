import { Notifier } from '../notifier/Notifier';

/**
 * Класс BreakTimer управляет чередующимися интервалами работы и
 * перерывами, уведомляя пользователя, когда пришло время переключиться.
 */
export class BreakTimer {
    private readonly workInterval: number;
    private readonly breakInterval: number;
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
            this.notifier.notify('Время отдохнуть! Перерыв 15 минут!');
            this.startBreakTimer();
        }, this.workInterval);
    }

    private startBreakTimer(): void {
        this.breakTimerId = setTimeout(() => {
            this.notifier.notify('Перерыв окончен! Время поработать.');
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
