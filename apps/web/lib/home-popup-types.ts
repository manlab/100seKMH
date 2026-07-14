export const HOME_POPUP_DISPLAY_TYPES = ["content", "image"] as const;

export type HomePopupDisplayType = (typeof HOME_POPUP_DISPLAY_TYPES)[number];
