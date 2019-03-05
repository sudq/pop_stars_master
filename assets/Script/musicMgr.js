/**
 * @author uu
 * @file  音乐控制组件
 * @todo 
 */
cc.Class({
  extends: cc.Component,
  properties: {
    volume: 1,
    audios: [cc.AudioSource],
    audioPrefab: cc.Prefab,
    //audioSource: cc.AudioSource,
  },
  init() {
    this.audio = []
    this.instanceAudio()
    this.createMusicPool()
  },
  createMusicPool() {
    this.musicPool = new cc.NodePool()
    for (let i = 0; i < 20; i++) {
      let music = cc.instantiate(this.audioPrefab)
      this.musicPool.put(music)
    }
  },
  instanceAudio() {

  },
  changeVol(vol) {
    this.volume = vol
    this.audios.forEach((item, index) => {
      // item.volume = vol
      this.audios[index].volume = vol
    })
  },
  onPlayAudio(num) {
    let self = this
    if (this.audios[num].isPlaying) {
      if (this.audios[num + 1]) {
        self.onPlayAudio(num + 1)
      } else {
        let music = null
        if (self.musicPool && self.musicPool.size() > 0) {
          music = self.musicPool.get()
        } else {
          music = cc.instantiate(self.audioPrefab)
        }
        music.parent = self.node
        this.audios[num + 1] = music.getComponent(cc.AudioSource)
        music.getComponent(cc.AudioSource).play()
      }

      //  music.getComponent(cc.AudioSource).audioClip=this.audios[num].audioClip
      // this.audios[num].stop()
      // this.audios[num].rewind()
      // this.audios[num].play()
    } else {
      this.audios[num].rewind()
      this.audios[num].play()
    }
  },
  start() {
    // this.onPlayAudio(1);
  },
});