import type { IconProps } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";

export const LedgerIcon = (props: IconProps) => (
  <Icon viewBox="0 0 32 32" {...props}>
    <rect width="32" height="32" rx="6" fill="#000" />
    <path
      d="M10 10h12v12H10z"
      fill="#fff"
    />
    <rect x="12" y="12" width="8" height="8" fill="#000" />
  </Icon>
);
