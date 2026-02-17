import { loadFont as loadPressStart } from "@remotion/google-fonts/PressStart2P";
import { loadFont as loadVT323 } from "@remotion/google-fonts/VT323";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

export const { fontFamily: pixelFont } = loadPressStart();
export const { fontFamily: terminalFont } = loadVT323();
export const { fontFamily: bodyFont } = loadInter();
