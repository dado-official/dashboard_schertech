module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: "#1f1f1f",
                unclicked: "#94A3BC",
                background: "#161616",
                backgroundHover: "#212121",
                hover: "#343434",
                onlineGreen: "#81c784",
                offlineRed: "#f06292",
                light: "#bababa",
                blue: "#64b5f6",
                commitBlueHover: "#204196",
                blueLight: "rgb(48, 85, 179, 0.5)",
                input: "#262626",
                whiteLite: "rgb(255, 255, 255, 0.6)",
                input2: "#2f2f2f",
            },
            spacing: {
                1.875: "1.875rem",
                13.313: "13.313rem",
                0.938: "0.938rem",
                0.688: "0.688rem",
                0.875: "0.875rem",
                1.131: "1.131rem",
                1.188: "1.188rem",
                1.25: "1.25rem",
                1.688: "1.688rem",
                2.563: "2.563rem",
                2.75: "2.75rem",
                2.813: "2.813rem",
                7.125: "7.125rem",
                14.625: "14.625rem",
                16.625: "16.625rem",
                22.625: "22.625rem",
                23: "23rem",
                30.563: "30.563rem",
                35.063: "35.063rem",
                48.688: "48.688rem",
                12.625: "12.625rem",
                5.063: "5.063rem",
                addMaxHeight: "calc(( 100% - 2 / 48.688rem ) )",
                maxHeight: "calc(100% - 4rem)",
                minContent: "min-content",
                0.875: "0.875rem",
                navbarWidth: "calc(100% - 4rem)",
            },
            borderRadius: {
                0.938: "0.450rem",
                0.625: "0.325rem",
                0.313: "0.313rem",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
