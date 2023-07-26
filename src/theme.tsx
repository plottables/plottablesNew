import * as React from "react"
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from "react-router-dom"
import { createTheme, PaletteColor } from "@mui/material/styles"
import { LinkProps } from "@mui/material/Link"
import {linearProgressClasses} from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    upcoming: PaletteColor
  }
  interface PaletteOptions {
    upcoming: PaletteColor
  }
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    upcoming: true
  }
}

const LinkBehavior = React.forwardRef<
  any,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
  >((props, ref) => {
  const { href, ...other } = props
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />
})

const { palette } = createTheme()

const theme = createTheme({
  palette: {
    primary: {
      main: "#212121",
      contrastText: "#ECF0F1"
    },
    secondary: {
      main: "#2C3E50",
      contrastText: "#ECF0F1"
    },
    success: {
      main: "#27AE60"
    },
    error: {
      main: "#E74C3C"
    },
    upcoming: palette.augmentColor({
      color: {
        main: "#CE7A18"
      }
    })
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 750,
      laptop: 1024,
      desktop: 1200,
    },
  },
  typography: {
    fontFamily: [
      "Gochi Hand",
      "sans-serif"
    ].join(",")
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior
      } as LinkProps
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          lineHeight: "25px",
          fontSize: "20px",
          letterSpacing: "1px",
          wordSpacing: "5px"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: "none",
          color: "inherit",
          border: "none",
          padding: "0",
          font: "inherit",
          cursor: "pointer",
          outline: "inherit",
          '&:hover': {
            backgroundColor: 'transparent',
            textDecoration: "underline"
          },
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          background: "none",
          color: "inherit",
          border: "none",
          padding: "0",
          font: "inherit",
          cursor: "pointer",
          outline: "inherit",
          '&:hover': {
            backgroundColor: 'transparent',
            textDecoration: "underline"
          },
        }
      }
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          height: "25px"
        }
      }
    }
  }
})

theme.typography.h1 = {
  align: "center"
}

// green highlight
theme.typography.h2 = {
  background: "linear-gradient(104deg, rgba(130, 255, 173, 0) 0.9%, rgba(130, 255, 173, 1.25) 2.4%, rgba(130, 255, 173, 0.5) 5.8%, rgba(130, 255, 173, 0.1) 93%, rgba(130, 255, 173, 0.7) 96%, rgba(130, 255, 1732, 0) 98%), linear-gradient(183deg, rgba(130, 255, 173, 0) 0%, rgba(130, 255, 173, 0.3) 7.9%, rgba(130, 255, 173, 0) 15%)",
  paddingLeft: "20px",
  paddingRight: "20px"
}

// orange highlight
theme.typography.h3 = {
  background: "linear-gradient(104deg, rgba(243, 149, 57, 0) 0.9%, rgba(243, 149, 57, 1.25) 2.4%, rgba(243, 149, 57, 0.5) 5.8%, rgba(243, 149, 57, 0.1) 93%, rgba(243, 149, 57, 0.7) 96%, rgba(243, 149, 57, 0) 98%), linear-gradient(183deg, rgba(243, 149, 57, 0) 0%, rgba(243, 149, 57, 0.3) 7.9%, rgba(243, 149, 57, 0) 15%)",
  paddingLeft: "20px",
  paddingRight: "20px"
}

// blue highlight
theme.typography.h4 = {
  background: "linear-gradient(104deg, rgba(173, 216, 230, 0) 0.9%, rgba(173, 216, 230, 1.25) 2.4%, rgba(173, 216, 230, 0.5) 5.8%, rgba(173, 216, 230, 0.1) 93%, rgba(173, 216, 230, 0.7) 96%, rgba(173, 216, 230, 0) 98%), linear-gradient(183deg, rgba(173, 216, 230, 0) 0%, rgba(173, 216, 230, 0.3) 7.9%, rgba(173, 216, 230, 0) 15%)",
  paddingLeft: "20px",
  paddingRight: "20px"
}

// red highlight
theme.typography.h5 = {
  background: "linear-gradient(104deg, rgba(255, 114, 118, 0) 0.9%, rgba(255, 114, 118, 1.25) 2.4%, rgba(255, 114, 118, 0.5) 5.8%, rgba(255, 114, 118, 0.1) 93%, rgba(255, 114, 118, 0.7) 96%, rgba(255, 114, 118, 0) 98%), linear-gradient(183deg, rgba(255, 114, 118, 0) 0%, rgba(255, 114, 118, 0.3) 7.9%, rgba(255, 114, 118, 0) 15%)",
  paddingLeft: "20px",
  paddingRight: "20px"
}

theme.typography.h6 = {
  color: "blue",
  fontWeight: 1
}

export default theme
