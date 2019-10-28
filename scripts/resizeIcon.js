const sharp = require('sharp');

const sizes = [
	16,
	20,
	29,
	32,
	40,
	48,
	50,
	55,
	57,
	58,
	60,
	64,
	72,
	76,
	80,
	87,
	88,
	96,
	100,
	108,
	114,
	120,
	128,
	144,
	152,
	162,
	167,
	172,
	180,
	192,
	196,
	216,
	256,
	324,
	432,
	512,
	1024,
];

sizes.forEach(w => {
	sharp('./data/icon.png')
		.resize(w, w, {
			fit: 'inside', // cover, contain, fill, inside, outside
		})
		.toFile(`./data/resources/Icon-${w}.png`, (err, info) => {
			if (err) console.log('resized err', err);
			console.log('resized to ', w);
		});
});

// for IOS store
sharp('./data/icon.png')
	.resize(1024, 1024, {
		fit: 'inside', // cover, contain, fill, inside, outside
	})
	.removeAlpha()
	.toFile(`./data/resources/Icon-1024-noalpha.png`, (err, info) => {
		if (err) console.log('resized err', err);
		console.log('resized to 1024 alpha');
	});
