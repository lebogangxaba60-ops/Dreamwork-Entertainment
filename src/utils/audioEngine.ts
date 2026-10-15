/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Real Web Audio synthesizer providing authentic atmospheric previews
 * for SA Hip-Hop and SA R&B tracks with zero external audio assets.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrackId: string | null = null;
  private timer: number | null = null;
  private volumeNode: GainNode | null = null;
  private masterVolume: number = 0.7;
  private onStateChange: ((isPlaying: boolean, trackId: string | null) => void) | null = null;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.volumeNode = this.ctx.createGain();
      this.volumeNode.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
      this.volumeNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(callback: (isPlaying: boolean, trackId: string | null) => void) {
    this.onStateChange = callback;
  }

  public playTrack(trackId: string, genre: 'SA Hip-Hop' | 'SA R&B' | 'SA Trap-Soul') {
    this.init();
    if (!this.ctx || !this.volumeNode) return;

    if (this.isPlaying) {
      this.stop();
    }

    this.isPlaying = true;
    this.currentTrackId = trackId;
    if (this.onStateChange) this.onStateChange(true, trackId);

    // Play generative atmospheric chords & 808 pattern based on genre
    this.scheduleAtmosphericLoop(genre);
  }

  private scheduleAtmosphericLoop(genre: 'SA Hip-Hop' | 'SA R&B' | 'SA Trap-Soul') {
    if (!this.ctx || !this.volumeNode || !this.isPlaying) return;

    const chords =
      genre === 'SA Hip-Hop'
        ? [
            [65.41, 130.81, 196.0, 233.08], // C2 / Eb / G / Bb (Dark minor)
            [58.27, 116.54, 174.61, 207.65], // Bb1 / F / Ab
            [73.42, 146.83, 220.0, 261.63], // D2 / A / C
            [61.74, 123.47, 185.0, 220.0], // B1 / F# / A
          ]
        : [
            [130.81, 196.0, 246.94, 293.66], // Cmaj9 (Soul R&B)
            [110.0, 164.81, 220.0, 261.63], // Am9
            [146.83, 220.0, 261.63, 329.63], // Dm9
            [98.0, 146.83, 196.0, 246.94], // G9 sus
          ];

    let step = 0;
    const beatInterval = genre === 'SA Hip-Hop' ? 900 : 1200;

    const tick = () => {
      if (!this.isPlaying || !this.ctx || !this.volumeNode) return;

      const chord = chords[step % chords.length];
      const now = this.ctx.currentTime;

      // Warm Filtered Pad / Rhodes Chords
      chord.forEach((freq, idx) => {
        if (!this.ctx || !this.volumeNode) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = genre === 'SA Hip-Hop' ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Lowpass filter for smooth warm sound
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(genre === 'SA Hip-Hop' ? 450 : 850, now);
        filter.Q.setValueAtTime(2, now);

        const duration = (beatInterval / 1000) * 1.8;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.06 / (idx + 1), now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.volumeNode);

        osc.start(now);
        osc.stop(now + duration);
      });

      // 808 Sub Kick for Hip Hop & Trap-Soul
      if (genre === 'SA Hip-Hop' || genre === 'SA Trap-Soul') {
        const subOsc = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();

        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(75, now);
        subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.35);

        subGain.gain.setValueAtTime(0.2, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

        subOsc.connect(subGain);
        subGain.connect(this.volumeNode);

        subOsc.start(now);
        subOsc.stop(now + 0.6);
      }

      step++;
      this.timer = window.setTimeout(tick, beatInterval);
    };

    tick();
  }

  public pause() {
    this.stop();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.onStateChange) this.onStateChange(false, this.currentTrackId);
  }

  public setVolume(val: number) {
    this.masterVolume = Math.max(0, Math.min(1, val));
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.masterVolume;
  }

  public getTrackId(): string | null {
    return this.currentTrackId;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const soundEngine = new AudioEngine();
