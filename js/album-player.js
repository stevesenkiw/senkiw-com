const albumAudio = document.querySelector('.album-player');
const trackButtons = Array.from(document.querySelectorAll('.track-list button'));
const skipButtons = Array.from(document.querySelectorAll('.track-skip'));
const nowPlaying = document.querySelector('.now-playing');

const tracks = trackButtons.map((button, index) => ({
  button,
  index,
  start: Number(button.dataset.start),
  label: button.textContent.trim().replace(/\s+/g, ' '),
}));

function currentTrackIndex() {
  const time = albumAudio?.currentTime || 0;
  let activeIndex = 0;

  tracks.forEach((track, index) => {
    if (time >= track.start - 0.25) activeIndex = index;
  });

  return activeIndex;
}

function setActiveTrack(index) {
  tracks.forEach((track, trackIndex) => {
    const active = trackIndex === index;
    track.button.classList.toggle('is-active', active);
    track.button.setAttribute('aria-current', active ? 'true' : 'false');
  });

  if (nowPlaying && tracks[index]) nowPlaying.textContent = tracks[index].label;
}

function playTrack(index) {
  if (!albumAudio || !tracks[index]) return;

  albumAudio.currentTime = tracks[index].start;
  setActiveTrack(index);
  albumAudio.play().catch(() => {});
}

trackButtons.forEach((button, index) => {
  button.addEventListener('click', () => playTrack(index));
});

skipButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const direction = Number(button.dataset.skip);
    const nextIndex = Math.min(Math.max(currentTrackIndex() + direction, 0), tracks.length - 1);
    playTrack(nextIndex);
  });
});

albumAudio?.addEventListener('timeupdate', () => {
  setActiveTrack(currentTrackIndex());
});

setActiveTrack(0);
