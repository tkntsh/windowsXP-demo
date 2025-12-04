/**
 * SOUND MANAGER MODULE
 * Handles all Windows XP sound effects
 */

class SoundManager {
  constructor() {
    this.sounds = {};
    this.muted = false;
    this.volume = 0.5;
    
    // Initialize sound objects
    this.initSounds();
  }
  
  /**
   * Initialize all sound effects
   * Note: Using data URIs for silent placeholders
   * Replace with actual XP sound files for authentic experience
   */
  initSounds() {
    // Create silent audio data URI as placeholder
    const silentAudio = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
    
    this.sounds = {
      startup: this.createAudio(silentAudio),
      logon: this.createAudio(silentAudio),
      windowOpen: this.createAudio(silentAudio),
      windowClose: this.createAudio(silentAudio),
      minimize: this.createAudio(silentAudio),
      maximize: this.createAudio(silentAudio)
    };
    
    // Set volume for all sounds
    Object.values(this.sounds).forEach(audio => {
      audio.volume = this.volume;
    });
  }
  
  /**
   * Create audio element
   */
  createAudio(src) {
    const audio = new Audio(src);
    audio.preload = 'auto';
    return audio;
  }
  
  /**
   * Play a sound by name
   */
  play(soundName) {
    if (this.muted) return;
    
    const sound = this.sounds[soundName];
    if (sound) {
      // Reset and play
      sound.currentTime = 0;
      sound.play().catch(err => {
        console.log('Sound play failed:', err);
      });
    }
  }
  
  /**
   * Play startup sound
   */
  playStartup() {
    this.play('startup');
  }
  
  /**
   * Play logon sound
   */
  playLogon() {
    this.play('logon');
  }
  
  /**
   * Play window open sound
   */
  playWindowOpen() {
    this.play('windowOpen');
  }
  
  /**
   * Play window close sound
   */
  playWindowClose() {
    this.play('windowClose');
  }
  
  /**
   * Play minimize sound
   */
  playMinimize() {
    this.play('minimize');
  }
  
  /**
   * Play maximize sound
   */
  playMaximize() {
    this.play('maximize');
  }
  
  /**
   * Set volume (0.0 to 1.0)
   */
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    Object.values(this.sounds).forEach(audio => {
      audio.volume = this.volume;
    });
  }
  
  /**
   * Mute all sounds
   */
  mute() {
    this.muted = true;
  }
  
  /**
   * Unmute all sounds
   */
  unmute() {
    this.muted = false;
  }
  
  /**
   * Toggle mute
   */
  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }
}

// Export singleton instance
export const soundManager = new SoundManager();
