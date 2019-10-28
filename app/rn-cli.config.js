"use strict";

// https://facebook.github.io/metro/docs/en/configuration

const blacklist = require("metro-config/src/defaults/blacklist");
var path = require("path");
const cwd = path.resolve(__dirname);

function getWatchFolder() {
	return [
		cwd, // current directory
		path.resolve(cwd, "../infra")
	];
}

function getBlacklist() {
	var blist = [/..\/infra\/node_modules\/.*/];
	return blacklist(blist);
}

const extraNodeModules = {};
const installedDependencies = require("./package.json").dependencies;
const installedDependenciesInfra = require("../infra/package.json").dependencies;

Object.keys(installedDependencies).forEach(dep => {
	extraNodeModules[dep] = path.resolve(__dirname, "node_modules", dep);
});

var config = {
	projectRoot: path.resolve(__dirname),
	watchFolders: getWatchFolder(),
	resolver: {
		blacklistRE: getBlacklist(),
		extraNodeModules: extraNodeModules
	}
};

module.exports = config;
