import { execFile } from 'child_process';
import { access } from 'fs';
import { constants } from 'fs/promises';

/**
 * Класс Notifier отвечает за воспроизведение звуков уведомлений
 * и отображение предупреждающих сообщений
 *
 * @class
 */
export class Notifier {
    private readonly audioFilePath: string;

    constructor(audioFilePath: string) {
        this.audioFilePath = audioFilePath;
    }

    public async playNotificationSound(): Promise<void> {
        try {
            await access(this.audioFilePath, constants.R_OK);
            await new Promise<void>((resolve, reject) => {
                execFile('afplay', [this.audioFilePath], (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Ошибка воспроизведения: ${error.message}`);
                        reject(error);
                        return;
                    }
                    console.log('Аудиофайл воспроизведен успешно.');
                    resolve();
                });
            });
        } catch (err) {
            console.error(`Файл не доступен: ${(err as NodeJS.ErrnoException).message}`);
        }
    }

    public notify(message: string): void {
        this.playNotificationSound().then(() => {
            console.log(message);
        }).catch(error => {
            console.error(`Ошибка уведомления: ${error.message}`);
        });
    }
}
