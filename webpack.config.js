const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MODES = {
	development: "development",
	production: "production",
};

const mode = MODES[process.env.NODE_ENV] ?? MODES.development;

const config = {
	mode: mode,
	entry: path.join(__dirname, "src", "index.tsx"),
	output: {
		path: path.join(__dirname, "dist/"),
		publicPath: mode === "production" ? "./" : "/",
		clean: true,
	},
	resolve: {
		alias: {
			"@/src": path.resolve(__dirname, "src"),
			"@/components": path.resolve(__dirname, "src", "components"),
			"@/assets": path.resolve(__dirname, "src", "assets"),
			"@/api": path.resolve(__dirname, "src", "api"),
			"@/hooks": path.resolve(__dirname, "src", "hooks"),
			"@/data": path.resolve(__dirname, "src", "data"),
			"@/utils": path.resolve(__dirname, "src", "utils"),
			"@/contexts": path.resolve(__dirname, "src", "contexts"),
		},
		extensions: [".js", ".ts", ".tsx", ".jsx", ".scss"],
	},
	devServer: {
		port: 4000,
		hot: true,
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: "public",
					to: path.resolve(__dirname, "dist"),
				},
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss|css$/i,
				use: [
					"style-loader",
					"css-loader",
					"postcss-loader",
					"sass-loader",
				],
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
						presets: [
							"@babel/preset-env",
							["@babel/preset-react", { runtime: "automatic" }],
							"@babel/preset-typescript",
						],
					},
				},
			},
			{
				test: /\.(png|jpg|jpeg|ico|webp)/,
				type: "asset/resource",
			},
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				use: ["@svgr/webpack"],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
				generator: {
					filename: "assets/fonts/[name][ext][query]",
				},
			},
		],
	},
};
module.exports = config;
