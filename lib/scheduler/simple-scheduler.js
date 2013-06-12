/*
 * config-router.js
 *
 * Copyright (C) 2009-13 by RStudio, Inc.
 *
 * This program is licensed to you under the terms of version 3 of the
 * GNU Affero General Public License. This program is distributed WITHOUT
 * ANY EXPRESS OR IMPLIED WARRANTY, INCLUDING THOSE OF NON-INFRINGEMENT,
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Please refer to the
 * AGPL (http://www.gnu.org/licenses/agpl-3.0.txt) for more details.
 *
 */
var Scheduler = require('./scheduler');
var map = require('../core/map');
var util = require('util');

var Q = require('q');

var SimpleScheduler = function() {
	//run base Scheduler's constructor.
	Scheduler.call(this);
	this.$workerMap = map.create();
}
module.exports = SimpleScheduler;

//inherit Scheduler's methods.
util.inherits(SimpleScheduler, Scheduler);

(function() {
	/**
	 * Defines how this schedule will identify and select an R process to 
	 * fulfill its requests.
	 */
	this.acquireWorker_p = function(appSpec){
		var key = appSpec.getKey();
	    if (this.$workerMap[key]) {
	      logger.trace('Reusing existing instance');
	      return Q.resolve(this.$workerMap[key]);
	    }

	    logger.trace('Spawning new instance');
	    this.$workerMap[key] = this.spawnWorker_p(appSpec);
	    return this.$workerMap[key];
	};

	this.releaseWorker = function(worker){
		logger.trace("Should release the worker on port " + port);
		this.$workerMap = map.create();
	}
}).call(SimpleScheduler.prototype);
