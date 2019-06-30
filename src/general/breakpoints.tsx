enum Breakpoint {
  MobileMin = "320px",
  MobileMax = "767px",

  TabletMin = "768px",
  TabletMax = "959px",

  DesktopMin = "960px",
  DesktopMax = "1440px"
}

interface IRange<T> {
  readonly lower?: T;
  readonly upper?: T;
}

const ScreenWithin = (range: IRange<Breakpoint>) =>
  `@media screen and (min-width: ${range.lower ||
    Breakpoint.MobileMin}) and (max-width: ${range.upper ||
    Breakpoint.DesktopMax})`;

export { Breakpoint, ScreenWithin };
