const express = require('express');
const router = express.Router();
const Director = require('../models/Director');

router.get('/', (req, res) => {
	const promise = Director.aggregate([
		{
			$lookup: {
				from: 'movies',//database'te hangi collection ile join edilecek 
				localField: '_id',//director collectioninin hangi alanına göre join edilecek
				foreignField: 'director_id',//movie collectioninin hangi alanına göre join edilecek
				as: 'movies'//movie datası gibi dönenecek
			}
		},
		{
			$unwind: {
				path: '$movies',
				preserveNullAndEmptyArrays: true//filme sahip olmayan yönetmenleride getir
			}
		},
		{
			$group: {//donulecek data atamalari
				_id: {
					_id: '$_id',
					name: '$name',
					surname: '$surname',
					bio: '$bio'
				},
				movies: {
					$push: '$movies'
				}
			}
		},
		{
			$project: {//donulecek data
				_id: '$_id._id',
				name: '$_id.name',
				surname: '$_id.surname',
				bio:'$_id.bio',
				movies: '$movies'
			}
		}
	]);

	promise.then((data) => {
		res.json(data);
	}).catch((err) => {
		res.json(err);
	});
});
router.get('/:director_id', (req, res) => {
	const promise = Director.aggregate([
		{
			$match: {
				'_id': mongoose.Types.ObjectId(req.params.director_id)
			}
		},
		{
			$lookup: {
				from: 'movies',
				localField: '_id',
				foreignField: 'director_id',
				as: 'movies'
			}
		},
		{
			$unwind: {
				path: '$movies',
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$group: {
				_id: {
					_id: '$_id',
					name: '$name',
					surname: '$surname',
					bio: '$bio'
				},
				movies: {
					$push: '$movies'
				}
			}
		},
		{
			$project: {
				_id: '$_id._id',
				name: '$_id.name',
				surname: '$_id.surname',
				movies: '$movies'
			}
		}
	]);

	promise.then((data) => {
		res.json(data);
	}).catch((err) => {
		res.json(err);
	});
});
router.put('/:director_id', (req, res, next) => {
	const promise = Director.findByIdAndUpdate(
		req.params.director_id,
		req.body,
		{
			new: true
		}
	);
	promise.then((director) => {
		if (!director)
			next({ message: 'The director was not found.', code: 99 });

		res.json(director);
	}).catch((err) => {
		res.json(err);
	});
});
router.delete('/:director_id', (req, res, next) => {
	const promise = Director.findByIdAndRemove(req.params.director_id);
	promise.then((director) => {
		console.log(director);
		if (!director)
			next({ message: 'The director was not found.', code: 99 });

		res.json(director);
	}).catch((err) => {
		res.json(err);
	});
});


module.exports = router;
