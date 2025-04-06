import { Howl } from 'howler';

class SoundManager {
  constructor() {
    this.sounds = {
      gearBreak: new Howl({ src: ['/sounds/gear_break.mp3'], volume: 0.7 }),
      leverBreak: new Howl({ src: ['/sounds/lever_break.mp3'], volume: 0.7 }),
      explosion: new Howl({ src: ['/sounds/explosion.mp3'], volume: 0.8 }),
      crumble: new Howl({ src: ['/sounds/crumble.mp3'], volume: 0.6 }),
      machineHum: new Howl({ src: ['/sounds/machine_hum.mp3'], volume: 0.4, loop: true })
    };

    this.sounds.machineHum.play();
  }
  
  playSound(name) {
    if (this.sounds[name]) {
      this.sounds[name].play();
    }
  }
  
  stopSound(name) {
    if (this.sounds[name]) {
      this.sounds[name].stop();
    }
  }
  
  playRandomDestructionSound() {
    const sounds = ['gearBreak', 'leverBreak', 'crumble'];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    this.playSound(randomSound);
  }
  
  playExplosion() {
    this.playSound('explosion');
  }
}

const soundManager = typeof window !== 'undefined' ? new SoundManager() : null;

export default soundManager;
