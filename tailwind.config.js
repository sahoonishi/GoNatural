import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
				primaryMain: "#FFFFFF",
				primaryDark: "#005580",
				primaryLight: "#F09766",
				secondaryMain: "#ffea28",
				secondaryDark: "#f5d300",
				secondaryLight: "#ffeb4d",
				textColor: "#737171",
			},
    },
    fontFamily: {
      DM: ["DM Sans", "sans-serif"],
    },
  },
  plugins: [],
});
