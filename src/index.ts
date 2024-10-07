import { Notifier } from './notifier/Notifier';
import { BreakTimer } from './timer/BreakTimer';

const audioFilePath = '../public/message.mp3';

const workInterval = 45 * 60 * 1000;
const breakInterval = 15 * 60 * 1000;

const notifier = new Notifier(audioFilePath);
const breakTimer = new BreakTimer(workInterval, breakInterval, notifier);

breakTimer.start();
