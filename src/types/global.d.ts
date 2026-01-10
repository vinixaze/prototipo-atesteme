export {};

declare global {
  interface Window {
    chatCompany?: string;
    chatChannel?: string;
    chatNotificationSound?: string;
    chatHeaderColor?: string;
    chatHeaderIcon?: string;
    chatTitle?: string;
    chatFooterText?: string;
  }
}
