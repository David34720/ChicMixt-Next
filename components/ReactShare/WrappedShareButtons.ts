// WrappedShareButtons.ts
import { withoutNetworkName } from "./withoutNetworkName";
import {
  TwitterShareButton as OriginalTwitterShareButton,
  FacebookShareButton as OriginalFacebookShareButton,
  TelegramShareButton as OriginalTelegramShareButton,
  WhatsappShareButton as OriginalWhatsappShareButton,
  LinkedinShareButton as OriginalLinkedinShareButton,
  PinterestShareButton as OriginalPinterestShareButton,
  RedditShareButton as OriginalRedditShareButton,
  TumblrShareButton as OriginalTumblrShareButton,
  EmailShareButton as OriginalEmailShareButton,
} from "react-share";

export const TwitterShareButton = withoutNetworkName(OriginalTwitterShareButton);
export const FacebookShareButton = withoutNetworkName(OriginalFacebookShareButton);
export const TelegramShareButton = withoutNetworkName(OriginalTelegramShareButton);
export const WhatsappShareButton = withoutNetworkName(OriginalWhatsappShareButton);
export const LinkedinShareButton = withoutNetworkName(OriginalLinkedinShareButton);
export const PinterestShareButton = withoutNetworkName(OriginalPinterestShareButton);
export const RedditShareButton = withoutNetworkName(OriginalRedditShareButton);
export const TumblrShareButton = withoutNetworkName(OriginalTumblrShareButton);
export const EmailShareButton = withoutNetworkName(OriginalEmailShareButton);
