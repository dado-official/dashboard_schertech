module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: "#1B1B1B",
                unclicked: "#94A3BC",
                background: "#161616",
                backgroundHover: "#212121",
                hover: "#343434",
                onlineGreen: "#2DFD99",
                offlineRed: "#FF4B77",
                commitBlue: "#3963CD",
                commitBlueHover: "#4c7aed",
                input: "#343434"
            },
            spacing: {
                1.875: "1.875rem",
                13.313: "13.313rem",
                0.938: "0.938rem",
                0.688: "0.688rem",
                1.131: "1.131rem",
                1.188: "1.188rem",
                1.688: "1.688rem",
                2.563: "2.563rem",
                2.75: "2.75rem",
                2.813: "2.813rem",
                7.125: "7.125rem",
                14.625: "14.625rem",
                16.625: "16.625rem",
                22.625: "22.625rem",
                35.063: "35.063rem",
                48.688: "48.688rem",
                12.625: "12.625rem",
                addMaxHeight: "calc(( 100% - 2 / 48.688rem ) )",
                maxHeight: "calc(100% - 4rem)",
                minContent: "min-content",
                0.875: "0.875rem",
            },
            borderRadius: {
                0.938: "0.938rem",
            },
            boxShadow: {
                focusAdd: "0px 0px 4px 3px #3963CD"
            }
        },
    
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
