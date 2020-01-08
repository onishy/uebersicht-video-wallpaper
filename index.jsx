import { css } from "uebersicht"

export const command = "osascript video-wallpaper.widget/get_wallpaper.applescript";
export const refreshFrequency = 1000;

export const activateForSpecificWallpaperOnly = true;
// Name of the wallpaper file to which the wallpaper is activated
export const targetWallpaper = "target-wallpaper.jpeg";

// Name of the video file
export const videoPath = "video-wallpaper.widget/wallpaper-video.mp4";
let firstFlag = false;

export const container = css`
  top  : 0px;
  left : 0px;
  z-index : -100;
`

export const render = ({output, error}) => {
  if (!firstFlag)
  {
    $('#video-wallpaper-widget-index-jsx').css("z-index", -100);
    firstFlag = true;
  }
  return error ? (
    <div>Something went wrong: <strong>{String(error)}</strong></div>
  ) :
  output.video ? (
    <div id='container' className={container}>
      <video preload='auto' autoPlay muted loop height='900'>
        <source  src={output.video} type='video/mp4' />
          <p> hemi </p>
        </video>
    </div>
  ) : <div></div>;
}

export const updateState = (event, previousState) => {
  if (event.error) {
    return { ...previousState, error: `We got an error: ${event.error}` };
  }
  const wallpaperName = event.output.replace('\n', '').split(':').slice(-1)[0];
  let videoName = undefined;
  if (!activateForSpecificWallpaperOnly || wallpaperName == targetWallpaper)
  {
    videoName = videoPath;
  }
  return {
    output: {
      wallpaper: wallpaperName,
      video: videoName
    }
  };
}