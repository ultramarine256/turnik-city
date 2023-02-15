export {};

declare global {
  interface Window {
    spark: {
      testDrive: (args: any) => any;
      dealerVisit: (args: any) => any;
      tradeIn: (args: any) => any;
      sticker: (args: any) => any;
      appendButtons: (args: any) => any;
    };
    _sparkSettings: {
      siteSlug: string;
      debugMode: boolean;
    };
    sparkLoadedCallback: any;
    vvIframeLoaded: () => any;
  }
}
