import React from "react";
import { OKShareButton as OriginalShareButton } from "react-share";

// Wrapper qui retire networkName avant de rendre
const ShareButtonWithoutNetworkName = React.forwardRef((props: any, ref) => {
  const { networkName, ...rest } = props;
  return <OriginalShareButton {...rest} ref={ref} />;
});

export default ShareButtonWithoutNetworkName;
