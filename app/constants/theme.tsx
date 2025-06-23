export const theme = {
    colors: {
        primary: "#E1D5E7",
        white: "#fff",
        background: "#f9f9f9",
        text: {
            primary: "#333",
            secondary: "#666",
            placeholder: "#999",
            light: "lightgray",
        },
        border: {
            light: "#eee",
            dark: "#e0e0e0",
        },
    },
    spacing: {
        xs: 5,
        sm: 8,
        md: 10,
        lg: 15,
        xl: 20,
        xxl: 25,
    },
    typography: {
        sizes: {
            small: 16,
            medium: 18,
            large: 20,
            xlarge: 24,
            xxlarge: 28,
        },
        weights: {
            medium: "500" as const,
            semibold: "600" as const,
            bold: "bold" as const,
        },
    },
    borderRadius: {
        medium: 8,
    },
    common: {
        container: {
            flex: 1,
            backgroundColor: "#fff",
        },
        safeContainer: {
            flex: 1,
            backgroundColor: "#E1D5E7",
        },
        input: {
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 8,
            padding: 15,
            fontSize: 16,
            backgroundColor: "#f9f9f9",
        },
        centerContent: {
            flex: 1,
            justifyContent: "center" as const,
            alignItems: "center" as const,
        },
        header: {
            backgroundColor: "#E1D5E7",
            padding: 20,
            paddingTop: 10,
        },
        headerTitle: {
            fontSize: 28,
            fontWeight: "bold" as const,
            color: "#333",
            textAlign: "center" as const,
        },
    }
};

export default theme;