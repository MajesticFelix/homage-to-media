import { Howl } from 'howler';

class SoundManager {
  constructor() {
    this.sounds = {
      gearBreak: new Howl({ src: ['/sounds/gear_break.mp3'], volume: 0.7 }),
      leverBreak: new Howl({ src: ['/sounds/lever_break.mp3'], volume: 0.7 }),
      metalStress: new Howl({ src: ['/sounds/metal_stress.mp3'], volume: 0.5, loop: true }),
      explosion: new Howl({ src: ['/sounds/explosion.mp3'], volume: 0.8 }),
      crumble: new Howl({ src: ['/sounds/crumble.mp3'], volume: 0.6 }),
      machineHum: new Howl({ src: ['/sounds/machine_hum.mp3'], volume: 0.3, loop: true })
    };
    
    // Playing ambient sounds
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
  
  startStressSound(intensity = 0.5) {
    this.sounds.metalStress.volume(intensity);
    this.playSound('metalStress');
  }
}

// Create a singleton instance
const soundManager = typeof window !== 'undefined' ? new SoundManager() : null;

export default soundManager;
